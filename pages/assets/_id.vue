<template>
  <div class="image-details-page">
    <image-details
      :image="image"
      class="image-details-page__image-details"
    />
  </div>
</template>

<script>
import axios from '~/plugins/axios';

import ImageDetails from '~/components/ImageDetails';
import { getIpldLink } from '~/util/index';

export default {
  components: {
    ImageDetails,
  },
  asyncData({ params, error }) {
    return axios
      .get(`/api/assets/${params.id}`)
      .then((res) => ({ image: res.data }))
      .catch(() => {
        error({ statusCode: 404, message: 'Image not found' });
      });
  },
  async mounted() {
    // fetch asset ipld
    try {
      const res = await axios.get(getIpldLink(this.image.ipld), {
        withCredentials: false,
      });
      const { type, license: licenseUrl, ...ipldData } = res.data;
      this.image = {
        ...this.image,
        ...ipldData,
        licenseUrl,
      };
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
    }
  },
  head() {
    return {
      title: `${this.image.description} by ${
        this.image.user.displayName
      } | puttyimages`,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/css/classes';

.image-details-page {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
