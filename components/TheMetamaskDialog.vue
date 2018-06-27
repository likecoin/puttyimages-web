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
        <earth-icon class="metamask-dialog__earth-icon" />
      </v-card-title>
      <v-card-text class="metamask-dialog__text">
        <div v-if="getWeb3Message === 'web3'">
          <p class="metamask-dialog__headline">Plugin required</p>
          <p>Puttyimage upload requires Metamask to work. Please switch to chrome and install Metamask extension.</p>
          <p class="red--text">Remember to keep your seed words safe!</p>
          <v-btn
            class="text-capitalize metamask-dialog__btn"
            color="orange"
            href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
            target="_blank"
            block
            dark
            large
          >
            Install Metamask
          </v-btn>
          <v-btn
            class="text-capitalize metamask-dialog__btn"
            color="teal darken-2"
            block
            dark
            large
            @click.native="$emit('update:isDialogOpen', false)"
          >
            Done! Installed
          </v-btn>
          <v-btn
            class="text-capitalize"
            color="teal darken-2"
            block
            flat
            @click.native="$emit('update:isDialogOpen', false)"
          >
            Connect to Ledger wallet
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
import EarthIcon from '@/assets/icons/earth.svg';

export default {
  name: 'the-metamask-dialog',
  components: {
    EarthIcon,
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
      switch (this.getWeb3Message) {
        case 'login':
          return 'Sign on MetaMask to Login';
        case 'sign':
          return 'Sign on MetaMask';
        default:
          return '';
      }
    },
    metamaskDialogMessage() {
      switch (this.getWeb3Message) {
        case 'locked':
          return 'Please unlock your wallet';
        case 'testnet':
          return 'Please switch to Main Ethereum Network';
        case 'sign':
          return 'Sign on MetaMask to continue';
        case 'login':
          return 'Please click Sign on Metamask to login.';
        default:
          return '';
      }
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
  right: 18px;

  width: 21px;
  height: 21px;
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
