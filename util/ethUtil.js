let ethUtil = {}; // eslint-disable-line import/no-mutable-exports

if (process.browser) {
  ethUtil = require('@likecoin/likecoin-eth-util'); // eslint-disable-line global-require
  ethUtil = ethUtil.default;
}

export default ethUtil;
