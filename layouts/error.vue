<template>
  <section class="container">
    <h1 class="title">
      {{ error.statusCode }}
    </h1>
    <h2 class="info">
      {{ error.message }}
    </h2>
    <nuxt-link
      v-if="error.statusCode === 404"
      class="button"
      to="/"
    >
      Homepage
    </nuxt-link>
  </section>
</template>
<script>
export default {
  props: {
    error: {
      required: true,
      type: Object,
    },
  },
};
</script>

<style scoped>
.title {
  margin-top: 15px;

  font-size: 5em;
}

.info {
  margin: 0;

  color: #9aabb1;

  font-weight: 300;
}

.button {
  margin-top: 50px;
}
</style>
