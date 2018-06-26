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

export const createMixin = (name = 'setImageDetailsDialog') => ({
  methods: {
    ...mapActions({
      [name]: 'setState',
    }),
  },
});

export default {
  name: 'the-image-details-dialog',
  components: {
    ImageDetailsDialog,
  },
  mixins: [createMixin('setState')],
  computed: {
    ...mapState({
      state: (s) => ({ ...s }),
    }),
  },
  methods: {
    onToggle(isOpen) {
      this.setState({ isOpen });
    },
  },
};
</script>
