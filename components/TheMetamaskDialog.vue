<template>
  <v-dialog
    content-class="metamask-dialog"
    v-model="isDialogOpen"
    width="450"
  >
    <v-card>
      <v-btn
        class="metamask-dialog__close-btn"
        absolute
        fab
        small
        @click.native.stop="$emit('update:isDialogOpen', false)"
      >
        <v-icon color="white" size="21">close</v-icon>
      </v-btn>
      <v-card-title class="metamask-dialog__title">
        <img class="metamask-dialog__logo" src="@/assets/img/metamask.png" />
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
        <div v-else>
          <p>{{ metamaskDialogMessage }}</p>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import EarthIcon from '@/assets/icons/earth.svg';

export default {
  components: {
    EarthIcon,
  },
  computed: {
    metamaskDialogMessage() {
      switch (this.getWeb3Message) {
        case 'locked':
          return 'Please unlock your wallet';
        case 'testnet':
          return 'Please switch to Main Ethereum Network';
        default:
          return '';
      }
    },
  },
  name: 'the-metamask-dialog',
  props: ['getWeb3Message', 'isDialogOpen'],
};
</script>

<style lang="scss">
/* v-dialog content-class not work for scoped css */
.metamask-dialog {
  overflow-y: visible;
}
</style>

<style lang="scss" scoped>
.metamask-dialog__close-btn {
  margin-top: -20px;
  margin-left: -20px;

  background: linear-gradient(2700deg, #6A282E, #3D286E);
}
.metamask-dialog__title {
  justify-content: center;

  height: 55px;

  background: linear-gradient(270deg, #ED8526, #EEBE78);
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
  margin-top: 20px;

  text-align: center;

  font-size: 16px;
}
.metamask-dialog__headline {
  font-size: 38px;
}
.metamask-dialog__btn {
  font-size: 18px;
}
</style>
