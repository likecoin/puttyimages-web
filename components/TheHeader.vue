<template>
  <div :class="classObject">

    <transition name="page">
      <div
        v-if="isHomePage"
        key="home-banner"
        class="the-header__banner the-header__banner--home"
      >
        <div>
          <the-logo color="primary" />
        </div>
      </div>
      <div
        v-else
        key="generic-banner"
        class="the-header__banner the-header__banner--generic"
      >
        <the-logo :color="color" />
      </div>
    </transition>

    <the-sliding-menu :color="color" />

  </div>
</template>

<script>
import { ColorPropType } from '@/constant/prop-types';

import TheLogo from '@/components/TheLogo';
import TheSlidingMenu from '@/components/TheSlidingMenu';

export default {
  name: 'the-header',
  components: {
    TheLogo,
    TheSlidingMenu,
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    color: ColorPropType,
  },
  computed: {
    classObject() {
      return ['the-header', `the-header--${this.color}`];
    },
    isHomePage() {
      return this.$route.name === 'index';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/css/classes';

.the-header {
  margin-bottom: 152px;

  @include mobile-only {
    margin-bottom: 120px;
  }

  &__banner {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;

    > div {
      position: relative;
    }

    @extend .pb-32;

    &--generic {
      @extend .mt-64--dy, .ml-64--dy;
    }

    &--home {
      width: 100vw;

      @extend .px-24, .pt-64--dy, .ml-64, .ml-0--xs;

      @include tablet-and-up {
        max-width: 576px;
      }
      @include tablet-only {
        width: 60vw;
      }

      &::before {
        position: absolute;
        z-index: 0;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        content: ' ';

        background-image: $gradient-likecoin;

        box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.3);
      }
    }
  }

  @include color-modifiers;
}
</style>
