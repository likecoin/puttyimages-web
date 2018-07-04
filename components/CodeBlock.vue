<template>
  <div class="code-block">
    <v-layout align-center>

      <textarea
        v-model="code"
        rows="4"
        readonly
      />

      <v-flex>
        <v-layout
          align-center
          column
        >
          <v-btn
            v-clipboard:copy="code"
            slot="activator"
            class="btn--likecoin"
            color="secondary"
            depressed
            @click.native="isShowTooltip = true"
          >
            {{ $t('General.button.copy') }}
          </v-btn>
          <v-tooltip
            v-model="isShowTooltip"
            bottom
          >
            <span slot="activator" />
            <span>{{ $t('General.button.copied') }}</span>
          </v-tooltip>
        </v-layout>
      </v-flex>

    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'code-block',
  props: {
    code: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isShowTooltip: false,
    };
  },
  watch: {
    isShowTooltip(isShowTooltip) {
      if (isShowTooltip) {
        this.hideTooltipTimer = setTimeout(() => {
          this.isShowTooltip = false;
        }, 1000);
      }
    },
  },
  beforeDestroy() {
    if (this.hideTooltipTimer) {
      clearTimeout(this.hideTooltipTimer);
      this.hideTooltipTimer = null;
    }
  },
};
</script>

<style lang="scss" scoped>
.code-block {
  background-color: #f1f1f1;

  textarea {
    display: block;

    width: 100%;
    padding: 8px;

    resize: none;
    word-wrap: break-word;

    font-family: 'Courier New', Courier, monospace;
    font-size: 12px;
  }
}
</style>
