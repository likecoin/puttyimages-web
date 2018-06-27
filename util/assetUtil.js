import ethUtil from './ethUtil';
import { blobToArrayBuffer, arrayBufferToSha256 } from './fileUtil';

const assetUtil = {
  async formatAndSignAsset(assetInfo, signMessage) {
    const { assetFile, description, license, tags, wallet } = assetInfo;
    const ts = Date.now();
    let assetSHA256;
    if (assetFile) {
      const avatarBuf = await blobToArrayBuffer(assetFile);
      assetSHA256 = await arrayBufferToSha256(avatarBuf);
    }
    let payload = JSON.stringify(
      {
        assetSHA256,
        dateCreated: ts,
        description,
        license,
        tags,
        ts,
        wallet,
      },
      null,
      2
    );
    if (signMessage) payload = [`${signMessage}:`, payload].join('\n');

    // show MetaMask dialog ask user to sign on MetaMask to continue
    if (ethUtil.onSign) ethUtil.onSign();

    const sign = await ethUtil.personalSign(payload);
    const data = {
      asset: assetFile,
      from: wallet,
      payload: ethUtil.utf8ToHex(payload),
      sign,
    };

    return data;
  },
};

export default assetUtil;
