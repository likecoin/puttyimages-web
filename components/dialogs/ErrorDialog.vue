<template>
  <base-dialog
    :dialog-props="{
      'hide-overlay': true,
      persistent: true,
    }"
    :is-dialog-open="!!getErrorMessage"
    @close="closeErrorDialog"
  >
    <section class="base-dialog__content">
      <h2>{{ $t('ErrorDialog.label.oops') }}</h2>
      <h2>{{ $t('ErrorDialog.label.sthWentWrong') }}</h2>

      <p class="pt-24 pb-32">
        {{ errorMessage }}
      </p>

      <v-btn
        class="btn--likecoin"
        color="green"
        block
        depressed
        @click="closeErrorDialog"
      >
        {{ $t('General.button.ok') }}
      </v-btn>
    </section>
  </base-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import BaseDialog from './BaseDialog';

export default {
  name: 'error-dialog',
  components: {
    BaseDialog,
  },
  computed: {
    ...mapGetters(['getErrorMessage']),
    errorMessage() {
      const localeKey = `Error.${this.getErrorMessage}`;
      return this.$te(localeKey) ? this.$t(localeKey) : this.getErrorMessage;
    },
  },
  methods: {
    ...mapActions(['closeErrorDialog']),
  },
};
</script>
