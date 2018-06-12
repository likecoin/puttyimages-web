<template>
  <div
    class="the-landing-carousel-swiper"
    v-swiper:carousel="swiperOption"
  >
    <div class="the-landing-carousel-swiper__slides-wrapper">
      <div
        v-for="image in images"
        :key="image.id"
        class="the-landing-carousel-swiper__slide"
        :style="{ backgroundImage: `url(${image.src})` }"
      />

    </div>

    <div class="the-landing-carousel-swiper__navigation">
      <div class="the-landing-carousel-swiper__navigation__button the-landing-carousel-swiper__navigation__button--prev">
        <arrow-icon />
      </div>

      <div class="the-landing-carousel-swiper__navigation__pagination" />

      <div class="the-landing-carousel-swiper__navigation__button the-landing-carousel-swiper__navigation__button--next">
        <arrow-icon />
      </div>
    </div>

  </div>
</template>

<script>
import ArrowIcon from '@/assets/swiper/arrow.svg';

export default {
  name: 'the-landing-carousel-swiper',
  components: {
    ArrowIcon,
  },
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    // IMPORTANT:
    // Do not change this data after mounted, otherwise Swiper will render all
    // self generated DOM element causing weired animation
    return {
      swiperOption: {
        direction: 'vertical',
        // Duration of transition between slides (in ms)
        speed: 1000,

        /* Slides grid */
        slidesPerView: 'auto',
        spaceBetween: 0,

        /* Loop */
        loop: true,

        /* Namespace */
        slideClass: 'the-landing-carousel-swiper__slide',
        slideActiveClass: 'the-landing-carousel-swiper__slide--active',
        wrapperClass: 'the-landing-carousel-swiper__slides-wrapper',

        navigation: {
          nextEl: '.the-landing-carousel-swiper__navigation__button--next',
          prevEl: '.the-landing-carousel-swiper__navigation__button--prev',
        },
        pagination: {
          el: '.the-landing-carousel-swiper__navigation__pagination',
          dynamicBullets: true,
          clickable: true,
          modifierClass: 'the-landing-carousel-swiper__navigation__pagination--',
          bulletClass: 'the-landing-carousel-swiper__navigation__pagination__bullet',
          bulletActiveClass: 'the-landing-carousel-swiper__navigation__pagination__bullet--active',
        },
        autoplay: {
          // Delay between transitions (in ms)
          delay: 5000,
          disableOnInteraction: false,
        },
        mousewheel: {
          forceToAxis: true,
          invert: true,
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.the-landing-carousel-swiper {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  &__slides-wrapper {
    height: inherit;
  }

  &__slide {
    height: inherit;

    background-position: center;
    background-size: cover;
  }

  &__navigation {
    position: absolute;
    top: 50%;
    right: 60px;

    padding: 16px 0;

    transition: opacity .5s ease-out;
    transform: translate3d(0px, -50%, 0);

    color: white;
    border-radius: 8px;
    background-color: #0000004F;

    &:not(:hover) {
      opacity: .6;
    }

    &__button {
      width: 28px;
      height: 20px;

      transition: (
      opacity .2s ease-out,
      transform .2s ease-out
      );

      &:hover {
        opacity: .7;
      }
      &:active {
        transform: translateY(1px);

        opacity: .7;
      }

      &--prev {
        svg {
          transform: scaleY(-1);
        }
      }
    }
  }
}
</style>

<style lang="scss">
.the-landing-carousel-swiper__navigation__pagination {
  height: unset !important; // Override swiper inline style

  &__bullet {
    position: relative;
    top: unset !important; // Override swiper inline style

    display: block;

    width: 4px;
    height: 20px;
    margin: 16px 12px;

    transition: (
      opacity .5s cubic-bezier(.2, .2, 0, 1),
      height 1s cubic-bezier(.2, .2, 0, 1)
    );

    opacity: .3;
    background-color: #FFF;

    &--active {
      height: 60px;

      opacity: 1;
    }
  }
}
</style>
