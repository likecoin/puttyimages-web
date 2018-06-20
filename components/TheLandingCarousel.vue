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
          <span class="text--size-12">by</span> {{ activeImage.user.displayName }}<br>
          <a
            class="link--dark text--underline"
            href="#"
            @click="useImage"
          >use this image</a>
        </div>
      </div>
    </transition>

    <image-details-dialog
      v-if="detailsImage"
      :image="detailsImage"
      :is-open.sync="isOpenDialog"
    />

  </div>
</template>

<script>
import ImageDetailsDialog from '@/components/ImageDetailsDialog';
import Swiper from './TheLandingCarouselSwiper';

export default {
  name: 'the-landing-carousel',
  components: {
    ImageDetailsDialog,
    Swiper,
  },
  data() {
    return {
      activeImageIndex: 0,
      detailsImage: null,
      images: [
        {
          user: {
            likecoinId: 'bejaminvon',
            displayName: 'Bejamin Von',
          },
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque. In volutpat ante semper diam molestie, et aliquam er…',
          height: 1440,
          license: {
            name: 'cc0',
          },
          like: {
            count: 3242,
          },
          tags: [{ name: 'Mountain' }, { name: 'Landscape' }, { name: 'Cold' }],
          url: 'https://picsum.photos/2560/1440?image=961',
          width: 2560,
        },
        {
          user: {
            likecoinId: 'tobias1',
            displayName: 'Tobias',
          },
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque. In volutpat ante semper diam molestie, et aliquam er…',
          height: 1440,
          license: {
            name: 'cc0',
          },
          like: {
            count: 1767,
          },
          tags: [{ name: 'Mountain' }, { name: 'Landscape' }, { name: 'Cold' }],
          url: 'https://picsum.photos/2560/1440?image=985',
          width: 2560,
        },
        {
          user: {
            likecoinId: 'davidng',
            displayName: 'David Ng',
          },
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque. In volutpat ante semper diam molestie, et aliquam er…',
          height: 1440,
          license: {
            name: 'cc0',
          },
          like: {
            count: 485,
          },
          tags: [{ name: 'Girl' }, { name: 'Women' }],
          url: 'https://picsum.photos/2560/1440?image=1027',
          width: 2560,
        },
      ],
      isOpenDialog: false,
    };
  },
  computed: {
    activeImage() {
      return this.images[this.activeImageIndex];
    },
    activeImageLikeCount() {
      return this.activeImage.like.count.toLocaleString('en');
    },
  },
  methods: {
    useImage() {
      this.detailsImage = this.activeImage;
      this.isOpenDialog = true;
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
