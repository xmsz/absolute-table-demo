import { defineComponent, watch, reactive } from '@vue/composition-api';

import './index.scss';

export interface IDialogProps {
  show?: boolean;
  title?: string;
  okText?: string;
  cancelText?: string;
  type?: 'confirm' | 'alert';
  content?: string;
  eventOk?: (...args: any[]) => any;
  eventCancel?: (...args: any[]) => any;
  isClosing?: boolean;
}

export default defineComponent({
  props: {
    show: Boolean,
    title: String,
    okText: String,
    cancelText: String,
    type: String,
    content: String,
    eventOk: Function,
    eventCancel: Function,
    isClosing: Boolean,
  },
  setup(props, context) {
    const state = reactive<{
      visible: boolean;
    }>({
      visible: false,
    });

    watch(
      () => props.show,
      (newValue) => {
        setTimeout(() => {
          if (typeof newValue !== 'boolean') return;
          if (state.visible !== newValue) {
            state.visible = newValue;
          }
        }, 0);
      },
    );

    function cancel() {
      if (props.eventCancel) {
        props.eventCancel();
      }
    }

    function ok() {
      if (props.eventOk) {
        props.eventOk();
      }
    }

    function onTouchmove(e: Event) {
      e.preventDefault();
    }

    // --- Render --- //

    return () => {
      function RenderBtnCancel(extClassName: string = '') {
        return (
          <div class={`com-dialog-button cancel ${extClassName}`} onClick={cancel}>
            {props.cancelText || '取消'}
          </div>
        );
      }

      const RenderBox = (
        <div class="com-dialog-box">
          <div class="com-dialog-title">{props.title || ''}</div>

          {props.content ? (
            <div class="com-dialog-content" domPropsInnerHTML={props.content} />
          ) : (
            <div class="com-dialog-content">{context.slots.default && context.slots.default()}</div>
          )}

          <div class="com-dialog-footer">
            {props.type === 'confirm' && RenderBtnCancel('first')}

            <div class="com-dialog-button submit" onClick={ok}>
              {props.okText || '确定'}
            </div>

            {props.type === 'confirm' && RenderBtnCancel('second')}
          </div>
        </div>
      );

      return (
        <div
          class={`com-dialog ${props.isClosing ? 'fade-leave-active' : ''}`}
          onTouchmove={onTouchmove}
        >
          <div class="com-dialog-mask" />
          {RenderBox}
        </div>
      );
    };
  },
});
