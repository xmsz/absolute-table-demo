import VueRouter, { Route, RawLocation } from 'vue-router';
import routes from './routes';

// Hooks
import useChannelInfoHook from '../hooks/useChannelInfo';
import useGlobalUserInfoHook from '../hooks/useGlobalUserInfo';

// Libs
// import { initWechatJavascriptSDK, initWechatShare } from './func';
import tokenHandle from '../libs/token';
import { initAuthToken } from '../libs/auth';

const router = new VueRouter({
  routes,
});

// 路由进入前
const onBeforeRouterEnter: (
  to: Route,
  from: Route,
  next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void,
) => void = async (to, from, next) => {
  const { getState: getUserInfoState, hasInit, initUserInfo } = useGlobalUserInfoHook();
  const {
    getState: getChannelInfoState,
    hasInit: hasInitChannelInfo,
    initChannelInfoInfo,
  } = useChannelInfoHook();
  let channelInfo = getChannelInfoState();

  // STEP: 获取平台信息
  if (!hasInitChannelInfo) {
    await initChannelInfoInfo();
    channelInfo = getChannelInfoState();
  }

  // STEP: 无需授权 => 直接进入
  if (to.meta.noNeedAuth) {
    next();
    return;
  }

  // STEP: 未授权 => 进行授权
  const hasToken = await tokenHandle.hasToken(channelInfo.key);

  if (!hasToken) {
    await initAuthToken(channelInfo.key);
  }

  // STEP: 没有用户信息 => 获取用户信息 和 钱包信息
  if (!hasInit) {
    const getAllData = () => Promise.all([initUserInfo()]);
    await getAllData();
  }

  // STEP: 获取最新值
  const userInfo = getUserInfoState();
  console.info(userInfo);

  // STEP: 特殊逻辑处理

  next();
};

// 路由进入后事件
const onAfterRouterEnter: (to: Route, from: Route) => any = to => {
  // // STEP: 配置 WX SDK
  // initWechatJavascriptSDK({
  //   success: () => {
  //     initWechatShare();
  //   },
  // });

  // STEP: 设置网页标题
  if (Object.hasOwnProperty.call(to.meta, 'title')) {
    document.title = to.meta.title;
  }
};

router.beforeEach(onBeforeRouterEnter);
router.afterEach(onAfterRouterEnter);

export default router;
