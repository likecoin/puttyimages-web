<template>
  <nuxt-link
    :class="classObject"
    :to="{ name: 'index' }"
  >
    <logo class="the-logo__icon" />
    <div>
      <div class="the-logo__type">
        {{ $t('General.label.puttyimages') }}
      </div>
      <div class="the-logo__subtitle">
        {{ $t('General.label.sponsor') }}
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import { ColorPropType } from '@/constant/prop-types';

import Logo from '@/assets/icons/logo.svg';

export default {
  name: 'the-logo',
  components: {
    Logo,
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    color: ColorPropType,
  },
  computed: {
    classObject() {
      return ['the-logo', `the-logo--${this.color}`];
    },
  },
};
</script>

<style lang="scss">
@import '~assets/css/helpers';

.the-logo {
  top: 0;
  left: 0;

  display: flex;

  @include color-modifiers;
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
