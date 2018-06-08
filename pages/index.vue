<template>
  <div class="home-page">

    <section class="container">
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

    <div class="image-upload-btn-wrapper">
      <v-btn class="btn--likecoin" color="secondary" depressed>
        <v-icon>add_circle_outline</v-icon>
        <span>Upload Your Image</span>
      </v-btn>
    </div>

  </div>
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
      title: 'puttyimages',
    };
  },
};
</script>

<style lang="scss" scoped>
.image-upload-btn-wrapper {
  position: fixed;
  right: 48px;
  bottom: 72px;

  .btn--likecoin {
    height: 88px;

    :global(.btn__content) {
      padding: 0 64px;
    }
  }
}
</style>
