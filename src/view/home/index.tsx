import { defineComponent } from '@vue/composition-api';

import './index.scss';

// Comp
import BaseButton from '@/components/Button/index';

export default defineComponent({
  name: 'Home',
  setup(props, context) {
    return () => (
      <div id="page-home">
        This is Home
        <br /> <br /> <br /> <br />
        <BaseButton>打开 Toast</BaseButton>
      </div>
    );
  },
});
