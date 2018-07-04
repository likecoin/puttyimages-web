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
    getUserInfo({ wallet, likecoinId }) {
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
