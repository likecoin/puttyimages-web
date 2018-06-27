import EthUtil from '@likecoin/likecoin-eth-util';

export default async ({ store }) => {
  EthUtil.initApp({
    clearErrCb: () => {
      store.dispatch('setWeb3Message', '');
    },
    errCb: (message) => {
      /*
        Circumstance                        message
        1. user not at targeted network     'testnet'
        2. no web3                          'web3'
        3. metamask locked                  'locked'
       */
      store.dispatch('setWeb3Message', message);
    },
    onLogin: () => {
      store.dispatch('setWeb3Message', 'login');
    },
    onSetWeb3: (type) => {
      store.dispatch('setWeb3Type', type);
    },
    onSign: () => {
      store.dispatch('setWeb3Message', 'sign');
    },
    onSigned: () => {
      store.dispatch('setWeb3Message', '');
    },
    onWalletCb: (wallet) => {
      store.dispatch('updateWallet', wallet);
    },
    retryCb: () => {
      // store.dispatch('setWeb3IsFetching', true);
    },
    targetNetwork: 'main', // main / rinkeby
  });
};
