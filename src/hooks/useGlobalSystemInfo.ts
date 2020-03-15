interface IUseGlobalSystemInfoState {
  isEnvPro: boolean;
  ua: string;
  isInWx: boolean;
}

const ua = navigator.userAgent.toLowerCase();
const isInWechat = () => {
  const wechatUA = ua.match(/MicroMessenger/i);
  let flag = false;
  if (wechatUA && wechatUA[0].toLocaleLowerCase() === 'micromessenger') {
    flag = true;
  }
  return flag;
};

const state: IUseGlobalSystemInfoState = {
  isEnvPro: process.env.NODE_ENV === 'production',
  ua,
  // eslint-disable-next-line
  isInWx: isInWechat(),
};

const useGlobalSystemInfoHook = () => {
  const result = {
    state,
    getState: () => JSON.parse(JSON.stringify(state)) as IUseGlobalSystemInfoState,
  };
  return result;
};

export default useGlobalSystemInfoHook;
