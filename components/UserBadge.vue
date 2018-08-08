<template>
  <div
    v-if="user"
    :class="classObject"
  >
    <div @click="onClick">
      <nuxt-link
        :to="userRoute"
        class="d-flex"
      >
        <!-- placeholder icon div without likecoin id -->
        <div
          v-if="!!link"
          class="user-badge__avatar-placeholder"
        />
        <img
          v-else
          :src="avatar"
          class="user-badge__avatar"
        >
      </nuxt-link>
    </div>
    <div>
      <div
        v-if="isShowGreeting"
        class="user-badge__greeting"
      >
        {{ $t('General.label.welcome') }}
      </div>
      <div
        class="user-badge__likecoin-id"
        @click="onClick"
      >
        <a
          v-if="link"
          :href="link"
          rel="noopener noreferrer"
          target="_blank"
        >
          {{ formattedLabel }}
          <slot name="from" />
        </a>
        <nuxt-link
          v-else
          :to="userRoute"
        >
          {{ formattedLabel }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ColorPropType } from '@/constant/prop-types';
import { toDataUrl } from '@likecoin/ethereum-blockies';

const USER_BADGE_TYPE = {
  MIN: 'min',
  MENU: 'menu',
  UPLOAD: 'upload',
  LARGE: 'large',
};

export default {
  name: 'user-badge',
  props: {
    // eslint-disable-next-line vue/require-prop-types
    color: {
      ...ColorPropType,
      default: 'primary',
    },
    label: {
      default: '',
      type: String,
    },
    link: {
      default: '',
      type: String,
    },
    type: {
      default: 'min',
      type: String,
      validator: (value) =>
        value && USER_BADGE_TYPE[value.toUpperCase()] === value,
    },
    user: {
      type: Object,
      default: null,
    },
  },
  computed: {
    avatar() {
      return this.user.avatar || toDataUrl(this.user.wallet);
    },
    classObject() {
      return [
        'user-badge',
        `user-badge--${this.color}`,
        `user-badge--${this.type}`,
      ];
    },
    isShowGreeting() {
      return this.type === USER_BADGE_TYPE.MENU;
    },
    formattedLabel() {
      if (this.label) return this.label;
      switch (this.type) {
        case USER_BADGE_TYPE.UPLOAD:
          return `Uploaded by ${this.user.displayName}`;
        default:
          return this.user.displayName;
      }
    },
    userRoute() {
      return { name: 'id', params: { id: this.user.likecoinId } };
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/css/classes';

.user-badge {
  display: flex;
  align-items: center;

  font-size: 14px;

  @include color-modifiers;

  &--menu {
    font-size: 16px;
  }

  &--large {
    flex-direction: column;
  }
}

.user-badge__avatar,
.user-badge__avatar-placeholder {
  width: 50px;
  height: 50px;
  margin-right: 12px;

  border-radius: 50%;
}

.user-badge__avatar {
  background-color: #fff;

  &-placeholder {
    background-color: color(gray-e6);
  }

  .user-badge--large & {
    width: 84px;
    height: 84px;
    margin-right: 0;
    margin-bottom: 8px;
  }
}

.user-badge__greeting {
  opacity: 0.5;
  color: inherit;
}

.user-badge__likecoin-id {
  @extend .text--height-1-2;
}
</style>
