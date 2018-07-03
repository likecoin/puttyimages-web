<template>
  <image-details-dialog
    v-bind="state"
    @update:isOpen="onToggle"
  />
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

import ImageDetailsDialog from '~/components/ImageDetailsDialog';

const { mapState, mapActions } = createNamespacedHelpers('ImageDetailsDialog');

export default {
  name: 'the-image-details-dialog',
  components: {
    ImageDetailsDialog,
  },
  computed: {
    ...mapState({
      state: (s) => ({ ...s }),
    }),
  },
  methods: {
    ...mapActions(['setState']),
    onToggle(isOpen) {
      this.setState({ isOpen });
    },
  },
};
</script>
