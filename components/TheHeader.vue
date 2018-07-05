<template>
  <div :class="classObject">

    <transition name="page">
      <div
        v-if="isHomePage"
        key="home-banner"
        class="the-header__banner the-header__banner--home"
      >
        <div>
          <the-logo
            color="primary"
            class="the-header__logo"
          />

          <h1 class="the-header__banner__slogan--line-1">
            {{ $t('Header.Home.label.sloganLine1') }}
          </h1>
          <h2 class="the-header__banner__slogan--line-2">
            {{ $t('Header.Home.label.sloganLine2') }}
          </h2>

          <v-btn
            :to="{ name: 'upload' }"
            class="the-header__banner__upload-button btn--likecoin"
            color="secondary"
          >
            <v-icon>add_circle_outline</v-icon>
            <span>{{ $t('Header.Home.button.uploadImage') }}</span>
          </v-btn>

        </div>
      </div>
      <div
        v-else
        key="generic-banner"
        class="the-header__banner the-header__banner--generic"
      >
        <the-logo
          :color="color"
          class="the-header__logo"
        />
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

  &__logo {
    @extend .pb-24;
  }

  &__banner {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;

    > div {
      position: relative;
    }

    &--generic {
      @extend .mt-64--dy, .ml-64--dy;
    }

    &--home {
      @extend .px-24, .pt-64--dy, .pb-48, .ml-64, .ml-0--xs;

      @include tablet-and-up {
        width: 360px;
      }
      @include mobile-only {
        width: 100vw;
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

        @include tablet-and-up {
          border-bottom: {
            left-radius: 8px;
            right-radius: 8px;
          }
        }
        @include mobile-only {
          height: 104px;
        }
      }

      .the-header__banner__upload-button {
        @extend .ma-0, .my-24;
      }
    }

    &__slogan--line-1 {
      @include mobile-only {
        max-width: 230px;

        text-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
      }
      @extend .mt-32--xs,
        .text--color-primary,
        .text--color-white--xs,
        .text--size-32,
        .text--size-24--xs,
        .text--height-1-2,
        .text--weight-600;
    }

    &__slogan--line-2 {
      max-width: 230px;

      @include mobile-only {
        text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
      }

      @extend .mt-8,
        .text--color-secondary,
        .text--color-white--xs,
        .text--size-20,
        .text--weight-400;
    }
  }

  @include color-modifiers;
}
</style>
