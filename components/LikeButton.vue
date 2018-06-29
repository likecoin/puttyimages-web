<template>
  <v-btn
    v-bind="{ block, flat, loading }"
    class="btn--likecoin"
    color="likecoin"
    depressed
    @click="onClick"
  >{{ formattedCount }}</v-btn>
</template>

<script>
export default {
  name: 'like-button',
  props: {
    block: {
      type: [String, Boolean],
      default: false,
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
