<template>
  <v-app>
    <overlay-component />

    <the-header />
    <nuxt/>
  </v-app>
</template>

<script>
import OverlayComponent from '@/components/OverlayComponent';
import TheHeader from '@/components/TheHeader';

export default {
  components: {
    OverlayComponent,
    TheHeader,
  },
};
</script>
