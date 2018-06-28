<template>
  <section class="page-container">
    <div class="user-page">
      <div class="px-12 mb-32 hidden-sm-and-up">
        <!-- TODO: search button here -->
        Search
      </div>

      <!-- TODO: show only when _id route is current user -->
      <div v-if="isCurrentUser">
        <div class="text--align-center text--weight-600 text--size-24">
          My Images
        </div>

        <the-likecoin-amount
          :amount="58.2500"
          :avatar="user.avatar"
          :likecoinId="user.likecoinId"
          class="my-48"
        />
      </div>
      <div v-else>
        <UserBadge
          :user="user"
          class="my-32"
        />
      </div>

      <masonry
        :colCount.sync="colCount"
        :images="images"
      />
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

import axios from '~/plugins/axios';

import Masonry from '~/components/Masonry';
import TheLikeCoinAmount from '~/components/TheLikeCoinAmount';
import UserBadge from '~/components/UserBadge';

import masonryMixin from '~/util/mixin/masonry';

export default {
  name: 'id',
  components: {
    Masonry,
    'the-likecoin-amount': TheLikeCoinAmount,
    UserBadge,
  },
  mixins: [masonryMixin],
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
      console.error(err);
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
