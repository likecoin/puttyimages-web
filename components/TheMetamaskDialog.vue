<template>
  <v-dialog
    v-model="isDialogOpen"
    :persistent="!isNotSign"
    content-class="metamask-dialog"
    width="450"
  >
    <v-card>
      <v-btn
        v-if="isNotSign"
        class="metamask-dialog__close-btn"
        absolute
        fab
        small
        @click.native.stop="$emit('update:isDialogOpen', false)"
      >
        <v-icon
          color="white"
          size="21"
        >close</v-icon>
      </v-btn>

      <v-card-title class="metamask-dialog__title">
        <img
          class="metamask-dialog__logo"
          src="@/assets/img/metamask.png"
        >
        <language-switch class="metamask-dialog__earth-icon" />
      </v-card-title>

      <v-card-text class="metamask-dialog__text">
        <div v-if="getWeb3Message === 'web3'">
          <p class="metamask-dialog__headline">
            {{ $t('MetaMaskDialog.title.web3') }}
          </p>
          <p>{{ $t('MetaMaskDialog.content.web3') }}</p>
          <p class="red--text">{{ $t('MetaMaskDialog.label.keepSeedWordsSafe') }}</p>
          <v-btn
            class="text-capitalize metamask-dialog__btn"
            color="orange"
            href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
            target="_blank"
            block
            dark
            large
          >
            {{ $t('MetaMaskDialog.button.install') }}
          </v-btn>
          <v-btn
            class="text-capitalize metamask-dialog__btn"
            color="teal darken-2"
            block
            dark
            large
            @click.native="$emit('update:isDialogOpen', false)"
          >
            {{ $t('MetaMaskDialog.button.installed') }}
          </v-btn>
          <v-btn
            class="text-capitalize"
            color="teal darken-2"
            block
            flat
            @click.native="$emit('update:isDialogOpen', false)"
          >
            {{ $t('MetaMaskDialog.button.ledger') }}
          </v-btn>
        </div>

        <div v-if="metamaskDialogHeadline">
          <p class="metamask-dialog__headline">{{ metamaskDialogHeadline }}</p>
        </div>
        <div v-if="metamaskDialogMessage">
          <p>{{ metamaskDialogMessage }}</p>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import LanguageSwitch from '@/components/LanguageSwitch';

export default {
  name: 'the-metamask-dialog',
  components: {
    LanguageSwitch,
  },
  props: {
    getWeb3Message: {
      required: true,
      type: String,
    },
    isDialogOpen: {
      required: true,
      type: Boolean,
    },
  },
  computed: {
    metamaskDialogHeadline() {
      const localeKey = `MetaMaskDialog.title.${this.getWeb3Message}`;
      return this.$te(localeKey) ? this.$t(localeKey) : '';
    },
    metamaskDialogMessage() {
      const localeKey = `MetaMaskDialog.content.${this.getWeb3Message}`;
      return this.$te(localeKey) ? this.$t(localeKey) : '';
    },
    isNotSign() {
      return this.getWeb3Message !== 'sign' && this.getWeb3Message !== 'login';
    },
  },
};
</script>

<style lang="scss">
/* v-dialog content-class not work for scoped css */
.metamask-dialog {
  overflow-y: visible;
}
</style>

<style lang="scss" scoped>
@import '~assets/css/classes';

.metamask-dialog__close-btn {
  margin-top: -20px;
  margin-left: -20px;

  background: linear-gradient(2700deg, #6a282e, #3d286e);
}
.metamask-dialog__title {
  justify-content: center;

  height: 55px;

  background: linear-gradient(270deg, #ed8526, #eebe78);
}
.metamask-dialog__logo {
  margin-top: -30px;
}
.metamask-dialog__earth-icon {
  position: absolute;
  right: 8px;
}
.metamask-dialog__text {
  @extend .text--align-left, .text--size-16, .text--height-1-2, .px-40, .mt-20;
}
.metamask-dialog__headline {
  font-size: 38px;
}
.metamask-dialog__btn {
  font-size: 18px;
}
</style>
