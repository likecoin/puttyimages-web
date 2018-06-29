import { PROVIDER_PRIVATE_KEY } from '../../config/server';

const web3Util = require('web3-utils');
const sigUtil = require('eth-sig-util');

export function personalEcRecover(data, sig) {
  return sigUtil.recoverPersonalSignature({ data, sig });
}

export function web3HexToUtf8(payload) {
  return web3Util.hexToUtf8(payload);
}

export function web3Sign(data) {
  const dataHex = web3Util.utf8ToHex(data);
  const privKey = Buffer.from(PROVIDER_PRIVATE_KEY, 'hex');
  return sigUtil.personalSign(privKey, { data: dataHex });
}
