import './index.scss';

import { TAnyFunction } from '@/types';

// Comps
import BaseIcon from '../Icon/index';

interface IProps {
  eventClose?: TAnyFunction;
}
interface IContext extends IProps {
  props?: IProps;
  slots?: TAnyFunction;
  $slots?: {
    default: TAnyFunction;
  };
}

const CompPopNormal = (context: IContext) => {
  const { props = {} } = context;
  if (context.slots) {
    context.slots();
  }

  return (
    <div
      class="com-pop-normal"
      onTouchmove={(e: Event) => {
        e.preventDefault();
      }}
    >
      <div class="box">
        {context.$slots?.default}
        <button
          class="btn-close"
          onClick={() => {
            if (props.eventClose) {
              props.eventClose();
            }
          }}
        >
          <BaseIcon type="close" size={32} />
        </button>
      </div>
      <div class="bg" />
    </div>
  );
};

export default CompPopNormal;
