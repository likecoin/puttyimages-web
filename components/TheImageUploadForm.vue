<template>
  <v-form
    ref="form"
    v-model="formValid"
    class="the-upload-image-form mx-auto"
    lazy-validation
  >
    <v-text-field
      v-model="description"
      :rules="descriptionRules"
      class="input-text--likecoin"
      placeholder="Describe briefly about your image"
      light
      single-line
    />

    <v-select
      v-model="tags"
      :rules="tagsRules"
      append-icon=""
      class="input-text--likecoin"
      label="Add some tags"
      placeholder="ex. apple, cat, table"
      chips
      light
      tags
      @input="onTagChange"
    >
      <template
        slot="selection"
        slot-scope="data"
      >
        <v-chip
          :selected="data.selected"
          class="chip--likecoin"
          color="secondary"
        >
          <span>{{ data.item }}</span>
          <v-btn
            color="white"
            flat
            icon
            small
            @click="removeTag(data.item)"
          >
            <v-icon small>close</v-icon>
          </v-btn>
        </v-chip>
      </template>
    </v-select>

    <div class="the-upload-image-form__license-input">
      <v-select
        v-model="license"
        :hint="licenseHint"
        :items="supportedLicense"
        :rules="licenseRules"
        append-icon="expand_more"
        class="input-text--likecoin"
        label="Image License"
        placeholder="Choose an appropriate license"
        light
        persistent-hint
      />
      <v-btn
        class="btn--likecoin the-upload-image-form__license-input__help-button"
        href="https://google.com"
        rel="noopener noreferrer"
        target="_blank"
        icon
        small
        fab
      >
        <span>?</span>
      </v-btn>
    </div>

    <v-checkbox
      v-model="checkbox"
      :rules="[v => v || 'Please agree our Terms and Conditions']"
      class="checkbox--likecoin"
      color="light"
    >
      <span slot="label">
        I accept the
        <a
          href="https://www.google.com"
          target="_blank"
        >Terms and Conditions</a> of Puttyimage
      </span>
    </v-checkbox>

    <v-btn
      :disabled="!formValid"
      :loading="isUploading"
      class="btn--likecoin the-upload-image-form__submit-button"
      color="primary"
      @click="submit"
    >
      Upload the image now
    </v-btn>
  </v-form>
</template>

<script>
import axios from '@/plugins/axios';

import assetUtil from '@/util/assetUtil';
import ethUtil from '@/util/ethUtil';

import {
  MIN_TAG_COUNT,
  MAX_TAG_COUNT,
  MIN_TAG_LENGTH,
  MAX_TAG_LENGTH,
  SUPPORTED_LICENSE,
  LICENSE,
} from '@/constant';

export default {
  name: 'the-image-upload-form',
  props: {
    file: {
      required: true,
      type: process.browser ? File : Object,
    },
  },
  data() {
    return {
      checkbox: false,
      description: null,
      formValid: true,
      isUploading: false,
      license: null,
      tags: [],
    };
  },
  computed: {
    supportedLicense() {
      return [...SUPPORTED_LICENSE];
    },
    descriptionRules() {
      return [(v) => (!!v && !!v.trim()) || 'Please add a short description'];
    },
    tagsRules() {
      return [
        (v) =>
          (v.length >= MIN_TAG_COUNT && v.length <= MAX_TAG_COUNT) ||
          `Please provide at least ${MIN_TAG_COUNT} and up to ${MAX_TAG_COUNT} tags`,
        (v) =>
          v.every((item) => {
            const itemLength = item.trim().length;
            return itemLength >= MIN_TAG_LENGTH && itemLength <= MAX_TAG_LENGTH;
          }) ||
          `Each tag should be ${MIN_TAG_LENGTH} - ${MAX_TAG_LENGTH} characters`,
      ];
    },
    licenseRules() {
      return [(v) => !!v || 'Please choose a license'];
    },
    licenseHint() {
      if (!this.license) return undefined;
      return `Learn more about <a href="${
        LICENSE[this.license]
      }" rel="noopener noreferrer" target="_blank">${this.license}</a>`;
    },
  },
  methods: {
    removeTag(item) {
      this.tags.splice(this.tags.indexOf(item), 1);
    },
    async submit() {
      if (this.$refs.form.validate()) {
        this.isUploading = true;
        const assetInfo = {
          assetFile: this.file,
          description: this.description.trim(),
          license: this.license,
          tags: this.tags,
          wallet: ethUtil.getWallet(),
        };
        const payload = await assetUtil.formatAndSignAsset(
          assetInfo,
          'Upload asset with following information'
        );

        const params = new FormData();
        Object.keys(payload).forEach((key) => {
          params.append(key, payload[key]);
        });
        axios
          .post('/api/assets/upload', params)
          .then((mediaObj) => mediaObj) // TODO: go to my image page maybe?
          .catch((err) => {
            console.error(err);
          });
      }
    },
    onTagChange(tags) {
      const numTags = tags.length;
      if (numTags > 0) {
        this.tags[numTags - 1] = this.tags[numTags - 1].trim();
      }
    },
  },
};
</script>


<style lang="scss" scoped>
@import '~assets/css/classes';

.the-upload-image-form {
  display: flex;
  flex-direction: column;

  max-width: 560px;

  transition: all 0.2s ease-in-out;
  text-align: center;

  @extend .pt-64, .pb-24, .px-24, .pb-64--xs;
  @include mobile-only {
    padding-top: 128px !important;
  }

  &__license-input {
    position: relative;

    @extend .mb-24;

    &__help-button {
      position: absolute;
      top: -16px;
      right: -8px;

      span {
        width: 24px;
        height: 24px;

        text-align: center;

        border-radius: 50%;
        background-color: #28646e;

        @extend .text--color-white, .text--size-16, .text--height-1-5;
      }
    }
  }

  &__submit-button {
    &.btn--disabled {
      opacity: 0.5;

      @extend .text--color-white;
    }
  }
}

.checkbox--likecoin :global(label) {
  overflow: visible;

  white-space: normal;

  @extend .text--size-12;
}
</style>
