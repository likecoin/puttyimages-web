import EthUtil from '@likecoin/likecoin-eth-util';


export default async ({ store }) => {
  EthUtil.initApp({
    targetNetwork: 'main', // main / rinkeby
    errCb: (message) => {
      /*
        Circumstance                        message
        1. user not at targeted network     'testnet'
        2. no web3                          'web3'
        3. metamask locked                  'locked'
       */
      store.dispatch('setWeb3Message', message);
    },
    retryCb: () => {
      // store.dispatch('setWeb3IsFetching', true);
    },
    onWalletCb: (/* wallet */) => {
      // user's wallet is retrieved
    },
    clearErrCb: () => {
      store.dispatch('setWeb3Message', '');
    },
    onSetWeb3: (type) => {
      store.dispatch('setWeb3Type', type);
    },
    onSign: () => {
      store.dispatch('setWeb3Message', 'sign');
    },
    onLogin: () => {
      store.dispatch('setWeb3Message', 'login');
    },
    onSigned: () => {
      store.dispatch('setWeb3Message', '');
    },
  });
};
