import request from '@/libs/request';

export interface IGetUserInfoApiResData {
  id: number;
  nickname: string;
  avatar: string;
  // eslint-disable-next-line camelcase
  invite_code: string;
  subscribe: boolean;
}

/**
 * @name API-获取用户信息
 */
async function getUserInfoApi(data: object = {}) {
  const params = data;

  try {
    const res = await request.get<IGetUserInfoApiResData>('/user/info', {
      params,
    });
    // res.data.subscribe = true;
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

interface IGetUserTmpWxQrcodeApiRes {
  url: string;
}

const getUserTmpWxQrcodeApi = async () => {
  try {
    const res = await request.get<IGetUserTmpWxQrcodeApiRes>('/user/tmp_wx_qrcode');
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export { getUserInfoApi, getUserTmpWxQrcodeApi };
