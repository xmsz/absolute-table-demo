/**
 * @name
 * NOTICE
 * - 每次调用生成一个实例
 * CANDO
 * - 支持富文本content
 * - 支持关闭所有实例
 * - 可配置是否再路由切换时消失
 */

import Vue from 'vue';

// 组件
import Comp, { IDialogProps } from './comp/index';

interface ICompInstance extends IDialogProps, Vue {}
interface IDialogOptions {
  show?: boolean;
  title?: string;
  content?: string;
  type?: 'confirm' | 'alert';
  okText?: string;
  cancelText?: string;
  ok?: (...args: any[]) => any;
  cancel?: (...args: any[]) => any;
  complete?: (...args: any[]) => any;
}

function generateMergeOptions(options: IDialogOptions) {
  const mergeOptions: IDialogProps = {
    show: true,
  };

  // @ts-ignore
  ['title', 'content', 'type', 'okText', 'cancelText'].forEach((key: keyof IDialogProps) => {
    // @ts-ignore
    if (Object.hasOwnProperty.call(options, key) && options[key] !== undefined) {
      // CANDO: 解决
      // @ts-ignore
      mergeOptions[key] = options[key];
    }
  });

  return mergeOptions;
}

export default function $dialog(options: IDialogOptions) {
  // STEP: 创建 div 占位
  // CANDO: 可以思考如果创建失败的情况
  const el = document.createElement('div');
  document.body.appendChild(el);

  const ExtendVueComp = Vue.extend(Comp); // CANDO: 思考为什么 Comp 放这里会被替换掉
  const compInstance = new ExtendVueComp(ExtendVueComp) as ICompInstance;
  const removeInstance = () => {
    compInstance.show = false;
    compInstance.isClosing = true;
    setTimeout(() => {
      setTimeout(() => {
        compInstance.$destroy();
        try {
          document.body.removeChild(compInstance.$el);
        } catch (err) {
          console.warn(err);
        }
      }, 600);
    }, 0);
  }; // 清楚实例

  // CANDO: 思考更好的方法
  // STEP: 替换配置
  const mergeOptions = generateMergeOptions(options);
  mergeOptions.eventOk = function ok() {
    removeInstance();
    if (options.ok) {
      options.ok();
    }
    if (options.complete) {
      options.complete();
    }
  };
  mergeOptions.eventCancel = function ok() {
    removeInstance();
    if (options.cancel) {
      options.cancel();
    }
    if (options.complete) {
      options.complete();
    }
  };
  Object.assign(compInstance, mergeOptions);

  // STEP: 挂载组件
  compInstance.$mount(el);

  return compInstance;
}
