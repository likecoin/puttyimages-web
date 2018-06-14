import {
  MAX_TAG_LENGTH,
  MIN_TAG_LENGTH,
  MAX_TAG_COUNT,
  SUPPORTED_LICENSE,
  MAX_IMAGE_SIZE,
  SUPPORTED_IMAGE_TYPE,
} from '../../constant';

const imageType = require('image-type');
const sha256 = require('js-sha256');

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
  return tags.length >= 1 && tags.length <= MAX_TAG_COUNT;
}

export function isTagsValid(tags) {
  const checkTags = typeof tags === 'string' ? [tags] : tags;
  return checkTags.every(
    (e) => e.length >= MIN_TAG_LENGTH && e.length <= MAX_TAG_LENGTH
  );
}

export function isLicenseValid(license) {
  return SUPPORTED_LICENSE.has(license);
}

export function validateImage(img, inputSHA256) {
  if (!img) throw new ValidationError('no image uploaded');
  if (img.size > MAX_IMAGE_SIZE)
    throw new ValidationError('image size too large');
  const type = imageType(img.buffer);
  if (!SUPPORTED_IMAGE_TYPE.has(type && type.ext))
    throw new ValidationError('unsupported file format!');
  const hash256 = sha256(img.buffer);
  if (hash256 !== inputSHA256) throw new ValidationError('image SHA not match');
  return true;
}
