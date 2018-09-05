<template>
  <v-dialog
    v-model="isDialogOpen"
    content-class="dialog--likecoin"
    max-width="512px"
    lazy
  >
    <v-card>
      <dialog-header
        :title="$t('ReportImageDialog.title')"
        is-show-close-button
        @close="close"
      />

      <dialog-content>
        <transition
          :name="transitionName"
          mode="out-in"
        >
          <!-- Report Image Step 1  -->
          <v-layout
            v-if="!hasSubmitted"
            key="1"
            column
          >
            <p class="px-24 px-0--xs text--align-center">
              <span class="text--size-16">
                {{ $t('ReportImageDialog.label.description') }}
              </span>
            </p>

            <v-flex xs12>
              <ul class="report-image-dialog__options">
                <li
                  v-for="option in options"
                  :key="option.value"
                >
                  <v-btn
                    :disabled="isSubmitting"
                    :outline="option.value !== selectedOption"
                    class="btn--likecoin btn--solid"
                    color="primary"
                    block
                    depressed
                    round
                    small
                    @click="selectedOption = option.value"
                  >{{ option.text }}</v-btn>
                </li>
              </ul>
            </v-flex>

            <v-text-field
              v-model="comments"
              :disabled="isSubmitting"
              :label="$t('ReportImageDialog.label.comments')"
              class="mt-16"
            />

            <v-flex>
              <v-layout justify-center>
                <v-flex
                  sm5
                  xs7
                >
                  <v-btn
                    :loading="isSubmitting"
                    class="btn--likecoin btn--solid"
                    color="primary"
                    block
                    depressed
                    @click.native="submit"
                  >{{ $t('General.button.submit') }}</v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

          <!-- Report Image Step 2  -->
          <v-layout
            v-else
            key="2"
            column
          >
            <p class="px-24 px-0--xs text--align-center">
              <span class="text--size-16">
                {{ $t('ReportImageDialog.label.thanksForReport') }}
              </span>
            </p>

            <v-flex>
              <v-layout justify-center>
                <v-flex
                  sm5
                  xs7
                >
                  <v-btn
                    class="btn--likecoin btn--solid mt-32"
                    color="primary"
                    block
                    depressed
                    @click.native="close"
                  >{{ $t('General.button.done') }}</v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

        </transition>
      </dialog-content>
    </v-card>
  </v-dialog>
</template>

<script>
import DialogContent from '~/components/DialogContent';
import DialogHeader from '~/components/DialogHeader';

export default {
  name: 'report-image-dialog',
  components: {
    DialogContent,
    DialogHeader,
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
      isDialogOpen: this.isOpen,

      hasSubmitted: false,
      isSubmitting: false,

      comments: '',

      options: [
        {
          text: 'This image is violating copyright',
          value: 'violating-copyright',
        },
        {
          text: 'This image is inappropiate / abuse to others',
          value: 'inappropiate',
        },
      ],
      selectedOption: 'violating-copyright',
    };
  },
  computed: {
    transitionName() {
      return this.hasSubmitted ? 'collapsed' : null;
    },
  },
  watch: {
    isDialogOpen(isDialogOpen) {
      if (isDialogOpen) {
        this.hasSubmitted = false;
      }
      this.$emit('update:isOpen', isDialogOpen);
    },
    isOpen(isOpen) {
      this.isDialogOpen = isOpen;
    },
  },
  methods: {
    close() {
      this.isDialogOpen = false;
    },
    submit() {
      this.isSubmitting = true;
      setTimeout(() => {
        this.isSubmitting = false;
        this.hasSubmitted = true;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/css/classes';

.report-image-dialog {
  &__options {
    list-style: none;

    @extend .px-32, .px-0--xs;

    :global(.btn__content) {
      @extend .text--size-14;
    }
  }
}
</style>
