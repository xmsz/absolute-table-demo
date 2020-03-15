<template>
  <div class="base-bottom-pop">
    <i
      class="base-bottom-pop-mask"
      @click="_close"
    />
    <section class="base-bottom-pop-box">
      <button
        class="base-bottom-pop-btn-close"
        @click="_close"
      >
        <i class="base-icon-font-close" />
      </button>
      <figure class="base-bottom-pop-cover">
        <img
          class="img"
          src="https://st-gdx.dancf.com/user_templets/4802065/shots/20190215-000804-DSaqT.png"
        />
      </figure>

      <article class="base-bottom-pop-article">
        <b class="base-bottom-pop-title">
          商品兑换成功
        </b>
        <div class="base-bottom-pop-content">
          您的专属兑换链接已生成，请黏贴至浏览器打开
        </div>
      </article>
      <footer class="base-bottom-pop-btn-list num-1">
        <button class="base-bottom-pop-btn base-bottom-pop-btn-1">点击复制兑换链接</button>
      </footer>
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    _close() {
      this.$emit('event-close');
    },
  },
};
</script>

<style lang="scss">
.base-bottom-pop {
  position: fixed;
  z-index: $popup-zindex;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.base-bottom-pop-mask {
  position: absolute;
  z-index: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(#000, 0.8), rgba(#000, 0.9));
  opacity: 0;
  animation: base-bottom-pop-mask 0.3s linear forwards;
  @keyframes base-bottom-pop-mask {
    100% {
      opacity: 1;
    }
  }
}
.base-bottom-pop-box {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: 30px;
  width: 690px;
  margin: 0 auto;
  background: #fff;
  border-radius: 15px;
  opacity: 0;
  transform: translate3d(0, 100%, 0);
  animation: base-bottom-pop-box 0.3s 0.1s ease-out forwards;
  @keyframes base-bottom-pop-box {
    75% {
      opacity: 1;
    }
    80% {
      transform: translate3d(0, -2%, 0);
    }
    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
}
.base-bottom-pop-btn-close {
  position: absolute;
  z-index: 2;
  right: 30px;
  top: 30px;
  font-size: 32px;
  color: #b3b3b4;
  font-weight: normal;
  line-height: 1;
  &:active {
    opacity: 0.2;
  }
}
.base-bottom-pop-cover {
  width: 100%;
  min-height: 280px;
  background: #f0fafc;
  border-radius: 15px 15px 0 0;
  .img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 15px 15px 0 0;
  }
}
.base-bottom-pop-title {
  display: block;
  padding: 50px 40px 0;
  box-sizing: border-box;
  font-size: 46px;
  color: $color-sub-title;
  font-weight: bold;
  line-height: 1.3;
  text-align: center;
}
.base-bottom-pop-content {
  padding: 0 40px;
  margin: 25px 0 0 0;
  box-sizing: border-box;
  font-size: 28px;
  color: $color-paragraph;
  font-weight: normal;
  line-height: 1.5;
  text-align: center;
}
.base-bottom-pop-btn-list {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  margin: 65px 0 0 0;
  &.num-1 {
    .base-bottom-pop-btn-1 {
      border-radius: 0 0 15px 15px;
    }
  }
  &.num-2 {
    &::before {
      content: '';
      position: absolute;
      z-index: 1;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      width: 2px;
      height: 40px;
      background: #eaeaea;
    }
    .base-bottom-pop-btn-1 {
      border-radius: 0 0 0 15px;
    }
    .base-bottom-pop-btn-2 {
      border-radius: 0 0 15px 0;
    }
  }
}
.base-bottom-pop-btn {
  display: block;
  width: 100%;
  font-size: 30px;
  color: $brand-primary;
  font-weight: bold;
  line-height: 100px;
  text-align: center;
  &:active {
    background: linear-gradient(180deg, rgba(#f0fafc, 1), rgba(#fff, 1));
    opacity: 0.8;
  }
  &.grey {
    color: #b3b3b4;
    font-weight: normal;
  }
}
</style>
