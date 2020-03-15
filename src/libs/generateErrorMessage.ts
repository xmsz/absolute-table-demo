import { AxiosError } from 'axios';

export default function generateErrorMessage(error: AxiosError | Error) {
  const { message } = error;
  // eslint-disable-next-line prefer-destructuring
  const response = (error as AxiosError).response;
  // eslint-disable-next-line prefer-destructuring
  const request = (error as AxiosError).request;

  const resError = {
    errMsg: '服务升级中(1)，请稍后尝试',
    code: -1,
    status: -1,
    url: '',
  };

  if (response) {
    // 服务器返回的错误
    const { data, status = -1, config } = response;

    // STEP: 设置状态
    resError.status = status;

    // STEP: 设置URL和状态
    if (typeof config === 'object') {
      const { url = '' } = config;
      resError.url = url;
    }

    // STEP: 设置错误信息
    if (status === 502 || status === 0) {
      resError.errMsg = `服务器升级中，请刷新页面${status}`;
    } else if (typeof data === 'object') {
      const { msg, code = -1, errMsg } = data;
      resError.errMsg = msg || errMsg || '服务升级中(2)，请稍后尝试';
      resError.code = code;
    } else if (data && typeof data === 'string') {
      resError.errMsg = data;
    }
  } else if (request) {
    resError.errMsg = '请求未成功';
  } else {
    resError.errMsg = message;
  }

  return resError;
}
