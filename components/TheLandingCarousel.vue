<template>
  <div class="the-landing-carousel">

    <swiper
      :images="images"
      :active-index.sync="activeImageIndex"
    />

    <transition name="the-landing-carousel__credits--slide-fade">
      <div
        :key="activeImage.url"
        class="the-landing-carousel__credits"
      >
        <div class="like-button">
          <span class="like-button">{{ activeImageLikeCount }} Like</span>
        </div>
        <div>
          <span
            v-if="activeImageUserDisplayName"
            class="text--size-12"
          >by</span> {{ activeImageUserDisplayName }}<br v-if="activeImageUserDisplayName">
          <a
            class="link--dark text--underline"
            href="#"
            @click="useImage"
          >use this image</a>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import { createMixin as createTheImageDetailsDialogMixin } from '~/components/TheImageDetailsDialog';

import Swiper from './TheLandingCarouselSwiper';

export default {
  name: 'the-landing-carousel',
  components: {
    Swiper,
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
    activeImageLikeCount() {
      const { like } = this.activeImage;
      return (like ? like.count : 0).toLocaleString('en');
    },
    activeImageUserDisplayName() {
      const { user } = this.activeImage;
      return user ? user.displayName : '';
    },
  },
  methods: {
    useImage() {
      this.setImageDetailsDialog({
        image: this.activeImage,
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

.the-landing-carousel {
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  &__credits {
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 0;

    display: flex;

    color: white;

    @extend .mb-64--dy, .ml-64--dy;

    &--slide-fade- {
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

    > *:first-child {
      display: flex;
      align-items: center;

      margin-right: 16px;
      padding-right: 16px;

      border-right: solid 1px white;
    }
  }
}
</style>
