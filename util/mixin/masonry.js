/* eslint-disable sort-keys */
import { sortImagesByHeight } from '~/util/masonry';

export default {
  data() {
    return {
      colCount: 3,
    };
  },
  beforeDestroy() {
    if (window) {
      window.removeEventListener('resize', this.handleResize);
    }
  },
  mounted() {
    if (window) {
      window.addEventListener('resize', this.handleResize);
    }
  },
  methods: {
    handleResize() {
      const { clientWidth } = document.body;
      let colCount = 1;
      if (clientWidth > 960) {
        colCount = 3;
      } else if (clientWidth > 600) {
        colCount = 2;
      }
      if (colCount !== this.colCount) {
        this.colCount = colCount;
        this.images = sortImagesByHeight(this.rawImages, colCount);
      }
    },
    sortImagesByHeight,
  },
};
