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
        :items="supportedLicense"
        :rules="licenseRules"
        append-icon="expand_more"
        class="input-text--likecoin"
        label="Image License"
        placeholder="Choose an appropriate license"
        light
      />
      <v-btn
        class="btn--likecoin the-upload-image-form__license-input__help-button"
        href="https://google.com"
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
import { MAX_TAG_COUNT, MIN_TAG_LENGTH, SUPPORTED_LICENSE } from '@/constant';

export default {
  name: 'the-image-upload-form',
  data() {
    return {
      checkbox: false,
      description: null,
      formValid: true,
      isUploading: false,
      license: null,
      tags: [],
      MAX_TAG_COUNT,
      MIN_TAG_LENGTH,
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
          (v.length >= MIN_TAG_LENGTH && v.length <= MAX_TAG_COUNT) ||
          `Please provide at least ${MIN_TAG_LENGTH} and up to ${MAX_TAG_COUNT} tags`,
      ];
    },
    licenseRules() {
      return [(v) => !!v || 'Please choose a license'];
    },
  },
  methods: {
    removeTag(item) {
      this.tags.splice(this.tags.indexOf(item), 1);
      this.tags = [...this.tags];
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.isUploading = true;
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
