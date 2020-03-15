import './index.scss';
import { IPureComponentContext, TAnyFunction } from '@/types';
import CompButtonSmall from '@/components/ButtonSmall';
import CompPopSimple from '../PopSimple';

const CompReadPop = (
  context: IPureComponentContext<{
    title?: string;
    eventAgree: TAnyFunction;
    eventDisagree: TAnyFunction;
  }>,
) => {
  if (context.slots) {
    context.slots();
  }
  return (
    <CompPopSimple>
      <div class="comp-read-pop">
        <b class="pop-title">{context.props?.title || '温馨提示'}</b>
        <div class="pop-container">
          <wx-scroll-view class="scroll-view" scroll-y>
            {context.$slots?.default}
          </wx-scroll-view>
        </div>
        <div class="pop-footer">
          <CompButtonSmall
            text="不同意"
            type="normal"
            size="medium"
            extClassName="btn-disagree"
            fontWeight="bold"
            eventClick={() => {
              if (context?.props?.eventDisagree) {
                context.props.eventDisagree();
              }
            }}
          />
          <CompButtonSmall
            text="同意"
            size="medium"
            extClassName="btn-agree"
            fontWeight="bold"
            eventClick={() => {
              if (context?.props?.eventAgree) {
                context.props.eventAgree();
              }
            }}
          />
        </div>
      </div>
    </CompPopSimple>
  );
};

export default CompReadPop;
