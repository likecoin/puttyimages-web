<template>
  <v-dialog
    v-model="isDialogOpen"
    :max-width="width"
    v-bind="getDialogProps"
    content-class="base-dialog"
  >

    <header class="base-dialog__header">
      <div class="base-dialog__header--left">
        <slot name="header-left" />

        <v-btn
          v-if="isShowCloseButton"
          class="base-dialog__close-btn"
          absolute
          depressed
          fab
          small
          @click.native="$emit('close')"
        >
          <v-icon
            color="white"
            size="21"
          >close</v-icon>
        </v-btn>
      </div>

      <slot name="header-center" />

      <div
        v-if="isShowLanguageButton"
        class="base-dialog__header--right"
      >
        <language-switch />
      </div>
    </header>

    <slot />

  </v-dialog>
</template>


<script>
// import EarthIcon from '@/assets/icons/earth.svg';
import LanguageSwitch from '@/components/LanguageSwitch';

export default {
  name: 'base-dialog',
  components: {
    // EarthIcon,
    LanguageSwitch,
  },
  props: {
    dialogProps: {
      type: Object,
      default: () => {},
    },
    isDialogOpen: {
      type: Boolean,
      default: false,
    },
    isShowCloseButton: {
      type: Boolean,
      default: true,
    },
    isShowLanguageButton: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 512,
    },
  },
  computed: {
    getDialogProps() {
      return {
        ...this.dialogProps,
      };
    },
  },
};
</script>

<style lang="scss">
@import '~assets/css/classes';

$dialog-border-radius: 4px;
$header-height: 56px;
$close-btn-size: 48px;
$dialog-header-icon-size: 120px;

.base-dialog {
  overflow-y: visible;

  &__header {
    position: relative;

    height: $header-height;

    border-top: {
      left-radius: $dialog-border-radius;
      right-radius: $dialog-border-radius;
    }
    background-image: $gradient-likecoin;

    &-icon {
      position: absolute;
      top: -$dialog-header-icon-size + $header-height;
      left: calc(50% - #{$dialog-header-icon-size} / 2);

      width: $dialog-header-icon-size;
      height: $dialog-header-icon-size;
    }

    &--right {
      position: absolute;
      right: 8px;
    }
  }

  &__close-btn {
    width: $close-btn-size;
    height: $close-btn-size;
    margin-top: -$close-btn-size / 2;
    margin-left: -$close-btn-size / 2;

    background-image: linear-gradient(to right, gradient-colors(secondary));
  }

  &__earth-icon {
    width: 24px;
    height: 24px;
  }

  &__content {
    color: color(gray-4a);
    border-bottom: {
      left-radius: $dialog-border-radius;
      right-radius: $dialog-border-radius;
    }
    background-color: color(white);

    font-size: 16px;

    @extend .pt-40, .pb-48, .px-40, .px-12--xs;
  }

  h1,
  h2,
  p {
    @extend .text--align-center, .text--weight-400;
  }

  h1 {
    font-size: 38px;

    @extend .text--height-1-3;
  }

  h2 {
    @extend .text--height-1-2, .text--size-24;
  }

  p {
    @extend .text--size-16;
  }
}
</style>
