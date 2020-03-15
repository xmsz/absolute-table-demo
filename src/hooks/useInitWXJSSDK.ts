import { wxJsSdkConfig } from 'wx_js_plus';
import GlobalConf from '@projectRoot/global.conf';
import { getWxJsSdkApi } from '../api/wx';
import { sleep } from '../libs/utils';
import useChannelInfoHook from './useChannelInfo';

// NOTICE: 暂时不设置成动态的值
let hasInit = false;
let isHandling = false;

const useInitWechatJavascriptSDKHook = () => {
  const { state: channelInfoState } = useChannelInfoHook();
  const appId = channelInfoState.appid;
  const jsApiList = GlobalConf.JS_API_LIST;

  const getSDKSignAsync = async () => {
    const currentUrl = encodeURIComponent(window.location.href.split('#')[0]);
    return getWxJsSdkApi(currentUrl, appId);
  };

  const init: () => Promise<void> = async () => {
    if (hasInit) {
      return Promise.resolve();
    }

    if (isHandling) {
      await sleep(200);
      return init();
    }

    isHandling = true;
    try {
      // STEP: 获取 SDK 签名
      const signInfo = await getSDKSignAsync();

      // STEP: 配置 SDK
      await wxJsSdkConfig({
        appId,
        nonceStr: signInfo.nonce_str,
        timestamp: signInfo.timestamp,
        signature: signInfo.signature,
        jsApiList,
      });

      // STEP: 设置完成
      hasInit = true;

      return Promise.resolve();
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    } finally {
      isHandling = false;
    }
  };

  return {
    hasInit,
    init,
  };
};

export default useInitWechatJavascriptSDKHook;
