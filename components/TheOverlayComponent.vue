<template>
  <no-ssr>
    <div class="the-overlay-component">

      <div v-if="shouldShowWeb3Dialog">
        <div v-if="checkIsMobileClient()">
          <!-- Trust Dialog start (show when mobile) -->
          <v-dialog
            v-model="isDialogOpen"
            max-width="290"
            @keydown.esc="isDialogOpen = false"
          >
            <v-card>
              <v-card-title class="headline">
                Wallet App required
              </v-card-title>
            </v-card>
            <v-btn dark flat @click.native="isDialogOpen = false">Close</v-btn>
          </v-dialog>
          <!-- Trust Dialog end -->
        </div>
        <div v-else>
          <!-- Chrome Dialog start (ask when user use browser like Safari) -->
          <v-dialog
            v-model="isDialogOpen"
            max-width="290"
            v-if="shouldShowChromeDialog"
            @keydown.esc="isDialogOpen = false"
          >
            <v-card>
              <v-card-title class="headline">
                Chrome required
              </v-card-title>
            </v-card>
            <v-btn dark flat @click.native="isDialogOpen = false">Close</v-btn>
          </v-dialog>
          <!-- Chrome Dialog end -->

          <!-- Metamask related dialog start -->
          <v-dialog
            v-model="isDialogOpen"
            max-width="290"
            v-else-if="!!getWeb3Message"
            @keydown.esc="isDialogOpen = false"
          >
            <v-card>
              <v-card-title class="headline">
                {{ metamaskDialogMessage }}
              </v-card-title>
            </v-card>
            <v-btn dark flat @click.native="isDialogOpen = false">Close</v-btn>
          </v-dialog>
          <!-- Metamask related dialog end -->
        </div>
      </div>

    </div>
  </no-ssr>
</template>
<script>
import { mapGetters } from 'vuex';

import {
  checkIsMobileClient,
  checkIsDesktopChrome,
} from '@/util/client';

export default {
  name: 'the-overlay-component',
  data() {
    return {
      isDialogOpen: false,
    };
  },
  computed: {
    ...mapGetters([
      'getWeb3Message',
      'getWeb3Type',
    ]),
    shouldShowWeb3Dialog() {
      return !!this.getWeb3Message;
    },
    shouldShowChromeDialog() {
      return this.getWeb3Message === 'web3' && !checkIsDesktopChrome();
    },
    metamaskDialogMessage() {
      switch (this.getWeb3Message) {
        case 'web3':
          return 'install metamask!';
        case 'testnet':
          return 'switch to mainnet';
        default:
          return '';
      }
    },
  },
  methods: {
    checkIsMobileClient,
  },
  mounted() {
    this.isDialogOpen = !!this.getWeb3Message;
  },
  watch: {
    getWeb3Message(message) {
      this.isDialogOpen = !!message;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~assets/css/variables";

.overlay {
  position: relative;
  z-index: 999;
  top: 0px;

  width: 100%;
}
</style>
