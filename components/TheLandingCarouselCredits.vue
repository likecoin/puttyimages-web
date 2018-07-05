<template>
  <div class="the-landing-carousel-credits">
    <div>

      <div class="like-button">
        <span class="like-button">
          {{ $t('Landing.Credit.label.likeCount', { amount: likeCount }) }}
        </span>
      </div>

      <div>
        <i18n path="Landing.Credit.label.byAuthor">
          <span
            v-if="userDisplayName"
            class="text--size-12"
            place="by"
          >by</span><span place="author"> {{ userDisplayName }}</span>
        </i18n><br v-if="userDisplayName">
        <a
          class="link--dark text--underline"
          href="#"
          @click="$emit('open-details', image, { isUseImage: true })"
        >{{ $t('Landing.Credit.button.useThisImage') }}</a>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'the-landing-carousel-credits',
  props: {
    image: {
      type: Object,
      default: () => ({
        like: {
          count: 0,
        },
        user: {},
      }),
    },
  },
  computed: {
    likeCount() {
      return this.image.like.count.toLocaleString('en');
    },
    userDisplayName() {
      return this.image.user.displayName;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/css/classes';

$the-landing-carousel-credits__shadow-color: rgba(0, 0, 0, 0.7);

.the-landing-carousel-credits {
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;

  color: white;

  @extend .pb-64--dy, .px-64--dy;

  // The underlay gradient
  &::before {
    position: absolute;
    bottom: 0;
    left: 0;

    width: 100vw;
    height: 20vh;
    min-height: 160px;

    content: '';

    transition: opacity 0.5s ease;

    opacity: 0.3;
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.5)
    );
  }
  &:hover::before {
    opacity: 0.6;
  }

  &,
  * {
    text-shadow: 0 0 3px $the-landing-carousel-credits__shadow-color;
  }

  > div {
    position: relative;

    display: flex;

    > * {
      &:first-child {
        position: relative;

        display: flex;
        align-items: center;

        margin-right: 16px;
        padding-right: 16px;

        // Seperator
        &::after {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;

          width: 1px;

          content: '';

          background-color: white;
          box-shadow: 0 0 3px 0 $the-landing-carousel-credits__shadow-color;
        }
      }
    }
  }
}
</style>
