<template>
  <div class="the-landing-carousel">

    <swiper
      :images="images"
      :active-index.sync="activeImageIndex"
    />

    <transition name="the-landing-carousel__credits--slide-fade">
      <div
        :key="activeImage.id"
        class="the-landing-carousel__credits"
      >
        <div class="like-button">
          <span class="like-button">{{ activeImageLikeCount }} Like</span>
        </div>
        <div>
          <span class="text--size-12">by</span> {{ activeImage.author }}<br>
          <a
            class="link--dark text--underline"
            href="#"
          >use this image</a>
        </div>
      </div>
    </transition>

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
      activeImageIndex: 0,
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
  computed: {
    activeImage() {
      return this.images[this.activeImageIndex];
    },
    activeImageLikeCount() {
      return this.activeImage.likeCount.toLocaleString('en');
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
