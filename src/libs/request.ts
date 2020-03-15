import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { beforeRequestConfigHandle, err401Handle } from './auth';
import useGlobalUserInfoHook from '../hooks/useGlobalUserInfo';
import useChannelInfoHook from '../hooks/useChannelInfo';

/**
 * 配置Axios
 * CONDI: 根据是否是APP切换请求地址
 */
const request = axios.create({
  baseURL: '/api/',
});

const onBeforeRequestSendHandler = async (config: AxiosRequestConfig) => {
  const { getState: getUserInfoState } = useGlobalUserInfoHook();
  const { getState: getChannelInfoState } = useChannelInfoHook();

  const userInfo = getUserInfoState();
  const channelInfoState = getChannelInfoState();

  // STEP: 授权处理
  const configInstead = await beforeRequestConfigHandle(config, {
    platformKey: channelInfoState.key,
  });

  // STEP: 临时所有接口都加 u 和 p
  if (!configInstead.params) {
    configInstead.params = {};
  }
  if (!configInstead.params.u) {
    configInstead.params.u = userInfo.id;
  }

  if (!configInstead.params.p) {
    configInstead.params.p = channelInfoState.appid;
  }

  return configInstead;
};

const onResponseError = (error: AxiosError) => {
  const { getState: getChannelInfoState } = useChannelInfoHook();
  const channelInfoState = getChannelInfoState();

  const responseStatus = error.response?.status;

  // STEP: 401处理
  if (responseStatus === 401) {
    err401Handle(channelInfoState.key);
  }

  return Promise.reject(error);
};

// request拦截器
request.interceptors.request.use(onBeforeRequestSendHandler);

// response拦截器
request.interceptors.response.use(value => Promise.resolve(value), onResponseError);

export default request;
