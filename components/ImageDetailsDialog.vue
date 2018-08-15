<template>
  <v-dialog
    v-model="isOpen"
    content-class="image-details-dialog"
    fullscreen
    full-width
    lazy
  >
    <div
      class="image-details-dialog"
      @click.self="close"
    >
      <image-details
        ref="imageDetails"
        :image="image"
        :is-report-image="isReportImage"
        :is-use-image="isUseImage"
        class="image-details-dialog__image-details"
      >
        <v-btn
          slot="panel-top-left"
          class="btn--likecoin image-details-dialog__close-btn"
          color="primary"
          icon
          flat
          large
          @click.native="close"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </image-details>
    </div>
  </v-dialog>
</template>

<script>
import ImageDetails from '~/components/ImageDetails';

export default {
  name: 'image-details-dialog',
  components: {
    ImageDetails,
  },
  props: {
    image: {
      required: true,
      type: Object,
    },
    isError: {
      type: [Boolean, String],
      default: false,
    },
    isFetched: {
      type: [Boolean, String],
      default: false,
    },
    isFetching: {
      type: [Boolean, String],
      default: false,
    },
    isOpen: {
      default: false,
      type: [Boolean, String],
    },
    isReportImage: {
      default: false,
      type: [Boolean, String],
    },
    isUseImage: {
      default: false,
      type: [Boolean, String],
    },
  },
  watch: {
    isOpen(isOpen) {
      if (isOpen && this.$refs.imageDetails) {
        this.$refs.imageDetails.openSubDialogIfNeeded();
      }
    },
  },
  methods: {
    close() {
      this.$emit('update:isOpen', false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/css/classes';

.image-details-dialog {
  @extend .py-24--sm;

  &__close-btn {
    margin: 40px 0 24px 40px;

    @include tablet-and-below {
      margin-top: 24px;
      margin-left: -16px;
    }
  }

  &__image-details {
    box-shadow: 0 2px 94px 0 rgba(0, 0, 0, 0.5);

    @include desktop-and-up {
      height: 100vh;
    }
  }
}
</style>

<style lang="scss">
.image-details-dialog.dialog {
  box-shadow: none;
}
</style>
