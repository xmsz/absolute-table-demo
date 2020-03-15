import request from '../libs/request';

export interface IGetPlatformInfoData {
  appid: string;
  key: string;
  qrcode: string;
}
const getPlatformInfoApi = async () => {
  try {
    const res = await request.get<IGetPlatformInfoData>('/platform/info');
    // res.data.is_find = true;
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export { getPlatformInfoApi };
