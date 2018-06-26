<template>
  <div class="dialog-header">
    <transition name="page">
      <v-btn
        v-if="isShowCloseButton"
        class="btn--likecoin dialog-header__close-btn"
        color="primary"
        icon
        flat
        large
        @click.native="$emit('close')"
      >
        <v-icon>close</v-icon>
      </v-btn>
    </transition>

    <h1>
      {{ title }}
    </h1>
  </div>
</template>

<script>
export default {
  name: 'dialog-header',
  props: {
    title: {
      type: String,
      default: '',
    },
    isShowCloseButton: {
      type: [Boolean, String],
      default: false,
    },
  },
};
</script>

<style style lang="scss" scoped>
@import '~assets/css/classes';

.dialog-header {
  @extend .pa-24;

  &__close-btn {
    position: absolute;

    margin: 0;
    margin-left: -8px;
  }

  h1 {
    @extend .px-48;
  }
}
</style>
