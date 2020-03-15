import './index.scss';
import Rpx from '@/libs/rpx';

export type TBaseIconTypes =
  | 'qq'
  | 'transport'
  | 'sexual-girl'
  | 'sexual-boy'
  | 'like'
  | 'cancel-bold'
  | 'close'
  | 'filter'
  | 'birthday'
  | 'date'
  | 'done'
  | 'next'
  | 'take-photo'
  | 'photo'
  | 'back'
  | 'wechat'
  | 'send'
  | 'emoji-bg'
  | 'photo-bg'
  | 'audio'
  | 'delete-text'
  | 'sending'
  | '';

interface IProps {
  type: TBaseIconTypes;
  extClass?: string;
  size?: number;
}
interface IContext extends IProps {
  props?: IProps;
}

const BaseIcon = (context: IContext) => {
  const {
    props = {
      type: '',
      size: 32,
      extClass: '',
    },
  } = context;
  const size = Rpx((props.size || 32) * 1.5);
  const fontSize = Rpx(props.size || 32);

  return (
    <i
      class={`base-icon base-icon-font-${props.type} ${props.extClass}`}
      style={`width:${size};height:${size};line-height:${size};font-size:${fontSize}`}
    />
  );
};

export default BaseIcon;
