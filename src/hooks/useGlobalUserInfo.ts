import { provide, inject, InjectionKey, reactive } from '@vue/composition-api';
import { getUserInfoApi, IGetUserInfoApiResData } from '../api/user';
import { sleep } from '../libs/utils';

interface IGlobalUserInfo {
  state: IGetUserInfoApiResData;
  initUserInfo(): void;
}

const globalUserInfoSymbol: InjectionKey<IGlobalUserInfo> = Symbol('globalUserInfo');
let state: IGetUserInfoApiResData = {
  id: 0,
  nickname: '',
  avatar: '',
  invite_code: '',
  subscribe: true,
};
let hasInit = false;
let isHandlingInit = false;

const initUserInfo: () => Promise<void> = async () => {
  if (isHandlingInit) {
    await sleep(100);
    return initUserInfo();
  }

  isHandlingInit = true;

  if (!hasInit) {
    try {
      const result = await getUserInfoApi();
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

async function reloadUserInfo() {
  const result = await getUserInfoApi();
  Object.assign(state, result);

  return Promise.resolve();
}

export const useGlobalUserInfoProvider = () => {
  state = reactive(state);

  provide(globalUserInfoSymbol, { state, initUserInfo });
};

export const useGlobalUserInfoInjection = () => {
  const globalUserInfo = inject(globalUserInfoSymbol);

  if (!globalUserInfo) {
    throw new Error('请先注册 Provider');
  }

  return globalUserInfo;
};

const useGlobalUserInfoHook = () => {
  const res = {
    state,
    hasInit,
    initUserInfo,
    reloadUserInfo,
    getState: () => JSON.parse(JSON.stringify(state)) as IGetUserInfoApiResData,
  };
  return res;
};

export default useGlobalUserInfoHook;
