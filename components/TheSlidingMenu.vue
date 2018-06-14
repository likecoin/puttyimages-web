<template>
  <div
    :class="classObject"
    @click.self="onClickOutside"
  >

    <div class="the-sliding-menu__menu">
      <div>

        <div class="user-account">
          <img
            class="user-account__avatar"
            src=""
          >
          <div>
            <div class="user-account__greeting">Welcome!</div>
            <div
              class="user-account__likecoin-id"
              @click="onClickOutside"
            >
              <nuxt-link :to="{ name: 'dashboard' }">
                franklamhang
              </nuxt-link>
            </div>
          </div>
        </div>

        <nav class="site-menu">
          <ul>
            <li
              v-for="item in menuItems"
              :key="item.key"
              @click="onClickOutside"
            >
              <nuxt-link :to="item.to">
                {{ item.title }}
              </nuxt-link>
            </li>
          </ul>
        </nav>

        <div class="the-sliding-menu__menu-footer">
          <v-menu
            open-on-hover
            top
            offset-y
          >
            <v-btn
              slot="activator"
              class="btn--likecoin"
              color="primary"
              flat
              small
            >
              <v-icon>language</v-icon><span>Language</span>
            </v-btn>
            <v-list>
              <v-list-tile>
                <v-list-tile-title>English</v-list-tile-title>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-title>中文</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </div>

      </div>
    </div>

    <div class="the-sliding-menu__buttons">
      <v-btn
        :color="buttonsColor"
        class="btn--likecoin"
        flat
        icon
        large
      >
        <search-icon />
      </v-btn>
      <v-btn
        :color="buttonsColor"
        class="the-sliding-menu__buttons__toggle btn--likecoin"
        flat
        icon
        large
        @click="onToggle"
      >
        <div class="hamburger-icon">
          <span />
          <span />
          <span />
        </div>
      </v-btn>
    </div>

  </div>
</template>

<script>
import { ColorPropType } from '@/constant/prop-types';

import SearchIcon from '~/assets/icons/search.svg';

export default {
  name: 'the-sliding-menu',
  components: {
    SearchIcon,
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    color: ColorPropType,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    buttonsColor() {
      return this.isOpen ? 'primary' : this.color;
    },
    classObject() {
      return [
        'the-sliding-menu',
        `the-sliding-menu--${this.color}`,
        {
          'the-sliding-menu--open': this.isOpen,
          'the-sliding-menu--home': this.$route.name === 'index',
        },
      ];
    },
    currentUserId() {
      return '1';
    },
    menuItems() {
      return [
        {
          key: 'upload',
          title: 'Upload Image Now',
          to: { name: 'upload' },
        },
        {
          key: 'my-image',
          title: 'My Images',
          to: { name: 'id', params: { id: this.currentUserId } },
        },
        {
          key: 'about',
          title: 'About puttyimages',
          to: { name: 'about' },
        },
        {
          key: 'plugins',
          title: 'Plugins and Widgets',
          to: { name: 'plugins' },
        },
        {
          key: 'support',
          title: 'Support',
          to: { name: 'support' },
        },
      ];
    },
  },
  methods: {
    onToggle() {
      this.isOpen = !this.isOpen;
    },
    onClickOutside() {
      this.isOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/css/classes';

$the-sliding-menu__inset-x: 64px;

.the-sliding-menu {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  pointer-events: none;

  &.the-sliding-menu--open {
    pointer-events: all;
  }

  @include color-modifiers;
}

.the-sliding-menu__buttons {
  position: absolute;
  top: 0;
  right: 0;

  pointer-events: all;

  @include responsive-inset(0, margin-top, margin-right);

  &__toggle {
    margin-right: -8px;

    .hamburger-icon > span {
      display: block;

      width: 26px;
      height: 2px;

      transition: transform 0.25s ease-out;

      background-color: currentColor;

      &:not(:first-child) {
        margin-top: 7px;
      }

      &:nth-child(1),
      &:nth-child(3) {
        transform-origin: left;
      }

      .the-sliding-menu--open & {
        &:nth-child(1) {
          transform: translateX(4px) rotateZ(45deg);
        }
        &:nth-child(2) {
          transform: scaleY(0);
        }
        &:nth-child(3) {
          transform: translateX(4px) rotateZ(-45deg);
        }
      }
    }
  }

  .btn {
    .the-sliding-menu--home & {
      @extend .text--color-primary--xs;
    }
  }
}

.the-sliding-menu__menu {
  position: absolute;
  top: 0;
  right: 0;

  width: breakpoint(xs);
  height: 100vh;

  transition: transform 0.25s ease-out;
  transform: translateX(100%);

  background-image: $gradient-likecoin;

  @include mobile-only {
    width: 100vw;
  }

  > div {
    position: relative;

    display: flex;
    overflow-x: hidden;
    overflow-y: auto;
    flex-direction: column;

    width: inherit;
    height: inherit;

    transition: opacity 0.4s ease-out;

    opacity: 0;

    @include responsive-inset(0, padding-top, padding-bottom);
  }

  .the-sliding-menu--open & {
    transform: none;
    pointer-events: all;

    > div {
      opacity: 1;
    }
  }
}

.the-sliding-menu__menu-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;

  margin-top: 64px;

  @include responsive-inset(0, padding-right);
}

.user-account {
  display: flex;
  align-items: center;

  margin-left: $the-sliding-menu__inset-x;

  color: color(like-green);

  font-size: 16px;
}

.user-account__avatar {
  width: 50px;
  height: 50px;
  margin-right: 12px;

  border-radius: 50%;
  background-color: #ddd;
}

.user-account__greeting {
  opacity: 0.5;
}

.site-menu {
  flex-grow: 1;

  @include responsive-inset(0, margin-top);

  ul {
    margin: 0;
    padding: 0;

    list-style: none;

    li {
      transition: background-color 0.4s ease-out;

      &:hover {
        background-color: #ffffff44;
      }

      a {
        display: block;

        padding: 24px $the-sliding-menu__inset-x;

        font-size: 28px;
        line-height: 1.5;
      }
    }
  }
}
</style>
