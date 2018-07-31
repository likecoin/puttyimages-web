import {
  LICENSE,
  MAX_TAG_LENGTH,
  MIN_TAG_LENGTH,
  MAX_TAG_COUNT,
  MIN_TAG_COUNT,
  MAX_IMAGE_SIZE,
  SUPPORTED_IMAGE_TYPE,
} from '../../constant';

const imageType = require('image-type');

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function checkAddressValid(addr) {
  return addr.length === 42 && addr.substr(0, 2) === '0x';
}

export function isTagsCountValid(tags) {
  if (!Array.isArray(tags)) return false;
  return tags.length >= MIN_TAG_COUNT && tags.length <= MAX_TAG_COUNT;
}

export function isTagsValid(tags) {
  const checkTags = typeof tags === 'string' ? [tags] : tags;
  return checkTags.every(
    (e) => e.length >= MIN_TAG_LENGTH && e.length <= MAX_TAG_LENGTH
  );
}

export function isLicenseValid(licenseId, license) {
  return LICENSE[licenseId] === license;
}

export function validateImage(img, inputSHA256, checkSHA256) {
  if (!img) throw new ValidationError('no image uploaded');
  if (img.size > MAX_IMAGE_SIZE)
    throw new ValidationError('image size too large');
  const type = imageType(img.buffer);
  if (!SUPPORTED_IMAGE_TYPE.has(type && type.mime))
    throw new ValidationError('unsupported file format!');
  if (checkSHA256 !== inputSHA256)
    throw new ValidationError('image SHA not match');
  return true;
}
