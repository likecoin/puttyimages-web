<template>
  <div class="plugin-page">
    <div class="plugin-page__header">
      <div class="plugin-page__header__underlay" />

      <div class="page-container">
        <div class="plugin-page__header__description">
          Get or Reward Content Creators LikeCoin with the SuperLike Widgets and Wordpress Plugins
        </div>
      </div>
    </div>

    <div class="page-container">
      <v-layout class="plugin-page__content">
        <v-layout column>
          <div class="plugin-page__content__wrap">
            <div>
              <h2>Your SuperLike Widgets</h2>
              <div>
                <v-select
                  :items="['Large Button', 'Icon']"
                  v-model="widgetSize"
                  append-icon="expand_more"
                  class="input-text--likecoin mt-16"
                  label="Choose a size"
                />
              </div>
              <div class="likecoin-button">
                2.4k
              </div>
              <div class="text--size-16">
                Copy the below code to your site
              </div>

              <div class="plugin-page__content__code-label">
                Add the following lines into the header of your web page
              </div>
              <code-block :code="EMBEDDED_SCRIPT_IN_HEAD" />

              <div class="plugin-page__content__code-label">
                Add the following lines to show the image in your webpage content
              </div>
              <code-block :code="embeddedCodeInBody" />
            </div>
          </div>
        </v-layout>

        <v-layout column>
          <div class="plugin-page__content__wrap">
            <div>
              <h2>Wordpress Plugin</h2>
              <img
                class="plugin-page__wordpress-image"
                src="http://via.placeholder.com/371x233"
              >
              <p class="my-24 text--size-16">
                Use PuttyImage and contribute creators automatically with the official wordpress plugin
              </p>
              <v-btn
                class="btn--likecoin"
                color="secondary"
                small
              >
                Download
              </v-btn>
            </div>
          </div>
        </v-layout>
      </v-layout>
    </div>

  </div>
</template>

<script>
import CodeBlock from '~/components/CodeBlock';
import LikeCoinIcon from '~/assets/logo/icon.svg';

import { EMBEDDED_SCRIPT_IN_HEAD } from '~/constant/index';

export default {
  components: {
    CodeBlock,
    LikeCoinIcon,
  },
  data() {
    return {
      EMBEDDED_SCRIPT_IN_HEAD,
      embeddedCodeInBody: '<div class="pt-img" data-src="241245"></div>',
      widgetSize: 'Large Button',
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/css/classes';

$header-height: 152px;

.plugin-page {
  @extend .pb-40;

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
    }

    &__description {
      color: color(like-light-brown);

      @extend .pa-64, .px-24--xs, .pt-0--xs, .text--size-28, .text--height-1-3;
    }
  }

  &__content {
    @extend .text--color-primary;
    @include mobile-only {
      flex-direction: column;
    }
    @include tablet-and-up {
      flex-direction: row;
    }

    > * {
      flex: 1 !important;

      @extend .mx-8, .mt-48, .mx-0--xs;
    }

    &__wrap {
      overflow: hidden;
      > * {
        background-color: #f7f7f7;

        @extend .pa-32;
      }
    }

    &__code-label {
      color: color(gray-4a);

      @extend .text--size-12, .mt-24;
    }

    h2 {
      @extend .pb-16, .text--size-28, .text--weight-400;
    }

    .input-text--likecoin :global(label) {
      color: color(like-green);
    }
  }

  &__wordpress-image {
    position: relative;
    left: -32px;

    width: calc(100% + 64px);

    object-fit: cover;
  }

  .page-container {
    position: relative;

    @extend .px-0--xs;
  }

  .btn--likecoin {
    height: 42px;

    @extend .mx-0, .text--size-18;
  }
}

.likecoin-button {
  width: 189px;
  height: 73px;

  border: solid 1px rgba(40, 100, 110, 0.49);
  border-radius: 5px;
  background-image: $gradient-likecoin;

  @extend .my-32;
}
</style>
