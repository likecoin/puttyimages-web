<template>
  <base-dialog
    :dialog-props="{
      persistent: true,
    }"
    :is-dialog-open="getIsUserRegisterNeeded"
    :is-show-close-button="false"
    :is-show-language-button="true"
  >
    <div slot="header-center">
      <likecoin-icon class="base-dialog__header-icon" />
    </div>

    <section class="base-dialog__content">
      <h1>LikeCoin account required</h1>

      <p class="pt-24 pb-40">
        One last step for using puttyimage! Go to LikeCoin and register your own LikeCoin account to get started!
      </p>

      <v-btn
        class="btn--likecoin"
        color="green"
        href="https://like.co/in"
        rel="noopener noreferrer"
        target="_blank"
        block
        depressed
      >
        Register LikeCoin Account
      </v-btn>
    </section>
  </base-dialog>
</template>

<script>
import { mapGetters } from 'vuex';

import LikeCoinIcon from '@/assets/logo/icon.svg';
import BaseDialog from './BaseDialog';

export default {
  name: 'register-dialog',
  components: {
    BaseDialog,
    'likecoin-icon': LikeCoinIcon,
  },
  computed: { ...mapGetters(['getIsUserRegisterNeeded']) },
};
</script>
