import { defineComponent } from '@vue/composition-api';
import { useGlobalUserInfoProvider } from './hooks/useGlobalUserInfo';
import { useRouterProvider } from './hooks/useRouter';
import { useChannelInfoProvider } from './hooks/useChannelInfo';

import './app.scss';

export default defineComponent({
  name: 'App',
  setup(props, context) {
    // 注入全局用户信息
    useGlobalUserInfoProvider();

    // 注册路由
    useRouterProvider(context.root.$router);

    // 注册平台信息
    useChannelInfoProvider();

    return () => (
      <div id="app">
        <router-view />
      </div>
    );
  },
});
