<template>
  <div
    :class="{'small':size === 'small'}"
    class="com-qrcode"
  >
    <p class="guide-text">
      <slot name="title" />
    </p>
    <figure class="qrcode-wrapper">
      <img
        :src="qrcode_url"
        class="qrcode-img"
      >
      <span
        v-if="!is_img_loaded"
        class="loading-text"
      >二维码加载中</span>
      <i
        v-else
        class="light"
      />
    </figure>
  </div>
</template>
<style lang="scss">
.com-qrcode {
  &.small {
    .guide-text {
      font-size: 24px;
      padding-top: 10px;
    }
    .qrcode-wrapper {
      margin-top: 15px;
      background-size: 400px;
      width: 390px;
      height: 390px;
      border-radius: 0px;
      .light {
        animation: qrcode-wrapper-light-ani-small infinite 2s ease-in-out alternate-reverse;
        @keyframes qrcode-wrapper-light-ani-small {
          30% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate3d(0, 300px, 0);
          }
        }
      }
    }
  }
  .guide-text {
    text-align: center;
    font-size: 28px;
    color: $color-paragraph;
    font-weight: normal;
    line-height: 1.5;
    padding: 30px 0 0 0;
  }
  .qrcode-wrapper {
    position: relative;
    z-index: 1;
    display: block;
    background: url('../../assets/image/com-qrcode-bg.svg') no-repeat center;
    background-size: 510px;
    width: 500px;
    height: 500px;
    border-radius: 0;
    margin: 40px auto 0;

    padding: 20px;
    box-sizing: border-box;
    .loading-text {
      position: absolute;
      z-index: 2;
      left: 0;
      right: 0;
      top: 230px;
      font-size: 24px;
      color: #fff;
      font-weight: bold;
      line-height: 1.5;
      padding: 10px 0;
      margin: 0 auto;
      background: $brand-primary;
      width: 240px;
      text-align: center;
      border-radius: 100px 100px 0 100px;
    }
    &:active {
      .light {
        display: none;
      }
    }
    .qrcode-img {
      display: block;
      width: 100%;
      height: 100%;
      border: none;
    }
    .light {
      position: absolute;
      z-index: 2;
      left: 0;
      top: 0;
      width: 100%;
      height: 70px;
      background: url('../../assets/image/com-qrcode-light.svg') no-repeat center;
      background-size: 480px auto;
      animation: qrcode-wrapper-light-ani infinite 2s ease-in-out alternate-reverse;
      transform: translate3d(0, -10px, 0);
      opacity: 0;
      @keyframes qrcode-wrapper-light-ani {
        30% {
          opacity: 1;
        }
        80% {
          opacity: 1;
        }
        100% {
          opacity: 0;
          transform: translate3d(0, 400px, 0);
        }
      }
    }
  }
}
</style>
<script>
import { handleLoadImg } from '@/libs/utils';
import $toast from '@/components/Toast/index';
import defaultQrCodePic from '../../assets/image/com-qrcode-default.svg';

export default {
  name: 'BaseQrcode',
  props: {
    imgUrl: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'noraml',
    },
  },
  data() {
    return {
      is_img_loaded: false,
      qrcode_url: defaultQrCodePic,
    };
  },
  watch: {
    async imgUrl(n) {
      if (!n) return;
      await this.$nextTick();
      // STEP: 加载图片
      try {
        await handleLoadImg(n);
      } catch (err) {
        $toast.warn({
          title: '二维码加载错误',
          showClose: true,
          type: 'warn',
          content: `
          <details>
            <summary>展开错误</summary>
            <p>${JSON.stringify(err)}</p>
          </details>
        `,
        });
        return;
      }

      this.qrcode_url = n;
      this.is_img_loaded = true;
    },
  },
  async mounted() {},
  methods: {},
};
</script>
