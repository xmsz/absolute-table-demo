const _loadScriptArr = [];

const loadScript = url => {
  // CANDO: 支持 async 的另一个类似属性
  // CONDI: 判断是否已经加载了 =》 已加载 =》 直接返回成功
  if (_loadScriptArr.includes(url)) {
    return Promise.resolve();
  }
  return new Promise(resolve => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = url;
    document.body.appendChild(script);
    // @ts-ignore
    if (script.readyState) {
      // IE
      // @ts-ignore
      script.onreadystatechange = () => {
        // eslint-disable-next-line
        if (script.readyState == 'complete' || script.readyState == 'loaded') {
          // @ts-ignore
          script.onreadystatechange = null;
          _loadScriptArr.push(url);
          resolve();
        }
      };
    } else {
      // 非IE
      script.onload = () => {
        _loadScriptArr.push(url);
        resolve();
      };
    }
  });
};

export default loadScript;
