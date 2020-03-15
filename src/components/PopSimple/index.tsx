import './index.scss';

import { TAnyFunction } from '@/types';

interface IProps {
  position?: 'center' | 'bottom';
}

interface IContext extends IProps {
  props?: IProps;
  slots?: TAnyFunction;
  $slots?: {
    default: TAnyFunction;
  };
}

const CompPopSimple = (context: IContext) => {
  const { props } = context;
  const position = props?.position || 'center';

  if (context.slots) {
    context.slots();
  }

  return (
    <div
      class={`com-pop-simple com-pop-simple-${position}`}
      onTouchmove={(e: Event) => {
        e.preventDefault();
      }}
    >
      <div class="box">{context.$slots?.default}</div>
      <div class="bg" />
    </div>
  );
};

export default CompPopSimple;
