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
            <v-btn
              dark
              flat
              @click.native="isDialogOpen = false"
            >Close</v-btn>
          </v-dialog>
          <!-- Trust Dialog end -->
        </div>
        <div v-else>
          <!-- Chrome Dialog start (ask when user use browser like Safari) -->
          <v-dialog
            v-if="shouldShowChromeDialog"
            v-model="isDialogOpen"
            max-width="290"
            @keydown.esc="isDialogOpen = false"
          >
            <v-card>
              <v-card-title class="headline">
                Chrome required
              </v-card-title>
            </v-card>
            <v-btn
              dark
              flat
              @click.native="isDialogOpen = false"
            >Close</v-btn>
          </v-dialog>
          <!-- Chrome Dialog end -->

          <!-- Metamask related dialog start -->
          <the-metamask-dialog
            v-else-if="!!getWeb3Message"
            :getWeb3Message="getWeb3Message"
            :isDialogOpen.sync="isDialogOpen"
          />
          <!-- Metamask related dialog end -->
        </div>
      </div>

      <the-image-details-dialog />

      <register-dialog v-if="shouldShowDialog('register')" />

      <error-dialog />
    </div>
  </no-ssr>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import ErrorDialog from '@/components/dialogs/ErrorDialog';
import RegisterDialog from '@/components/dialogs/RegisterDialog';
import TheImageDetailsDialog from '@/components/TheImageDetailsDialog';
import TheMetamaskDialog from '@/components/TheMetamaskDialog';

import { checkIsMobileClient, checkIsDesktopChrome } from '@/util/client';

const allErrors = [
  'web3', // cannot detect web3
  'testnet', // not targeted network
  'locked', // metamask locked
  'register', // require register LikeCoin ID
];
const disabledRouteErrors = {
  about: allErrors,
  'assets-id': allErrors,
  id: allErrors,
  index: allErrors,
  plugins: allErrors,
  search: allErrors,
  support: allErrors,
};
export const getDisableErrors = (route) => disabledRouteErrors[route] || [];

export default {
  name: 'the-overlay-component',
  components: {
    ErrorDialog,
    RegisterDialog,
    TheImageDetailsDialog,
    TheMetamaskDialog,
  },
  data() {
    return {
      isDialogOpen: false,
      disableErrors: [],
    };
  },
  computed: {
    ...mapGetters([
      'getWeb3Message',
      'getUserLocalWallet',
      'getIsUserAuthNeeded',
    ]),
    shouldShowWeb3Dialog() {
      return (
        !!this.getWeb3Message &&
        !this.disableErrors.includes(this.getWeb3Message)
      );
    },
    shouldShowChromeDialog() {
      return this.getWeb3Message === 'web3' && !checkIsDesktopChrome();
    },
  },
  watch: {
    getIsUserAuthNeeded(a) {
      if (a) {
        this.triggerSignInIfNeeded();
      }
    },
    getWeb3Message(message) {
      this.isDialogOpen = !!message;
    },
    '$route.name': function onRouteChange(route) {
      this.disableErrors = getDisableErrors(route);
      this.triggerSignInIfNeeded();
    },
  },
  mounted() {
    this.isDialogOpen = !!this.getWeb3Message;
    this.disableErrors = getDisableErrors(this.$route.name);
  },
  methods: {
    ...mapActions(['loginUser']),
    checkIsMobileClient,
    shouldShowDialog(key) {
      return !this.disableErrors.includes(key);
    },
    triggerSignInIfNeeded() {
      // only trigger sign in when page requires web3
      if (
        this.getIsUserAuthNeeded &&
        !getDisableErrors(this.$route.name).includes('web3')
      ) {
        this.loginUser(this.getUserLocalWallet);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~assets/css/variables';

.overlay {
  position: relative;
  z-index: 999;
  top: 0px;

  width: 100%;
}
</style>
