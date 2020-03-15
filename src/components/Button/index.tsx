import { defineComponent } from '@vue/composition-api';

import './index.scss';

export default defineComponent({
  props: {
    eventClick: Function,
  },
  setup(props, context) {
    return () => {
      const slot = context.slots.default && context.slots.default();
      return (
        <button class="base-btn-main" onClick={props.eventClick}>
          {slot}
        </button>
      );
    };
  },
});
