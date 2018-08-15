export const getIpldLink = (ipld) =>
  `${process.env.CDN_HOST}/api/v0/dag/get?arg=${ipld}`;

export const getImageSourceFromUrl = (url) =>
  url ? new URL(url).hostname.replace(/(www.|.com.*)/g, '') : '';
