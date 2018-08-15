export const IS_DEV = process.env.NODE_ENV !== 'production';

export const ONE_DATE_IN_MS = 86400000;

export const SUPPORTED_IMAGE_TYPE = new Set(['image/jpeg', 'image/png']);

export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10M
export const MAX_IMAGE_SIZE_MB = '10MB';

export const MIN_TAG_COUNT = 1;

export const MAX_TAG_COUNT = 5;

export const MAX_TAG_LENGTH = 20;

export const MIN_TAG_LENGTH = 2;

export const RESULT_PER_PAGE = 15;

export const LICENSE = {
  'cc-by': 'https://creativecommons.org/licenses/by/4.0/',
  'cc-by-nd': 'https://creativecommons.org/licenses/by-nd/4.0/',
  'cc-by-sa': 'https://creativecommons.org/licenses/by-sa/4.0/',
  cc0: 'https://creativecommons.org/licenses/publicdomain/',
};

export const SUPPORTED_LICENSE = new Set(Object.keys(LICENSE));

export const EMBEDDED_SCRIPT_IN_HEAD = `<script src="https://code.puttyimage.io/latest/polyfill.min.js"></script>`;
