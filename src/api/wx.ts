import request from '../libs/request';

interface IGetWechatJavascriptSdkRes {
  // eslint-disable-next-line camelcase
  app_id: string;
  timestamp: number;
  // eslint-disable-next-line camelcase
  nonce_str: string;
  signature: string;
}
async function getWxJsSdkApi(url: string, appid: string) {
  try {
    const res = await request.get<IGetWechatJavascriptSdkRes>('/wx/js', {
      params: {
        url,
        appid,
      },
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

export { getWxJsSdkApi };
