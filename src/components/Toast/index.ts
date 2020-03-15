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

import generateErrorMessage from '@/libs/generateErrorMessage';

// 组件
import Comp, { IToastProps } from './comp/index';

// Types
interface ICompInstance extends IToastProps, Vue {}
interface IToastOptions extends IToastProps {
  duration?: number;
}

// Vars
let instanceId = 1;
const instanceList: { id: number; inst: ICompInstance }[] = [];

function removeInstance(compInstance: ICompInstance) {
  // eslint-disable-next-line no-param-reassign
  compInstance.show = false;
  // eslint-disable-next-line no-param-reassign
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
} // 清楚实例

function removeInstanceById(id: number) {
  for (let i = 0, len = instanceList.length; i < len; i += 1) {
    if (instanceList[i].id === id) {
      removeInstance(instanceList[i].inst);
      break;
    }
  }
}

function generateMergeOptions(options: IToastProps) {
  const mergeOptions: IToastProps = {
    show: true,
  };

  // @ts-ignore
  ['title', 'content', 'type', 'showClose', 'showIcon', 'disableBgClose'].forEach(
    // @ts-ignore
    (key: keyof IToastProps) => {
      if (Object.hasOwnProperty.call(options, key) && options[key] !== undefined) {
        // @ts-ignore
        mergeOptions[key as keyof IToastProps] = options[key];
      }
    },
  );

  return mergeOptions;
}

function defineComponent(options: IToastProps) {
  // STEP: 创建 div 占位
  // CANDO: 可以思考如果创建失败的情况
  const el = document.createElement('div');
  document.body.appendChild(el);

  const ExtendVueComp = Vue.extend(Comp); // CANDO: 思考为什么 Comp 放这里会被替换掉
  const compInstance = new ExtendVueComp(ExtendVueComp) as ICompInstance;
  const instId = instanceId;
  instanceId += 1;

  // CANDO: 思考更好的方法
  // STEP: 替换配置
  const mergeOptions = generateMergeOptions(options);
  mergeOptions.eventClose = function close() {
    removeInstanceById(instId);
    if (options.eventClose) {
      options.eventClose();
    }
  };

  Object.assign(compInstance, mergeOptions);

  // STEP: 挂载组件
  compInstance.$mount(el);

  return { inst: compInstance, id: instId };
}

function generateToastInstByType(
  baseOptions = {},
  payload: string | IToastOptions,
  duration?: number,
) {
  let options: IToastOptions = baseOptions;
  let durationToClose = -1;

  if (typeof payload === 'string') {
    options.title = payload;
  } else {
    options = Object.assign(options, payload);
  }

  const compInstanceInfo = defineComponent(options);
  instanceList.push(compInstanceInfo);

  if (typeof payload === 'object' && Object.hasOwnProperty.call(payload, 'duration')) {
    durationToClose = payload.duration as number;
  } else if (duration) {
    durationToClose = duration;
  }

  if (durationToClose > 0) {
    setTimeout(() => {
      removeInstanceById(compInstanceInfo.id);
    }, durationToClose);
  }

  return {
    close: () => {
      removeInstanceById(compInstanceInfo.id);
    },
  };
}

const $toast = {
  loading(payload: string | IToastOptions, duration?: number) {
    return generateToastInstByType(
      {
        title: '',
        showIcon: true,
        type: 'loading',
        disableBgClose: true,
      },
      payload,
      duration,
    );
  },
  warn(payload: string | IToastOptions, duration?: number) {
    return generateToastInstByType(
      {
        title: '',
        showIcon: true,
        type: 'warn',
      },
      payload,
      duration,
    );
  },
  error(payload: string | IToastOptions, duration?: number) {
    return generateToastInstByType(
      {
        title: '',
        showIcon: true,
        type: 'error',
      },
      payload,
      duration,
    );
  },
  byError(error: Error) {
    const { code, url, errMsg } = generateErrorMessage(error);

    return generateToastInstByType(
      {
        title: '',
        showIcon: true,
        showClose: true,
        type: 'error',
      },
      {
        title: errMsg,
        content: [
          "<details class='details'>",
          "<summary class='summary'>展开详细错误</summary>",
          code ? `<p class='p'>错误代码：${code}</p>` : '',
          `<p class='p'>错误来源：${url}</p>`,
          '</details>',
        ].join(''),
      },
    );
  },
  close: removeInstanceById,
  closeAll() {
    instanceList.forEach((instInfo) => {
      removeInstance(instInfo.inst);
    });
  },
};

export default $toast;
