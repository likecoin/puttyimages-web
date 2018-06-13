export default function formatMediaObject(mediaObj) {
  try {
    const {
      creator,
      dateCreated,
      description,
      license,
      fingerprint,
      footprint,
      ipfs,
      previousVersion,
      uploadDate,
    } = mediaObj;
    if (!Array.isArray(creator)) throw new Error('creator should be array');
    if (creator.length < 1) throw new Error('creator must exist');
    if (!license) throw new Error('license must exist');
    if (!fingerprint) throw new Error('fingerprint must exist');
    if (!footprint) throw new Error('footprint must exist');
    if (!Array.isArray(footprint)) throw new Error('footprint should be array');
    if (!ipfs) throw new Error('ipfs must exist');
    const nowDateTime = new Date().toISOString();
    const formatObj = {
      creator,
      dateCreated: dateCreated || nowDateTime,
      description: description || '',
      license,
      likeFingerprint: fingerprint,
      likeFootprint: footprint,
      likeIpfs: ipfs,
      likePreviousVersion: previousVersion || null,
      type: 'ImageObject',
      uploadDate: uploadDate || nowDateTime,
    };
    return formatObj;
  } catch (err) {
    throw err;
  }
}
