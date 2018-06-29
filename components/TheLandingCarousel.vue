<template>
  <div class="the-landing-carousel">

    <carousel-swiper
      :images="images"
      :active-index.sync="activeImageIndex"
    />

    <transition
      v-if="activeImage"
      name="the-landing-carousel__credits--slide-fade"
    >
      <carousel-credits
        :key="activeImageIndex"
        :image="activeImage"
      />
    </transition>

  </div>
</template>

<script>
import { createMixin as createTheImageDetailsDialogMixin } from '~/components/TheImageDetailsDialog';

import CarouselCredits from './TheLandingCarouselCredits';
import CarouselSwiper from './TheLandingCarouselSwiper';

export default {
  name: 'the-landing-carousel',
  components: {
    CarouselCredits,
    CarouselSwiper,
  },
  mixins: [createTheImageDetailsDialogMixin()],
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
