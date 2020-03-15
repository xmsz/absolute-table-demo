import Vue from 'vue';
import MtaH5 from 'mta-h5-analysis';

function install(Vue, options) {
  MtaH5.init(options);

  Vue.prototype.$mta = MtaH5;
}

if (process.env.NODE_ENV === 'production') {
  const _sid = '';
  const _cid = '';
  Vue.use(install, {
    sid: _sid,
    cid: _cid,
    autoReport: 0,
    senseHash: 1,
    senseQuery: 1,
    performanceMonitor: 0,
    ignoreParams: [],
  });
} else {
  Vue.prototype.$mta = {
    clickStat: () => {},
  };
}

export default install;
