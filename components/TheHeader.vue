<template>
  <div class="the-header">

    <div v-if="isHomePage" class="the-header__banner the-header__banner--home">
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
    <div v-else class="the-header__banner the-header__banner--generic">
      <the-logo class="the-header__logo" />
    </div>

    <sliding-menu />

  </div>
</template>

<script>
import SlidingMenu from '@/components/SlidingMenu';
import TheLogo from '@/components/TheLogo';

export default {
  name: 'the-header',
  components: {
    TheLogo,
    SlidingMenu,
  },
  computed: {
    isHomePage() {
      return this.$route.name === 'index';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/css/variables';
@import '~assets/css/mixins';
@import '~assets/css/classes';

.the-header {
  margin-bottom: 152px;

  &__logo {
    padding-bottom: 24px;
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
      @include responsive-inset(0,
        margin-top,
        margin-left
      );
    }

    &--home {
      padding: 0 24px 48px;

      @include responsive-inset(0,
        padding-top,
        margin-left
      );
      @include tablet-and-up {
        width: 360px;
      }
      @include mobile-only {
        width: 100vw;
        margin-left: 0;
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
        margin: 24px 0 0;
      }
    }

    &__slogan--line-1 {
      @include mobile-only {
        max-width: 230px;
        margin-top: 32px;
      }
      @extend
        %text--color-primary,
        %text--xs--color-white,
        %text--size-32,
        %text--xs--size-24,
        %text--height-1-2,
        %text--weight-600;
    }

    &__slogan--line-2 {
      max-width: 230px;
      margin-top: 8px;

      @extend
        %text--color-secondary,
        %text--xs--color-white,
        %text--size-20,
        %text--weight-400;
    }
  }
}
</style>

