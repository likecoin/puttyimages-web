<template>
  <div
    :class="classObject"
    @click.self="onClickOutside"
  >

    <transition
      name="the-search-transition-overlay--fade"
      @afterEnter="goToSearchPage"
    >
      <div
        v-if="isSearchButtonClicked"
        class="the-search-transition-overlay"
      />
    </transition>

    <transition name="the-sliding-menu__menu-">
      <div
        v-if="isOpen"
        class="the-sliding-menu__menu"
      >
        <div>

          <user-badge
            v-if="currentUserId"
            :user="getUserInfo"
            type="menu"
          />

          <nav class="site-menu">
            <transition-group
              name="site-menu__item--fade"
              tag="ul"
              appear
            >
              <li
                v-for="item in menuItems"
                :key="item.key"
                @click="onClickOutside"
              >
                <nuxt-link :to="item.to">
                  {{ $t(`Menu.item.${item.key}`) }}
                </nuxt-link>
              </li>
            </transition-group>
          </nav>

          <div class="the-sliding-menu__menu-footer">
            <language-switch
              :menuProps="{ top: true }"
              hasLabel
            />
          </div>

        </div>
      </div>
    </transition>

    <div class="the-sliding-menu__buttons">
      <transition name="the-sliding-menu__buttons__search-button--slide-fade">
        <v-btn
          v-if="isShowSearchButton"
          key="search-button"
          :color="buttonsColor"
          class="btn--likecoin"
          flat
          icon
          large
          @click="onToggleSearchDialog"
        >
          <search-icon />
        </v-btn>
      </transition>
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
import { mapGetters } from 'vuex';

import { ColorPropType } from '@/constant/prop-types';

import LanguageSwitch from '~/components/LanguageSwitch';
import SearchIcon from '~/assets/icons/search.svg';
import UserBadge from '~/components/UserBadge';

export default {
  name: 'the-sliding-menu',
  components: {
    LanguageSwitch,
    SearchIcon,
    UserBadge,
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    color: ColorPropType,
  },
  data() {
    return {
      isOpen: false,
      isSearchButtonClicked: false,
    };
  },
  computed: {
    ...mapGetters(['getUserInfo']),
    buttonsColor() {
      return this.isOpen ? 'primary' : this.color;
    },
    classObject() {
      return [
        'the-sliding-menu',
        `the-sliding-menu--${this.color}`,
        `the-sliding-menu--${this.isOpen ? 'open' : 'closed'}`,
        {
          'the-sliding-menu--home': this.$route.name === 'index',
        },
      ];
    },
    currentUserId() {
      return this.getUserInfo.likecoinId;
    },
    isShowSearchButton() {
      return !(this.isSearchButtonClicked || this.$route.name === 'search');
    },
    menuItems() {
      return [
        {
          key: 'upload',
          to: { name: 'upload' },
        },
        {
          key: 'my-image',
          to: {
            name: this.currentUserId ? 'id' : 'register',
            params: { id: this.currentUserId },
          },
        },
        {
          key: 'about',
          to: { name: 'about' },
        },
        {
          key: 'plugins',
          to: { name: 'plugins' },
        },
        {
          key: 'support',
          to: { name: 'support' },
        },
      ];
    },
  },
  watch: {
    $route() {
      this.isSearchButtonClicked = false;
    },
  },
  methods: {
    onClickOutside() {
      this.isOpen = false;
    },
    onToggle() {
      this.isOpen = !this.isOpen;
    },
    onToggleSearchDialog() {
      this.isOpen = false;
      this.isSearchButtonClicked = true;
    },
    goToSearchPage() {
      this.$router.push({ name: 'search' });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/css/classes';

$the-sliding-menu__inset-x: 64px;
$ths-sliding-menu__button-shadow-color: rgba(0, 0, 0, 0.5);

.the-sliding-menu {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  transition: background-color 1s ease-out;

  pointer-events: none;

  &.the-sliding-menu--open {
    pointer-events: all;

    background-color: #00000022;
  }

  @include color-modifiers;
}

.the-sliding-menu__buttons {
  position: absolute;
  top: 0;
  right: 0;

  pointer-events: all;

  @extend .mt-64--dy, .mr-64--dy;

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

  &__search-button {
    &--slide-fade- {
      &enter-active,
      &leave-active {
        transition: (
          transform 0.6s cubic-bezier(0.3, 0, 0.5, 0.5),
          opacity 0.4s cubic-bezier(0.3, 0, 0.5, 0.5)
        );
      }
      &enter,
      &leave-to {
        opacity: 0 !important;
      }
      &leave-to {
        transform: translateX(-30vw) !important;
      }
    }
  }

  .btn {
    .the-sliding-menu--home & {
      @extend .text--color-primary--xs;
    }
  }

  // Shadow for icon buttons in home page
  .the-sliding-menu--home:not(.the-sliding-menu--open) & {
    @include tablet-and-up {
      svg {
        filter: drop-shadow(0px 0px 2px $ths-sliding-menu__button-shadow-color);
      }

      .hamburger-icon > span {
        box-shadow: 0px 0px 5px $ths-sliding-menu__button-shadow-color;
      }
    }
  }
}

.the-sliding-menu__menu {
  position: absolute;
  top: 0;
  right: 0;

  width: breakpoint(xs);
  height: 100vh;

  background-image: $gradient-likecoin;

  @include mobile-only {
    width: 100vw;
  }

  &-- {
    &enter-active,
    &leave-active {
      transition: transform 0.4s cubic-bezier(0.2, 0.7, 0.15, 1);
    }
    &enter,
    &leave-to {
      transform: translateX(100%);
    }
  }

  > div {
    position: relative;

    display: flex;
    overflow-x: hidden;
    overflow-y: auto;
    flex-direction: column;

    width: inherit;
    height: inherit;

    @extend .py-64--dy;
  }

  .the-sliding-menu--open & {
    pointer-events: all;
  }

  :global(.user-badge) {
    flex-shrink: 0;

    margin-left: $the-sliding-menu__inset-x;
  }
}

.the-sliding-menu__menu-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;

  margin-top: 64px;

  @extend .pr-64--dy;
}

.site-menu {
  flex-grow: 1;

  @extend .mt-64--dy;

  ul {
    margin: 0;
    padding: 0;

    list-style: none;

    li {
      transition: background-color 0.4s ease-out;

      &:hover {
        background-color: #ffffff44;
      }

      &.site-menu__item--fade- {
        &enter-active {
          transition: (
            transform 0.4s cubic-bezier(0.2, 0.7, 0.15, 1),
            opacity 0.6s ease-out
          );

          @for $i from 0 through 10 {
            &:nth-child(#{$i}) {
              transition-delay: #{$i / 24}s;
            }
          }
        }
        &enter {
          transform: translateX(100px);

          opacity: 0;
        }
        &leave-to {
          transition-duration: 0.4s;
        }
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

.the-search-transition-overlay {
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: white;

  &--fade- {
    &enter-active,
    &leave-active {
      transition: opacity 0.5s cubic-bezier(0.2, 0.2, 0, 1);
    }
    &enter,
    &leave-to {
      opacity: 0;
    }
  }
}
</style>
