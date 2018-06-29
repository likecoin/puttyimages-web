<template>
  <div class="home-page">

    <the-landing-carousel :images="images" />

  </div>
</template>

<script>
import axios from '~/plugins/axios';

import TheLandingCarousel from '@/components/TheLandingCarousel';

export default {
  layout: 'index',
  components: {
    TheLandingCarousel,
  },
  asyncData() {
    return axios
      .get('/api/assets/featured/list')
      .then((res) => ({ images: res.data }))
      .catch(() => ({ images: [] }));
  },
  data() {
    return {
      images: [],
    };
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
