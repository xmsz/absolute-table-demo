import request from '@/libs/request';

interface IPostDebugTokenApiResData {
  token: string;
  // eslint-disable-next-line camelcase
  token_expire: number;
}

async function postDebugTokenApi(
  params: {
    id: number;
    p?: string;
  } = {
    id: 1,
  },
) {
  const { id, p } = params;

  const postOptions = {
    params: {
      id,
      p,
    },
  };

  try {
    const res = await request.post<IPostDebugTokenApiResData>('/token/debug', {}, postOptions);
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function postTokenApi(params: { o?: string; i?: string; p?: string; code: string }) {
  try {
    const res = await request.post<IPostDebugTokenApiResData>(
      '/token',
      {},
      {
        params,
      },
    );
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

export { postDebugTokenApi, postTokenApi };
