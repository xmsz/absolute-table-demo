import { AxiosRequestConfig } from 'axios';
import { ClassUrlHandle } from '@coolban/lib-url';

import GlobalConf from '@projectRoot/global.conf';
import tokenHandle from './token';
import { postDebugTokenApi, postTokenApi } from '../api/token';
import useRouter from '../hooks/useRouter';
import useGlobalSystemInfoHook from '../hooks/useGlobalSystemInfo';
import useChannelInfoHook from '../hooks/useChannelInfo';

const { IS_DEBUG, DEBUG_USER_ID } = GlobalConf;

const getAuthToken = async (platformKey: string) => tokenHandle.getToken(platformKey);
const clearAuthToken = (platformKey: string) => tokenHandle.clearToken(platformKey);

const initAuthToken = (platformKey: string) => {
  const { getState: getSystemInfoState } = useGlobalSystemInfoHook();
  const { getState: getChannelInfoState } = useChannelInfoHook();

  const systemInfo = getSystemInfoState();
  const channelInfoState = getChannelInfoState();

  const urlHandler = new ClassUrlHandle();

  const code = urlHandler.getSearchValue('code');

  const goWechatAuth = () => {
    const wechatAuthUrl = urlHandler.getAuthUrl({
      appId: channelInfoState.appid,
      redirectUrl: urlHandler.getClearWxAuthLink(),
      scope: 'snsapi_base',
    });

    window.location.href = wechatAuthUrl;
  };

  const options = {
    isDebug: IS_DEBUG && !systemInfo.isEnvPro,
    tokenKey: platformKey,
    getToken: async () => {
      const i = urlHandler.getSearchValue('i');
      const o = urlHandler.getSearchValue('o');
      const requestObj = { i, o, code };

      try {
        const tokenInfo = await postTokenApi(requestObj);
        return Promise.resolve(tokenInfo);
      } catch (error) {
        const responseStatus = error.response?.status;

        if (responseStatus === 401) {
          goWechatAuth();
        }
        return Promise.reject();
      }
    },
    getDebugToken: () => {
      const postObj = {
        id: DEBUG_USER_ID,
        p: platformKey,
      };
      return postDebugTokenApi(postObj);
    },
  };

  // STEP: 判断是不是微信内授权
  if (!IS_DEBUG && systemInfo.isInWx) {
    // CONDI: 判断有没有 code
    if (!code) {
      // CONDI: 没有 code => 进行跳转

      goWechatAuth();

      // STEP: 先暂停跳转
      // CANDO: 后面优化一下
      return Promise.reject();
    }
  }

  return tokenHandle.init(options);
};

const beforeRequestConfigHandle: (
  configOri: AxiosRequestConfig,
  options: {
    platformKey: string;
  },
) => Promise<AxiosRequestConfig> = async (
  configOri = {},
  options = {
    platformKey: '',
  },
) => {
  const { platformKey } = options;
  const config = configOri;
  const token = await getAuthToken(platformKey);

  // STEP: 获取token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return Promise.resolve(config);
};

let handling401Timer: null | NodeJS.Timeout = null;
/**
 * @name 401处理
 * @param platformKey 平台名
 * STEPS
 * - 函数防抖处理
 * - 清除本地 token
 * - 跳转到 auth 页面
 */
const err401Handle = (platformKey: string) => {
  if (handling401Timer) {
    clearTimeout(handling401Timer);
    handling401Timer = null;
  }

  handling401Timer = setTimeout(() => {
    const { router } = useRouter();

    // STEP: 清除本地数据
    clearAuthToken(platformKey);

    // STEP: 没有注册路由不处理
    if (!router) return;
    // FUNC: 获取当前路由信息
    const getCurrentRouteInfo = () => {
      const { name, query, params, fullPath, path } = router.currentRoute;
      return encodeURIComponent(
        JSON.stringify({
          name,
          query,
          params,
          fullPath,
          path,
        }),
      );
    };

    // STEP: 跳转到授权页面
    if (router.currentRoute.name !== 'Auth') {
      router.replace({
        name: 'Auth',
        query: {
          currentRoute: getCurrentRouteInfo(),
        },
      });
    }
  }, 0);
};

function handle401Silent(platformKey: string) {
  return initAuthToken(platformKey);
}

export {
  initAuthToken,
  beforeRequestConfigHandle,
  err401Handle,
  clearAuthToken,
  getAuthToken,
  handle401Silent,
};
