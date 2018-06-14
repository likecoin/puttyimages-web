<template>
  <v-app>
    <the-overlay-component />

    <the-header />
    <nuxt />
  </v-app>
</template>

<script>
import TheHeader from '@/components/TheHeader';
import TheOverlayComponent from '@/components/TheOverlayComponent';

export default {
  components: {
    TheOverlayComponent,
    TheHeader,
  },
};
</script>
