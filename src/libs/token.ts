import { sleep } from './utils';

interface TokenHandleDebugApiResData {
  token: string;
  // eslint-disable-next-line camelcase
  token_expire: number;
}
interface TokenHandleSaveTokenPayload extends TokenHandleDebugApiResData {
  tokenKey: string;
}
interface TokenHandleInitPayload {
  tokenKey: string;
  isDebug: boolean;
  getDebugToken: (...args: any[]) => Promise<TokenHandleDebugApiResData>;
  getToken: (...args: any[]) => Promise<TokenHandleDebugApiResData>;
}

interface TokenHandleTokenItem {
  tokenKey: string;
  token: string;
  tokenExpire: number;
}

class TokenHandle {
  private storage = window.localStorage;

  private isHandling = false;

  private getDebugTokenFn: ((...args: any[]) => Promise<TokenHandleDebugApiResData>) | undefined;

  private getTokenFn: ((...args: any[]) => Promise<TokenHandleDebugApiResData>) | undefined;

  public async init(payload: TokenHandleInitPayload): Promise<void> {
    const { tokenKey = '', isDebug = false, getDebugToken, getToken } = payload;

    this.getDebugTokenFn = getDebugToken;
    this.getTokenFn = getToken;

    if (this.isHandling) {
      await sleep(100);
      return this.init(payload);
    }

    this.isHandling = true;

    try {
      if (isDebug) {
        await this.initDebugToken(tokenKey);
      } else {
        await this.initWxToken(tokenKey);
      }
    } catch (err) {
      return Promise.reject(err);
    } finally {
      this.isHandling = false;
    }

    return Promise.resolve();
  }

  public async getToken(tokenKey: string): Promise<null | string> {
    const tokenInfo = await this.getTokenInfo();

    let tokenRes = null;

    const tokenItem = tokenInfo.find(item => item.tokenKey === tokenKey);
    if (tokenItem) {
      tokenRes = tokenItem.token;
    }

    return Promise.resolve(tokenRes);
  }

  public hasToken(tokenKey: string) {
    return this.getToken(tokenKey);
  }

  public async clearToken(tokenKey: string) {
    const tokenInfo = await this.getTokenInfo();

    const tokenItemIndex = tokenInfo.findIndex(item => item.tokenKey === tokenKey);
    if (tokenItemIndex !== undefined) {
      tokenInfo.splice(tokenItemIndex, 1);
    }

    this.setStorageItem('tokenInfo', tokenInfo);

    return Promise.resolve();
  }

  public clearAllToken() {
    this.removeStorageItem('tokenInfo');
    return Promise.resolve();
  }

  private removeStorageItem(key: string) {
    this.storage.removeItem(key);
  }

  private async getTokenInfo() {
    let localTokenInfo = (await this.getStorageItem('tokenInfo')) || [];
    localTokenInfo = Object.hasOwnProperty.call(localTokenInfo, 'length') ? localTokenInfo : [];
    const tokenInfo = (localTokenInfo || []) as TokenHandleTokenItem[];
    return Promise.resolve(tokenInfo);
  }

  private async saveToken(
    payload: TokenHandleSaveTokenPayload = {
      tokenKey: '',
      token: '',
      token_expire: +new Date() + 2 * 60 * 60 * 1000,
    },
  ) {
    const { tokenKey, token, token_expire: tokenExpire } = payload;
    const tokenItem = {
      tokenKey,
      tokenExpire,
      token,
    };

    // STEP: 获取本地数据库
    // TODO: 思考为什么会设置 {}
    const tokenInfo = await this.getTokenInfo();

    // STEP: 替换或新增key
    const tokenItemIdx = tokenInfo.findIndex(item => item.tokenKey === tokenKey);
    if (tokenItemIdx > -1) {
      tokenInfo[tokenItemIdx] = tokenItem;
    } else {
      tokenInfo.push(tokenItem);
    }

    // STEP: 储存到本地
    await this.setStorageItem('tokenInfo', tokenInfo);

    return Promise.resolve();
  }

  private setStorageItem(key: string, value: any): Promise<void> {
    let saveValue = value;
    if (typeof value === 'object') {
      saveValue = JSON.stringify(value);
    }

    this.storage.setItem(key, saveValue);

    return Promise.resolve();
  }

  private getStorageItem(key: string): Promise<string | object | null> {
    let item = this.storage.getItem(key);

    if (item) {
      try {
        item = JSON.parse(item);
      } catch (err) {
        console.warn(err);
      }
    }

    return Promise.resolve(item);
  }

  private async initDebugToken(tokenKey: string) {
    // STEP: 通过接口获取token
    if (this.getDebugTokenFn) {
      const res = await this.getDebugTokenFn();

      // STEP: 存入本地
      await this.saveToken({ ...res, tokenKey });
    }

    // STEP: 返回成功
    return Promise.resolve();
  }

  private async initWxToken(tokenKey: string) {
    // STEP: 通过接口获取token
    if (this.getTokenFn) {
      const res = await this.getTokenFn();

      // STEP: 存入本地
      await this.saveToken({ ...res, tokenKey });
    }

    // STEP: 返回成功
    return Promise.resolve();
  }
}

const tokenHandle = new TokenHandle();

export default tokenHandle;
