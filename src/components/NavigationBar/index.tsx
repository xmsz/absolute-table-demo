import './index.scss';
import {
  // linebreak,
  defineComponent,
  reactive,
  onMounted,
  onUnmounted,
} from '@vue/composition-api';

// Hooks
import { initNavigationInfo } from '@/hooks/useNavigationBar';

// Comps
import BaseIcon from '@/subtree/moduleUI/dist/Icon/index';

// Types
interface IProps {
  background?: string;
  title?: string;
  customContent?: boolean;
  placeholder?: boolean;
  onScroll?: (options: { isCross: boolean }) => void;
  eventBack?: () => void;
  theme?: string;
  btnBackHide: boolean;
}

interface IState {
  statusBarHeight: number;
  navigationBarHeight: number;
  capsulePosition: {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
  };
}

interface IUData {
  interObserver: null | WechatMiniprogram.IntersectionObserver;
}

const BaseNavigationBar = defineComponent({
  props: {
    background: String,
    title: String,
    customContent: Boolean,
    placeholder: Boolean,
    onScroll: Function,
    eventBack: Function,
    theme: String,
    btnBackHide: Boolean,
  },
  setup(props: IProps, context) {
    const state: IState = reactive({
      statusBarHeight: 20,
      navigationBarHeight: 68,
      capsulePosition: {
        bottom: 38,
        height: 32,
        left: 223,
        right: 310,
        top: 6,
        width: 87,
      },
    });

    const uData: IUData = {
      interObserver: null,
    };

    // function initInterObserver() {
    //   uData.interObserver = window.$$createIntersectionObserver();
    //   uData.interObserver
    //     .relativeToViewport({
    //       top: 10,
    //     })
    //     .observe('.navigation_bar-placeholder', ({ intersectionRatio }) => {
    //       if (props.onScroll) {
    //         props.onScroll({
    //           isCross: intersectionRatio === 0,
    //         });
    //       }
    //     });
    // }

    onMounted(async () => {
      const navigationBarInfo = await initNavigationInfo();
      state.capsulePosition = navigationBarInfo.capsulePosition;
      state.navigationBarHeight = navigationBarInfo.navigationBarHeight;
      state.capsulePosition = navigationBarInfo.capsulePosition;

      // CANDO: 暂时关闭
      // initInterObserver();
    });

    onUnmounted(() => {
      if (uData.interObserver) {
        if (uData.interObserver.disconnect) {
          uData.interObserver.disconnect();
        }
      }
    });

    return () => {
      const StatusBarRender = (
        <view class="navigation_bar-status-bar" style={`height: ${state.statusBarHeight}px`} />
      );

      //   const CapsuleRender = (
      //     <view
      //       class="capsule"
      //       style={`width:${state.capsulePosition.width}px;height:${state.capsulePosition.height}px;`}
      //     />
      //   );

      const BtnBackRender = () => (
        <button
          class="btn-back"
          style={`width:${state.capsulePosition.height}px;height:${state.capsulePosition.height}px;`}
          onClick={() => {
            if (props.eventBack) {
              props.eventBack();
            }
          }}
        >
          <BaseIcon type="next" size={state.capsulePosition.height * 2} extClass="btn-back-icon" />
        </button>
      );

      const TitleRender = (
        <view
          class="navigation_bar-title"
          style={`font-size:${state.capsulePosition.height * 0.55}px`}
        >
          {props.title}
        </view>
      );

      const NavigationBarDefaultContentRender = (
        <view class="navigation_bar-default-content">
          {!props.btnBackHide && <BtnBackRender />}
          {TitleRender}
        </view>
      );

      const NavigationBarContentRender = (
        <view class="content" style={`width:${state.capsulePosition.left}px`}>
          {props.customContent ? context.slots.content() : NavigationBarDefaultContentRender}
        </view>
      );

      const NavigationBarRender = (
        <view
          class={`navigation_bar navigation_bar-theme-${props.theme} ext-class`}
          style={`height: ${state.navigationBarHeight}px;background:${props.background}`}
        >
          {StatusBarRender}
          <view
            class="navigation_bar-container"
            style={`height: ${state.navigationBarHeight - state.statusBarHeight}px`}
          >
            {NavigationBarContentRender}
          </view>
        </view>
      );

      const PlaceholderRender = (
        <view
          class={`navigation_bar-placeholder  ${
            props.placeholder ? '' : 'navigation_bar-placeholder-hide'
          }`}
          style={`height: ${state.navigationBarHeight}px`}
        />
      );

      return (
        <block>
          {NavigationBarRender}
          {PlaceholderRender}
        </block>
      );
    };
  },
});
export default BaseNavigationBar;
