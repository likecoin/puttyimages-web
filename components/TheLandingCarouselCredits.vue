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
        @click="useImage"
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
  methods: {
    useImage() {
      this.setImageDetailsDialog({
        image: this.image,
        isFetched: true,
        isOpen: true,
        isUseImage: true,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/css/classes';

.the-landing-carousel-credits {
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;

  display: flex;

  color: white;

  @extend .mb-64--dy, .ml-64--dy;

  > *:first-child {
    display: flex;
    align-items: center;

    margin-right: 16px;
    padding-right: 16px;

    border-right: solid 1px white;
  }
}
</style>
