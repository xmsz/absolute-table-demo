import Vue from 'vue';

/**
 * @name 优化首屏加载中
 * 因为首屏白屏时间 = 加载html + 加载js + js处理
 * 而前面两个已经有了，但js处理没有
 * 原理：判断是否有router的name（说明进入到了页面） =》 定时覆盖当前的vue组件 =》 通过setTimeout(0)实现dom延迟 =》 筛选出页面的mounted
 * CANDO: 可以给meta一些判断，来决定是否要即刻（页面有任一组件加载完成了 ： 也说明这个页面已经可以看见了）关闭还是等页面加载完再关闭
 * ## 约定 ##
 *  1. 页面组件必须有id，否则会不会触发关闭loading事件
 *  2. 组件最好是class，或者用一层没有id的dom嵌套
 */
let _mountedTimer: null | NodeJS.Timeout = null;
let _mountedLoad = false;

const _appSetMountedHandle = () => {
  _mountedLoad = true;
  const dom = document.getElementById('page-loading');

  if (dom) {
    dom.style.display = 'none';
  }
};

const MixinMounted = {
  mounted(this: Vue) {
    if (!_mountedLoad && this.$route && this.$route.name && this.$el.id) {
      if (_mountedTimer) {
        clearTimeout(_mountedTimer);
        _mountedTimer = null;
      }

      // CONDI: 针对首页快速优化
      if (this.$route.meta.mounted_once) {
        _appSetMountedHandle();
      } else {
        _mountedTimer = setTimeout(() => {
          _appSetMountedHandle();
        }, 0);
      }
    }
  },
};

Vue.mixin(MixinMounted);
