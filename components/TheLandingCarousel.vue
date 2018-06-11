<template>
  <div
    class="the-landing-carousel"
    v-swiper:carousel="swiperOption"
  >
    <div class="the-landing-carousel__slides-wrapper">
      <div
        v-for="image in images"
        :key="image.id"
        class="the-landing-carousel__slide"
        :style="{ backgroundImage: `url(${image.src})` }"
      />

    </div>

    <div class="the-landing-carousel__navigation">
      <div class="the-landing-carousel__navigation__button the-landing-carousel__navigation__button--prev">
        <arrow-icon />
      </div>

      <div class="the-landing-carousel__navigation__pagination" />

      <div class="the-landing-carousel__navigation__button the-landing-carousel__navigation__button--next">
        <arrow-icon />
      </div>
    </div>

  </div>
</template>

<script>
import ArrowIcon from '@/assets/swiper/arrow.svg';

export default {
  name: 'the-landing-carousel',
  components: {
    ArrowIcon,
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
      swiperOption: {
        direction: 'vertical',
        // Duration of transition between slides (in ms)
        speed: 1000,

        /* Slides grid */
        slidesPerView: 'auto',
        spaceBetween: 0,
        normalizeSlideIndex: false,

        /* Loop */
        loop: true,

        /* Namespace */
        slideClass: 'the-landing-carousel__slide',
        slideActiveClass: 'the-landing-carousel__slide--active',
        wrapperClass: 'the-landing-carousel__slides-wrapper',

        navigation: {
          nextEl: '.the-landing-carousel__navigation__button--next',
          prevEl: '.the-landing-carousel__navigation__button--prev',
        },
        pagination: {
          el: '.the-landing-carousel__navigation__pagination',
          dynamicBullets: true,
          clickable: true,
          modifierClass: 'the-landing-carousel__navigation__pagination-',
          bulletClass: 'the-landing-carousel__navigation__pagination__bullet',
          bulletActiveClass: 'the-landing-carousel__navigation__pagination__bullet--active',
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
.the-landing-carousel {
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

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
.the-landing-carousel__navigation__pagination {
  height: unset !important; // Override swiper inline style

  &__bullet {
    position: relative;
    top: unset !important; // Override swiper inline style

    display: block;

    width: 4px;
    height: 20px;
    margin: 16px 12px;

    transition: (
      opacity .5s ease-in-out,
      height 1s ease-in-out
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
