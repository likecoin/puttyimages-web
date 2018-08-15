<template>
  <div />
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'register',
  computed: {
    ...mapGetters(['getUserInfo']),
  },
  watch: {
    getUserInfo(info) {
      this.redirectIfUserLoggedIn(info);
    },
  },
  mounted() {
    this.redirectIfUserLoggedIn(this.getUserInfo);
  },
  methods: {
    redirectIfUserLoggedIn({ wallet, likecoinId }) {
      if (wallet) {
        this.$router.push({
          name: 'id',
          params: { id: likecoinId },
        });
      }
    },
  },
};
</script>
