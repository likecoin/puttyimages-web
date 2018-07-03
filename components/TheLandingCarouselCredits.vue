<template>
  <div class="the-landing-carousel-credits">
    <div class="like-button">
      <span class="like-button">{{ likeCount }} Like</span>
    </div>
    <div>
      <span
        v-if="userDisplayName"
        class="text--size-12"
      >by</span> {{ userDisplayName }}<br v-if="userDisplayName">
      <a
        class="link--dark text--underline"
        href="#"
        @click="$emit('open-details', image, { isUseImage: true })"
      >use this image</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'the-landing-carousel-credits',
  props: {
    image: {
      type: Object,
      default: () => ({
        like: {
          count: 0,
        },
        user: {},
      }),
    },
  },
  computed: {
    likeCount() {
      return this.image.like.count.toLocaleString('en');
    },
    userDisplayName() {
      return this.image.user.displayName;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/css/classes';

$the-landing-carousel-credits__shadow-color: rgba(0, 0, 0, 0.7);

.the-landing-carousel-credits {
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;

  display: flex;

  color: white;

  @extend .mb-64--dy, .ml-64--dy;

  &,
  * {
    text-shadow: 0 0 10px $the-landing-carousel-credits__shadow-color;
  }

  > *:first-child {
    position: relative;

    display: flex;
    align-items: center;

    margin-right: 16px;
    padding-right: 16px;

    // Seperator
    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;

      width: 1px;

      content: '';

      background-color: white;
      box-shadow: 0 0 10px 0 $the-landing-carousel-credits__shadow-color;
    }
  }
}
</style>
