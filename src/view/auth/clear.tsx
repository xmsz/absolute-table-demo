import { defineComponent, onMounted } from '@vue/composition-api';
import tokenHandle from '@/libs/token';
import useRouter from '@/hooks/useRouter';

export default defineComponent({
  setup() {
    onMounted(() => {
      tokenHandle.clearAllToken();
    });

    const Router = useRouter();

    return () => (
      <div id="page-auth_clear">
        <button
          onClick={() => {
            Router.router?.replace({
              name: 'Home',
            });
          }}
        >
          返回首页
        </button>
      </div>
    );
  },
});
