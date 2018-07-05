<template>
  <v-menu
    v-bind="menuProps"
    min-width="112"
    open-on-hover
    offset-y
  >
    <v-btn
      slot="activator"
      :icon="!hasLabel"
      class="btn--likecoin"
      color="primary"
      flat
      medium
    >
      <earth-icon class="language-switch__icon" />
      <span
        v-if="hasLabel"
        class="text--size-14 ml-12"
      >
        {{ $t(`Language.${$i18n.locale}`) }}
      </span>
    </v-btn>

    <v-list>
      <v-list-tile
        v-for="locale in supportedLocales"
        :key="locale"
        @click="onChangeLocale(locale)"
      >
        <v-list-tile-title>
          {{ $t(`Language.${locale}`) }}
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import EarthIcon from '@/assets/icons/earth.svg';

import { SUPPORTED_LOCALES } from '@/locales/index';

export default {
  name: 'language-switch',
  components: {
    EarthIcon,
  },
  props: {
    hasLabel: {
      type: Boolean,
      default: false,
    },
    menuProps: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters(['getLocale']),
    supportedLocales() {
      return SUPPORTED_LOCALES.filter((locale) => this.getLocale !== locale);
    },
  },
  methods: {
    ...mapActions(['setLocale']),
    onChangeLocale(locale) {
      this.setLocale(locale);
    },
  },
};
</script>

<style lang="scss" scoped>
.btn--likecoin.btn--icon {
  width: 40px;
  height: 40px;
}

.language-switch__icon {
  width: 24px;
  height: 24px;
}
</style>
