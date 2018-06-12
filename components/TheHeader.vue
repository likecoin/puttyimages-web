<template>
  <div class="the-header">

    <nuxt-link class="the-logo" :to="{ name: 'index' }">
      <logo class="the-logo__icon" />
      <div>
        <div class="the-logo__type">puttyimages</div>
        <div class="the-logo__subtitle">Supported by LikeCoin</div>
      </div>
    </nuxt-link>

    <sliding-menu />

  </div>
</template>

<script>
import SlidingMenu from '@/components/SlidingMenu';

import Logo from '@/assets/icons/logo.svg';

export default {
  name: 'the-header',
  components: {
    Logo,
    SlidingMenu,
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/css/variables';
@import '~assets/css/mixins';

.the-header {
  margin-bottom: 152px;
}

.the-logo {
  @include responsive-inset(0,
    margin-top,
    margin-left
  );

  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;

  display: flex;

  color: color(like-green);
}

.the-logo__icon {
  width: 56px;
  height: 56px;
  margin-right: 12px;

  color: inherit;

  fill: currentColor;
}

.the-logo__type {
  font-size: 24px;
}

.the-logo__subtitle {
  font-size: 12px;
}
</style>

