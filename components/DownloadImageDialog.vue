<template>
  <v-dialog
    v-model="isDialogOpen"
    content-class="download-image-dialog ma-0"
    max-width="512px"
    hide-overlay
    lazy
    persistent
  >
    <v-card>
      <header>
        <v-btn
          class="btn--likecoin dialog-header__close-btn"
          color="primary"
          icon
          flat
          large
          @click.native="close"
        >
          <v-icon>close</v-icon>
        </v-btn>
        <h1>{{ $t('DownloadImageDialog.title') }}</h1>
      </header>

      <section class="mt-8 pb-20">
        <v-layout
          column
          align-center
        >
          <i18n
            class="px-40 text--size-16"
            path="DownloadImageDialog.content"
            tag="h2"
          >
            <span class="text--color-gray-73 text--weight-600">
              Like
            </span>
            <a
              class="text--color-primary text--weight-600"
              href="https://like.co"
              rel="noopener noreferrer"
              target="_blank"
            >LikeCoin</a>
          </i18n>

          <iframe
            :src="likeButtonUrl"
            allowtransparency
            class="download-image-dialog__like-button"
            frameBorder="0"
          />
        </v-layout>
      </section>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import FileSaver from 'file-saver';
import _throttle from 'lodash.throttle';

export default {
  name: 'download-image-dialog',
  props: {
    image: {
      required: true,
      type: Object,
    },
    isOpen: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      isDialogOpen: this.isOpen,
    };
  },
  computed: {
    ...mapGetters('ImageDetailsDialog', ['getIsImageDetailsDialogOpen']),
    downloadFilename() {
      const { description, user } = this.image;
      return `${description.substr(0, 32)}-by-${user.displayName}`;
    },
    likeButtonUrl() {
      const referrer = process.browser
        ? `?referrer=${window.location.href}`
        : '';
      return `https://rinkeby.like.co/in/embed/${
        this.image.user.likecoinId
      }/button${referrer}`;
    },
  },
  watch: {
    isDialogOpen(isDialogOpen) {
      this.$emit('update:isOpen', isDialogOpen);
    },
    isOpen(isOpen) {
      if (isOpen) {
        this.positionDialog();
        this.download();
      }
      this.isDialogOpen = isOpen;
    },
    getIsImageDetailsDialogOpen(isOpen) {
      if (!isOpen) {
        this.isDialogOpen = false;
      }
    },
  },
  mounted() {
    window.addEventListener('resize', _throttle(this.positionDialog, 25));
  },
  methods: {
    ...mapActions('ImageDetailsDialog', ['downloadImage']),
    close() {
      this.isDialogOpen = false;
    },
    async download() {
      const blob = await fetch(this.image.url).then((res) => res.blob());
      FileSaver.saveAs(blob, this.downloadFilename);

      this.downloadImage(this.image.fingerprint);
    },
    positionDialog() {
      const dialog = document.querySelector('.download-image-dialog');
      if (!dialog) return;
      if (this.$vuetify.breakpoint.xs) {
        dialog.style.position = 'static';
      } else {
        // position download dialog at the horizontal middle of the image preview
        const image = document.querySelector('.image-preview__image--loaded');
        const imageRect = image.getBoundingClientRect();

        dialog.style.position = 'fixed';
        dialog.style.top = `${imageRect.y + 48}px`;
        dialog.style.left = `${imageRect.width / 2 - 512 / 2}px`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/css/classes';

.download-image-dialog {
  header {
    h1 {
      color: color(dark-brown-2);

      @extend .px-40, .text--size-32, .text--weight-300;
    }
  }

  h2 {
    @extend .text--weight-300;
  }

  &__like-button {
    width: 80%;

    background-color: transparent;

    @extend .mt-24;
  }
}
</style>
