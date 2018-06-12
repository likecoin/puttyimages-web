<template>
  <v-app>
    <the-overlay-component />

    <the-header />
    <nuxt/>
  </v-app>
</template>

<script>
import TheOverlayComponent from '@/components/TheOverlayComponent';
import TheHeader from '@/components/TheHeader';

export default {
  components: {
    TheOverlayComponent,
    TheHeader,
  },
};
</script>
