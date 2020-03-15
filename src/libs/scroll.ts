const scrollTop = (x: number, y: number) => {
  if (x > -1 || y > -1) {
    window.scrollTo(x > -1 ? x : 0, y > -1 ? y : 0);

    return true;
  }
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
};

const getScrollTop = () => {
  const result =
    window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  return result;
};

const scrollHeight = () => document.documentElement.scrollHeight || document.body.scrollHeight;

export { scrollTop, scrollHeight, getScrollTop };
