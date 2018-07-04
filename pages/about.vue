<template>
  <div class="about-page">
    <div class="about-page__header">
      <div class="about-page__header__underlay" />

      <div class="page-container">
        <p class="about-page__header__description hidden-xs-only">
          {{ $t('About.label.description') }}
        </p>
      </div>
    </div>

    <div class="page-container">
      <div class="about-page__detail">
        <LikeCoinIcon class="about-page__detail__icon" />
        <div class="pl-32 pb-16 pa-0--xs mt-32--xs">
          <p class="hidden-sm-and-up pb-16">
            {{ $t('About.label.description') }}
          </p>
          <div style="text-align: center;">
            <v-btn
              class="btn--likecoin"
              color="primary"
              href="https://like.co"
              rel="noopener noreferrer"
              target="_blank"
              depressed
            >
              {{ $t('About.button.learnMore') }}
            </v-btn>
          </div>
        </div>
      </div>

      <div class="about-page__example-wrap">
        <div
          v-for="example in examples"
          :key="example.key"
          class="about-page__example"
        >
          <img :src="example.src">
          <span class="about-page__example__content">
            {{ $t(`About.label.${example.key}`) }}
          </span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import LikeCoinIcon from '@/assets/logo/icon.svg';

import ProofOfCreativityIcon from '@/assets/icons/about/proof-of-creativity.png';
import LikeButtonIcon from '@/assets/icons/about/like-button.png';
import RewardIcon from '@/assets/icons/about/reward.png';

const examples = [
  {
    key: 'poc',
    src: ProofOfCreativityIcon,
  },
  {
    key: 'likeButton',
    src: LikeButtonIcon,
  },
  {
    key: 'rewards',
    src: RewardIcon,
  },
];

export default {
  components: {
    LikeCoinIcon,
  },
  data() {
    return {
      examples,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/css/classes';

$header-height: 152px;
$likecoin-size: 260px;
$likecoin-mobile-size: 184px;

.about-page {
  color: color(like-light-brown);

  @extend .pb-64, .text--size-28, .text--height-1-3;

  &__header {
    position: relative;
    &__underlay {
      position: absolute;
      top: #{-$header-height};
      right: 0;
      left: 0;

      width: 100%;
      height: calc(100% + #{$header-height});

      background-image: $gradient-likecoin;

      @include mobile-only {
        height: 249px;
      }
    }

    &__description {
      padding-left: $likecoin-size + 32px;

      @extend .py-32, .mt-0--xs;
    }
  }

  &__detail {
    display: flex;

    @extend .mt-32, .mt-0--xs;
    @include mobile-only {
      flex-direction: column;
    }
    @include tablet-and-up {
      flex-direction: row;
    }

    &__icon {
      flex-shrink: 0;

      @include mobile-only {
        align-self: center;

        width: $likecoin-mobile-size;
        height: $likecoin-mobile-size;
      }
      @include tablet-and-up {
        width: $likecoin-size;
        height: $likecoin-size;
        margin-top: -#{$likecoin-size / 2 + 32px};
      }
    }

    .btn--likecoin {
      height: 58px;

      border-radius: 0;

      @extend .mx-0, .px-32, .mt-24--xs, .px-4--xs;
    }
  }

  &__example {
    display: flex;
    align-items: center;
    flex-direction: column;

    @extend .px-48, .text--size-28, .mt-64--xs, .text--color-primary;
    @include tablet-and-up {
      width: 33%;
    }

    &-wrap {
      display: flex;

      @include mobile-only {
        flex-direction: column;
      }
      @include tablet-and-up {
        flex-direction: row;

        margin-top: 88px;
      }
    }

    &__content {
      text-align: center;

      @extend .pt-24, .text--height-1-3;
    }

    img {
      width: 100%;
      max-width: 211px;
      height: 124px;

      object-fit: contain;
    }
  }

  .page-container {
    position: relative;
  }
}
</style>
