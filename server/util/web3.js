const web3Util = require('web3-utils');
const sigUtil = require('eth-sig-util');

export function personalEcRecover(data, sig) {
  return sigUtil.recoverPersonalSignature({ data, sig });
}

export function web3HexToUtf8(payload) {
  return web3Util.hexToUtf8(payload);
}
