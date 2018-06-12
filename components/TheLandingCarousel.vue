<template>
  <div class="the-landing-carousel">

    <swiper :images="images" />

  </div>
</template>

<script>
import Swiper from './TheLandingCarouselSwiper';

export default {
  name: 'the-landing-carousel',
  components: {
    Swiper,
  },
  data() {
    return {
      images: [
        {
          id: 1,
          author: 'Bejamin Von',
          likeCount: 3242,
          src: 'https://picsum.photos/2560/1440?image=961',
        },
        {
          id: 2,
          author: 'Tobias',
          likeCount: 1767,
          src: 'https://picsum.photos/2560/1440?image=985',
        },
        {
          id: 3,
          author: 'David Ng',
          likeCount: 485,
          src: 'https://picsum.photos/2560/1440?image=1027',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.the-landing-carousel {
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;
}
</style>
