<template>
  <v-btn
    v-bind="{ block, color, flat, loading }"
    class="btn--likecoin"
    depressed
    @click="onClick"
  >
    <clap-icon />
    {{ formattedCount }}
  </v-btn>
</template>

<script>
import ClapIcon from '@/assets/icons/clap.svg';

export default {
  name: 'like-button',
  components: {
    ClapIcon,
  },
  props: {
    block: {
      type: [String, Boolean],
      default: false,
    },
    color: {
      type: String,
      default: 'likecoin',
    },
    flat: {
      type: [String, Boolean],
      default: false,
    },
    count: {
      type: Number,
      default: 0,
    },
    loading: {
      type: [String, Boolean],
      default: false,
    },
  },
  data() {
    return {
      likeCount: this.count,
    };
  },
  computed: {
    formattedCount() {
      return `${this.likeCount.toLocaleString('en')} LIKE`;
    },
  },
  watch: {
    count(count) {
      this.likeCount = count;
    },
  },
  methods: {
    onClick(...args) {
      this.likeCount += 1;
      this.$emit('click', ...args);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/css/classes';

svg {
  width: 32px;
  height: 32px;

  @extend .mr-8;
}
</style>
