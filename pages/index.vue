<template>
  <section class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      USERS
    </h1>
    <v-card>
      <v-list two-line>
        <v-list-tile v-for="user in users" :key="user.id" nuxt :to="{ name: 'id', params: { id: user.id }}">
          {{ user.name }}
        </v-list-tile>
      </v-list>
    </v-card>
  </section>
</template>

<script>
import axios from '~/plugins/axios';

export default {
  async asyncData() {
    const { data } = await axios.get('/api/users');
    return { users: data };
  },
  head() {
    return {
      title: 'Users',
    };
  },
};
</script>

<style scoped>
.title
{
  margin: 30px 0;
}
</style>
