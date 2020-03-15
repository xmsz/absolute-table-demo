import { defineComponent, reactive, watch } from '@vue/composition-api';

import './index.scss';

export interface IToastProps {
  show?: boolean;
  title?: string;
  content?: string;
  type?: string;
  showClose?: boolean;
  showIcon?: boolean;
  disableBgClose?: boolean;
  isClosing?: boolean;
  eventClose?: (...args: any[]) => any;
}

export default defineComponent({
  props: {
    show: Boolean,
    title: String,
    content: String,
    type: String,
    showClose: Boolean,
    showIcon: Boolean,
    eventClose: Function,
    isClosing: Boolean,
    disableBgClose: Boolean,
  },
  setup(props: IToastProps, context) {
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

    function close() {
      if (props.eventClose) {
        props.eventClose();
      }
    }

    function onTouchmove(e: Event) {
      e.preventDefault();
    }

    return () => (
      <div>
        <div
          // v-show={state.visible}
          class={`com-toast ${props.isClosing ? 'fade-leave-active' : ''}`}
          onTouchmove={onTouchmove}
        >
          <i
            class="mask"
            onClick={() => {
              if (!props.disableBgClose) {
                close();
              }
            }}
          />
          <section
            class={`box ${!props.showIcon ? 'no-icon' : ''} ${!props.content ? 'no-content' : ''} ${
              props.type === 'loading' ? 'loading' : ''
            } ${props.type === 'warn' ? 'warn' : ''} ${props.type === 'error' ? 'error' : ''} ${
              props.type === 'done' ? 'done' : ''
            }
       `}
          >
            {props.showIcon && (
              <i
                class={`icon ${props.type === 'loading' ? 'base-icon-font-loading' : ''} ${
                  props.type === 'warn' ? 'base-icon-font-info' : ''
                } ${props.type === 'error' ? 'base-icon-font-warn' : ''} ${
                  props.type === 'done' ? "base-icon-font-done'" : ''
                }`}
              />
            )}
            <div class="text">
              <b class="title">{props.title}</b>
              {props.content ? (
                <div class="desc" domPropsInnerHTML={props.content} />
              ) : (
                <div class="desc">{context.slots.default && context.slots.default()}</div>
              )}
            </div>
            {props.showClose && (
              <button class="btn-close" onClick={close}>
                <i class="btn-close-icon base-icon-font-close" />
              </button>
            )}
          </section>
        </div>
      </div>
    );
  },
});
