import { provide, inject, InjectionKey, reactive } from '@vue/composition-api';
import { getPlatformInfoApi, IGetPlatformInfoData } from '../api/platform';
import { sleep } from '../libs/utils';

interface IChannelInfo {
  state: IGetPlatformInfoData;
}

const ChannelInfoSymbol: InjectionKey<IChannelInfo> = Symbol('ChannelInfo');
let state: IGetPlatformInfoData = {
  appid: '',
  key: 'default',
  qrcode: '',
};
let hasInit = false;
let isHandlingInit = false;

const initChannelInfoInfo: () => Promise<void> = async () => {
  if (isHandlingInit) {
    await sleep(100);
    return initChannelInfoInfo();
  }

  isHandlingInit = true;

  if (!hasInit) {
    try {
      const result = await getPlatformInfoApi();
      Object.assign(state, result);

      hasInit = true;
    } catch (err) {
      // CANDO: 最好做一下处理
      console.warn(err);
    } finally {
      isHandlingInit = false;
    }
  }

  return Promise.resolve();
};

const reloadChannelInfoInfo = () => {
  hasInit = false;
  initChannelInfoInfo();
};

export const useChannelInfoProvider = () => {
  state = reactive(state);

  provide(ChannelInfoSymbol, { state });
};

export const useChannelInfoInjection = () => {
  const ChannelInfo = inject(ChannelInfoSymbol);

  if (!ChannelInfo) {
    throw new Error('请先注册 Provider');
  }

  return ChannelInfo;
};

const useChannelInfoHook = () => {
  const res = {
    state,
    hasInit,
    initChannelInfoInfo,
    reloadChannelInfoInfo,
    getState: () => JSON.parse(JSON.stringify(state)) as IGetPlatformInfoData,
  };
  return res;
};

export default useChannelInfoHook;
