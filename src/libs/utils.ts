/* eslint-disable max-classes-per-file */

/**
 * NAME: 验证表单格式
 */

export const formCheck = {
  /**
   * 验证手机号码
   * @param {*} phone
   */
  phone(phone: string) {
    const reg = /^1(([38]\d)|(4[567])|(5[0-35-9])|(66)|(7[0-35-8])|(9[89]))\d{8}$/;
    return new Promise((resolve, reject) => {
      if (phone.length === 11 && reg.test(phone)) {
        resolve();
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({
          msg: '请输入正确的手机号',
        });
      }
    });
  },

  /**
   * 验证以太坊钱包地址
   */
  address(address: string) {
    const reg = /^0x[0-9a-zA_Z]+$/i;
    return new Promise((resolve, reject) => {
      if (address.length === 42 && reg.test(address)) {
        resolve();
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({
          func_msg: '请输入正确的以太坊钱包地址',
        });
      }
    });
  },

  /**
   * 验证邮箱地址
   */
  email(email: string) {
    const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    return new Promise((resolve, reject) => {
      if (email.length > 0 && reg.test(email)) {
        resolve();
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({
          func_msg: '请输入正确的邮箱地址',
        });
      }
    });
  },

  idNumber(idNumber: string) {
    const reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    return new Promise((resolve, reject) => {
      if (idNumber.length >= 14 && reg.test(idNumber)) {
        resolve();
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({
          func_msg: '请输入正确的身份证号',
        });
      }
    });
  },
};

export const handleLoadImg = (imgUrl: string) => {
  if (!imgUrl) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({
      msg: 'handleLoadImg: failed; noImg',
    });
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve();
    };
    img.onerror = err => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({
        msg: 'handleLoadImg: failed',
        err,
      });
    };
    img.src = imgUrl;
  });
};

// NEW
const sleep = (duration = 0) => new Promise(resolve => setTimeout(resolve, duration));

export { sleep };
