import ethUtil from './ethUtil';
import { blobToArrayBuffer, arrayBufferToSha256 } from './fileUtil';
import { LICENSE } from '../constant';

const jsonStringify = require('json-stable-stringify');

const assetUtil = {
  async formatAndSignAsset(assetInfo) {
    const {
      assetFile,
      creator,
      description,
      license,
      tags,
      wallet,
    } = assetInfo;
    const nowDateTime = new Date().toISOString();
    let assetSHA256;
    if (assetFile) {
      const assetBuf = await blobToArrayBuffer(assetFile);
      assetSHA256 = await arrayBufferToSha256(assetBuf);
    }
    const payload = jsonStringify({
      creator,
      dateCreated: nowDateTime,
      description,
      license: LICENSE[license],
      likeFingerprint: assetSHA256,
      likeFootprint: [],
      likePreviousVersion: null,
      type: 'ImageObject',
      uploadDate: nowDateTime,
    });

    // show MetaMask dialog ask user to sign on MetaMask to continue
    if (ethUtil.onSign) ethUtil.onSign();
    console.log(tags);

    const sign = await ethUtil.personalSign(payload);
    const data = {
      asset: assetFile,
      from: wallet,
      licenseId: license,
      payload: ethUtil.utf8ToHex(payload),
      sign,
      tags: JSON.stringify(tags),
    };

    return data;
  },
};

export default assetUtil;
