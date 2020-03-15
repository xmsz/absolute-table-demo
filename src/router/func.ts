// Hooks
import useInitWechatJavascriptSDKHook from '../hooks/useInitWXJSSDK';
import useGlobalSystemInfoHook from '../hooks/useGlobalSystemInfo';
import useInitWechatShareHook from '../hooks/useInitWechatShare';

const initWechatJavascriptSDK = async (options: { success?: (...args: any[]) => any }) => {
  // STEP: 判断是否已配置完成
  const { hasInit, init } = useInitWechatJavascriptSDKHook();
  const { getState: getSystemInfoState } = useGlobalSystemInfoHook();
  const systemInfo = getSystemInfoState();

  // STEP: 如果不是生产环境 => 不进行配置
  if (!systemInfo.isEnvPro) return;

  if (!hasInit) {
    await init();
    if (options.success) {
      options.success();
    }
  }
};

const initWechatShare = () => {
  const { init } = useInitWechatShareHook();
  init();
};

export { initWechatJavascriptSDK, initWechatShare };
