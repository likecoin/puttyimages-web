<template>
  <div class="home-page">

    <the-landing-carousel />

  </div>
</template>

<script>
import TheLandingCarousel from '@/components/TheLandingCarousel';

export default {
  components: {
    TheLandingCarousel,
  },
  head() {
    return {
      title: 'puttyimages',
    };
  },
};
</script>

<style lang="scss" scoped>
.image-upload-btn-wrapper {
  position: fixed;
  right: 48px;
  bottom: 72px;

  .btn--likecoin {
    height: 88px;

    :global(.btn__content) {
      padding: 0 64px;
    }
  }
}
</style>
