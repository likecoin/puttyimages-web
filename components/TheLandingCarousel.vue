<template>
  <div class="the-landing-carousel">

    <carousel-swiper
      v-if="images.length"
      :images="images"
      :active-index.sync="activeImageIndex"
      @open-details="openDetails"
    />

    <transition
      v-if="activeImage"
      name="the-landing-carousel__credits--slide-fade"
    >
      <carousel-credits
        :key="activeImageIndex"
        :image="activeImage"
        @open-details="openDetails"
      />
    </transition>

  </div>
</template>

<script>
import { mapActions } from 'vuex';

import CarouselCredits from './TheLandingCarouselCredits';
import CarouselSwiper from './TheLandingCarouselSwiper';

export default {
  name: 'the-landing-carousel',
  components: {
    CarouselCredits,
    CarouselSwiper,
  },
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      activeImageIndex: 0,
    };
  },
  computed: {
    activeImage() {
      return this.images[this.activeImageIndex];
    },
  },
  methods: {
    ...mapActions(['toggleImageDetailsDialog']),
    openDetails(image, options = {}) {
      this.toggleImageDetailsDialog({
        image,
        ...options,
      });
    },
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

  &__credits--slide-fade- {
    &enter-active,
    &leave-active {
      transition: (
        transform 1s cubic-bezier(0.2, 0.2, 0, 1),
        opacity 1s cubic-bezier(0.2, 0.2, 0, 1)
      );
    }
    &enter,
    &leave-to {
      transform: translateX(10px);

      opacity: 0;
    }
  }
}
</style>
