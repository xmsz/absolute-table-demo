import { provide } from '@vue/composition-api';
import VueRouter, { Route, RawLocation } from 'vue-router';
import Router from '../router/index';

interface IRouteInfo {
  to: Route;
  from: Route;
}

const RouterSymbol = Symbol('router');
// NOTICE: 暂不支持多实例
let routerInst: null | VueRouter;
let currentRouteExtraInfo: IRouteInfo | null = null;

// STEP: 监听路由
const onBeforeRouteEntry: (
  to: Route,
  from: Route,
  next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void,
) => void = (to, from, next) => {
  currentRouteExtraInfo = {
    to,
    from,
  };
  next();
};

Router.beforeEach(onBeforeRouteEntry);

const useRouterProvider = (router: VueRouter) => {
  routerInst = router;
  provide(RouterSymbol, router);
};

const useRouter: () => {
  router: VueRouter | null;
  currentRouteExtraInfo: IRouteInfo | null;
} = () => {
  if (!routerInst) {
    console.warn('请先注册路由');
  }

  return { router: routerInst || null, currentRouteExtraInfo: currentRouteExtraInfo || null };
};

export { useRouterProvider };
export default useRouter;
