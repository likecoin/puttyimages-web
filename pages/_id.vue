<template>
  <section class="page-container">
    <div class="user-page">
      <div class="px-12 mb-32 hidden-sm-and-up">
        <!-- TODO: search button here -->
        Search
      </div>

      <div v-if="isCurrentUser">
        <div class="text--align-center text--weight-600 text--size-24">
          {{ $t('MyImages.title') }}
        </div>

        <the-likecoin-amount
          :amount="0"
          :avatar="getUserInfo.avatar"
          :likecoinId="getUserInfo.likecoinId"
          class="my-48"
        />
      </div>
      <div v-else>
        <UserBadge
          :user="user"
          class="my-32"
        />
      </div>

      <masonry-images-grid
        :colCount.sync="colCount"
        :images="images"
      />

      <section class="text-xs-center">
        <p class="text--size-18">
          {{ $t('MyImages.label.placeholder') }}
        </p>

        <v-btn
          v-if="isCurrentUser"
          :to="{ name: 'upload' }"
          class="btn--likecoin px-24 my-12"
          color="secondary"
        >
          <v-icon>add_circle_outline</v-icon>
          <span>{{ $t('Landing.Banner.button.uploadImage') }}</span>
        </v-btn>
      </section>

    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

import axios from '~/plugins/axios';

import MasonryImagesGrid, {
  mixin as masonryImagesGridMixin,
} from '~/components/MasonryImagesGrid';
import TheLikeCoinAmount from '~/components/TheLikeCoinAmount';
import UserBadge from '~/components/UserBadge';

export default {
  name: 'id',
  components: {
    MasonryImagesGrid,
    'the-likecoin-amount': TheLikeCoinAmount,
    UserBadge,
  },
  mixins: [masonryImagesGridMixin],
  computed: {
    ...mapGetters(['getUserInfo']),
    isCurrentUser() {
      return this.getUserInfo.wallet === this.user.wallet;
    },
  },
  async asyncData({ params, error }) {
    let user;
    try {
      const res = await axios.get(`/api/users/${params.id}`);
      user = res.data;
    } catch (err) {
      error({ statusCode: 404, message: 'User not found' });
      return {};
    }

    let images;
    try {
      const res = await axios.get(`/api/assets/list/${user.wallet}`);
      images = res.data;
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
    }

    return { user, images };
  },
  head() {
    return {
      title: `User: ${this.user.displayName}`,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/css/classes';

.page-container {
  @include mobile-only {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
  @extend .pb-32;
}
</style>
