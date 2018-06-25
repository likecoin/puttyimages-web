<template>
  <div class="dialog-content">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'dialog-content',
};
</script>

<style lang="scss" scoped>
@import '~assets/css/classes';

.dialog-content {
  @extend .px-48, .pb-48, .px-24--sm, .py-24, .py-24--sm;

  .dialog-header + & {
    @extend .pt-0;
  }

  & + & {
    @extend .mb-32;
  }
}
</style>
