<template>
  <div
    v-swiper:carousel="swiperOption"
    class="the-landing-carousel-swiper"
    @slideChange="onSlideChange"
  >
    <div class="the-landing-carousel-swiper__slides-wrapper">
      <div
        v-for="image in images"
        :key="image.url"
        :style="{ backgroundImage: `url(${image.url})` }"
        class="the-landing-carousel-swiper__slide"
        @click.self="$emit('open-details', image)"
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
      default: () => [],
      type: Array,
    },
    activeIndex: {
      required: true,
      type: Number,
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
          modifierClass:
            'the-landing-carousel-swiper__navigation__pagination--',
          bulletClass:
            'the-landing-carousel-swiper__navigation__pagination__bullet',
          bulletActiveClass:
            'the-landing-carousel-swiper__navigation__pagination__bullet--active',
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
  methods: {
    onSlideChange() {
      const { activeIndex } = this.carousel;
      this.$emit('update:activeIndex', activeIndex % this.images.length);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/css/classes';

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
    right: 0;

    padding: 16px 0;

    transition-timing-function: ease-out;
    transition-duration: 0.5s;
    transition-property: opacity, background-color;
    transform: translate3d(0px, -50%, 0);

    color: white;
    border-radius: 8px;
    background-color: #0000001f;

    @extend .mr-64--dy;

    &:not(:hover) {
      opacity: 0.6;
      background-color: transparent;
    }

    &__button {
      width: 28px;
      height: 20px;

      transition: (opacity 0.2s ease-out, transform 0.2s ease-out);

      &:hover {
        opacity: 0.7;
      }
      &:active {
        transform: translateY(1px);

        opacity: 0.7;
      }

      &--prev {
        svg {
          transform: scaleY(-1);
        }
      }

      svg {
        filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));
      }
    }
  }
}
</style>

<style lang="scss">
/* stylelint-disable-next-line no-duplicate-at-import-rules */
@import '~assets/css/classes';

$pagination__bullet-interspace: 16px;
$pagination__bullet-height: 20px;

@function get-bullet-margin($i: 1) {
  @return (
      ($pagination__bullet-height + $pagination__bullet-interspace) * $i +
        $pagination__bullet-interspace
    )
    !important;
}

.the-landing-carousel-swiper__navigation__pagination {
  height: unset !important; // Override swiper inline style

  &__bullet {
    position: relative;
    top: unset !important; // Override swiper inline style

    display: block;

    width: 4px;
    height: 1px;
    margin: 0 12px;

    transition: (
      opacity 0.5s cubic-bezier(0.2, 0.2, 0, 1),
      height 1s cubic-bezier(0.2, 0.2, 0, 1),
      margin 1s cubic-bezier(0.2, 0.2, 0, 1)
    );

    pointer-events: none;

    opacity: 0;
    border-radius: 2px;
    background-color: #fff;

    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);

    &--active {
      &-prev-prev,
      &-prev,
      &-main,
      &-next,
      &-next-next {
        height: $pagination__bullet-height;
        margin-top: $pagination__bullet-interspace;
        margin-bottom: $pagination__bullet-interspace;

        pointer-events: all;

        opacity: 0.3;
      }

      &-prev {
        &:first-child {
          margin-top: get-bullet-margin();
        }
      }
      &#{&}-main {
        height: 60px;

        opacity: 1;

        &:first-child {
          margin-top: get-bullet-margin(2);
        }
        &:last-child {
          margin-bottom: get-bullet-margin(2);
        }
      }
      &-next {
        &:last-child {
          margin-bottom: get-bullet-margin();
        }
      }
    }
  }
}
</style>
