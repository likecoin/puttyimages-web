<template>
  <nuxt-link
    :to="{ name: 'index' }"
    class="the-logo"
  >
    <logo class="the-logo__icon" />
    <div>
      <div class="the-logo__type">puttyimages</div>
      <div class="the-logo__subtitle">Supported by LikeCoin</div>
    </div>
  </nuxt-link>
</template>

<script>
import Logo from '@/assets/icons/logo.svg';

export default {
  name: 'the-logo',
  components: {
    Logo,
  },
};
</script>

<style lang="scss">
@import '~assets/css/variables';

.the-logo {
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
