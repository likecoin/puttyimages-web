<template>
  <div class="the-header">

    <div
      v-if="isHomePage"
      class="the-header__banner the-header__banner--home"
    >
      <div>
        <the-logo class="the-header__logo" />

        <h1 class="the-header__banner__slogan--line-1">
          Making profit with free to use photos
        </h1>
        <h2 class="the-header__banner__slogan--line-2">
          Rewarding Contents by Proof of Creativity
        </h2>

        <v-btn
          class="the-header__banner__upload-button btn--likecoin"
          color="secondary"
        >
          <v-icon>add_circle_outline</v-icon>
          <span>Upload Your Image</span>
        </v-btn>

      </div>
    </div>
    <div
      v-else
      class="the-header__banner the-header__banner--generic"
    >
      <the-logo class="the-header__logo" />
    </div>

    <the-sliding-menu />

  </div>
</template>

<script>
import TheLogo from '@/components/TheLogo';
import TheSlidingMenu from '@/components/TheSlidingMenu';

export default {
  name: 'the-header',
  components: {
    TheLogo,
    TheSlidingMenu,
  },
  computed: {
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

      @extend .mt-8,
        .text--color-secondary,
        .text--color-white--xs,
        .text--size-20,
        .text--weight-400;
    }
  }
}
</style>
