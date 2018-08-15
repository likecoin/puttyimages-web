import isDateValid from 'date-fns/is_valid';
import jsonStringify from 'json-stable-stringify';

import ethUtil from './ethUtil';
import { blobToArrayBuffer, arrayBufferToSha256 } from './fileUtil';
import { LICENSE } from '../constant';

const assetUtil = {
  async formatAndSignAsset(assetInfo) {
    const {
      assetFile,
      dateCreated,
      description,
      license,
      likeOwner,
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
      dateCreated: isDateValid(dateCreated)
        ? dateCreated.toISOString()
        : undefined,
      description,
      license: LICENSE[license],
      likeFingerprint: assetSHA256,
      likeFootprint: [],
      likeOwner,
      likePreviousVersion: null,
      type: 'ImageObject',
      uploadDate: nowDateTime,
    });

    // show MetaMask dialog ask user to sign on MetaMask to continue
    if (ethUtil.onSign) ethUtil.onSign();

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
