import './index.scss';

import { TAnyFunction } from '@/types';

// Comps
import BaseIcon from '../Icon/index';

interface IProps {
  title?: string;
  titleTextAlign?: 'left' | 'center';
  hideClose?: boolean;
  eventClose?: TAnyFunction;
}
interface IContext extends IProps {
  props?: IProps;
  slots?: TAnyFunction;
  $slots?: {
    default: TAnyFunction;
  };
}

const CompPopPage = (context: IContext) => {
  const { props = {} } = context;
  if (context.slots) {
    context.slots();
  }
  const titleTextAlign = props.titleTextAlign || 'left';

  return (
    <div class="com-pop-page">
      <div class="box-wrapper">
        <div class="box">
          <header class="box-wrapper-header">
            <b class="title" style={`text-align:${titleTextAlign}`}>
              {props.title}
            </b>
            {!props.hideClose && (
              <button
                class="btn-close"
                onClick={() => {
                  if (props.eventClose) {
                    props.eventClose();
                  }
                }}
              >
                <BaseIcon type="close" />
              </button>
            )}
          </header>
          {context.$slots?.default}
        </div>
      </div>
      <div
        class="bg"
        onTouchmove={(e: Event) => {
          e.preventDefault();
        }}
      />
    </div>
  );
};

export default CompPopPage;
