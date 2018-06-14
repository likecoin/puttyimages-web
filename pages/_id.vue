<template>
  <section class="container">
    <h1 class="title">
      User
    </h1>
    <v-card>
      <v-card-title primary-title>
        {{ user.name }}
      </v-card-title>
      <v-card-actions>
        <v-btn
          flat
          color="orange"
          nuxt
          to="/"
        >
          All Users
        </v-btn>
      </v-card-actions>
    </v-card>
  </section>
</template>

<script>
import axios from '~/plugins/axios';

export default {
  name: 'id',
  asyncData({ params, error }) {
    return axios
      .get(`/api/users/${params.id}`)
      .then((res) => ({ user: res.data }))
      .catch(() => {
        error({ statusCode: 404, message: 'User not found' });
      });
  },
  head() {
    return {
      title: `User: ${this.user.name}`,
    };
  },
};
</script>

<style scoped>
.title {
  margin-top: 30px;
}
</style>
