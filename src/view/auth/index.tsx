import { defineComponent, onMounted } from '@vue/composition-api';
import useRouter from '@/hooks/useRouter';

let jumpRouterInfo = {};

export default defineComponent({
  name: 'App',
  setup(props, context) {
    const routerInfo = useRouter();

    const jumpBack = () => {
      let currentRoute = {};
      let beforeRouterInfo = {
        name: 'Home',
      };

      // STEP: 判断是有通过参数
      if (routerInfo) {
        const { router } = routerInfo;

        if (router) {
          let currentRouteFromQuery = router.currentRoute.query.currentRoute;
          if (typeof currentRouteFromQuery === 'string') {
            currentRouteFromQuery = decodeURIComponent(currentRouteFromQuery);
            try {
              currentRoute = JSON.parse(currentRouteFromQuery);
            } catch (err) {
              currentRoute = {};
              console.warn(err);
            }
          }
        }
      }

      if (Object.keys(currentRoute).length) {
        beforeRouterInfo = currentRoute as { name: string };
      }

      if (routerInfo && routerInfo.router) {
        const isSameJumpRouterInfo =
          Object.hasOwnProperty.call(jumpRouterInfo, 'fullPath') ===
          Object.hasOwnProperty.call(beforeRouterInfo, 'fullPath');

        if (isSameJumpRouterInfo) {
          console.warn('无限跳拉');
        } else {
          routerInfo.router.replace(beforeRouterInfo);
          jumpRouterInfo = beforeRouterInfo;
        }
      } else {
        console.warn('没有路由');
      }
    };

    onMounted(() => {
      // STEP: 跳转回原来的
      jumpBack();
    });
    return () => <div id="page-auth" />;
  },
});
