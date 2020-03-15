import { wxInitShare } from 'wx_js_plus';
import GlobalConf from '@projectRoot/global.conf';
import useGlobalUserInfoHook from './useGlobalUserInfo';

interface IShareInfo {
  title: string;
  desc: string;
  link: string;
  imgUrl: string;
}
let defaultShareInfo: IShareInfo = {
  title: '',
  desc: '',
  link: '',
  imgUrl: '',
};
let hasLoadShareInfo = false;
// let hasInitShare = false; // 暂时去除

const getDefaultShareInfo = () => {
  if (!hasLoadShareInfo) {
    const { state: userInfo } = useGlobalUserInfoHook();
    const shareLink = `${window.location.origin}/?i=${userInfo.invite_code}&o=h5#/home`;

    defaultShareInfo = {
      ...GlobalConf.SHARE_INFO_BASE,
      link: shareLink,
    };

    hasLoadShareInfo = true;
  }

  return Promise.resolve(defaultShareInfo);
};

const useInitWechatShareHook = () => {
  const init = async () => {
    // CONDI: 已配置 => 返回
    //    if (hasInitShare) return;

    // STEP: 配置分享信息
    const shareInfo = await getDefaultShareInfo();
    wxInitShare(shareInfo);

    // STEP: 设置已配置分享
    // hasInitShare = true;
  };

  return {
    init,
  };
};

export default useInitWechatShareHook;
