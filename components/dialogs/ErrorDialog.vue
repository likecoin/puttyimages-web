<template>
  <base-dialog
    :dialog-props="{
      'hide-overlay': true,
      persistent: true,
    }"
    :isDialogOpen="!!getErrorMessage"
    @close="closeErrorDialog"
  >
    <section class="base-dialog--likecoin__content">
      <h2>Oops!</h2>
      <h2>Something went wrong</h2>

      <p class="pt-24 pb-32">
        {{ getErrorMessage }}
      </p>

      <v-btn
        class="btn--likecoin"
        color="green"
        block
        depressed
        @click="closeErrorDialog"
      >
        Okay
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
  },
  methods: {
    ...mapActions(['closeErrorDialog']),
  },
};
</script>
