<template>
  <v-dialog
    v-model="isDialogOpen"
    :persistent="!hasGivenThanks"
    content-class="dialog--likecoin"
    max-width="512px"
    lazy
  >
    <v-card>
      <dialog-header
        :is-show-close-button="hasGivenThanks"
        title="Use or Download Image"
        @close="close"
      />

      <dialog-content>
        <transition
          :name="transitionName"
          mode="out-in"
        >
          <!-- Use or Download Image Step 1  -->
          <v-layout
            v-if="!hasGivenThanks"
            key="1"
            column
            align-center
          >
            <h2>Give thanks to the owner by giving LikeCoins!</h2>
            <user-badge
              :user="image.user"
              class="mt-40"
              type="large"
            />
            <like-button
              :count="image.like.count"
              class="mt-20"
              @click="giveThanks"
            />
            <v-btn
              class="btn--likecoin mt-24"
              color="gray-a"
              flat
              round
              small
              @click="giveThanks"
            >Maybe later</v-btn>
          </v-layout>

          <!-- Use or Download Image Step 2  -->
          <v-layout
            v-else
            key="2"
            column
          >
            <section>
              <h2>Use this image on your site / online publications</h2>
              <p>Add the following lines into the header of your web page</p>
              <code-block :code="EMBEDDED_SCRIPT_IN_HEAD" />
              <p>Add the following lines  to show the image in your webpage content</p>
              <code-block :code="embeddedCodeInBody" />
            </section>
            <section class="mt-32">
              <h2>Or download the image</h2>
              <v-layout :column="$vuetify.breakpoint.xsOnly">
                <v-select
                  v-model="selectedDownloadSizeItem"
                  :items="downloadSizeItems"
                  return-object
                />
                <v-btn
                  :block="$vuetify.breakpoint.xsOnly"
                  class="btn--likecoin"
                  color="secondary"
                  depressed
                  @click="download"
                >
                  Download
                </v-btn>
              </v-layout>
            </section>
          </v-layout>

        </transition>
      </dialog-content>
    </v-card>
  </v-dialog>
</template>

<script>
import FileSaver from 'file-saver';

import { EMBEDDED_SCRIPT_IN_HEAD } from '~/constant/index';

import CodeBlock from '~/components/CodeBlock';
import DialogContent from '~/components/DialogContent';
import DialogHeader from '~/components/DialogHeader';
import LikeButton from '~/components/LikeButton';
import UserBadge from '~/components/UserBadge';

export default {
  name: 'use-image-dialog',
  components: {
    CodeBlock,
    DialogContent,
    DialogHeader,
    LikeButton,
    UserBadge,
  },
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
      EMBEDDED_SCRIPT_IN_HEAD,

      hasGivenThanks: false,
      isDialogOpen: this.isOpen,
      selectedDownloadSizeItem: null,
    };
  },
  computed: {
    embeddedCodeInBody() {
      return `<div class="pt-img" data-src="${this.image.ipfs}"></div>`;
    },
    downloadFilename() {
      const { description, user } = this.image;
      return `${description.substr(0, 32)}-by-${user.displayName}_${
        this.selectedDownloadSizeItem.value
      }`;
    },
    downloadSizeItems() {
      return [
        ['Original Image'],
        // TODO: Download different sizes
        // ['Medium', 0.75],
        // ['Half', 0.5],
        // ['Small', 0.25],
      ].map(([label, ratio = 1]) => {
        const width = Math.floor(this.image.width * ratio);
        const height = Math.floor(this.image.height * ratio);
        const value = `${width}x${height}`;
        return {
          text: `${label} (${value}px)`,
          value,
        };
      });
    },
    transitionName() {
      return this.hasGivenThanks ? 'collapsed' : null;
    },
  },
  watch: {
    image() {
      this.resetSelectedDownloadSizeItem();
    },
    isDialogOpen(isDialogOpen) {
      if (isDialogOpen) {
        this.hasGivenThanks = false;
      }
      this.$emit('update:isOpen', isDialogOpen);
    },
    isOpen(isOpen) {
      this.isDialogOpen = isOpen;
      this.resetSelectedDownloadSizeItem();
    },
  },
  beforeMount() {
    this.resetSelectedDownloadSizeItem();
  },
  methods: {
    close() {
      this.isDialogOpen = false;
    },
    async download() {
      const blob = await fetch(this.image.url).then((res) => res.blob());
      FileSaver.saveAs(blob, this.downloadFilename);
    },
    giveThanks() {
      this.hasGivenThanks = true;
    },
    resetSelectedDownloadSizeItem() {
      [this.selectedDownloadSizeItem] = this.downloadSizeItems;
    },
  },
};
</script>
