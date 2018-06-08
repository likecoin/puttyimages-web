<template>
  <div
    :class="[
      'sliding-menu',
      {
        'sliding-menu--open': isOpen,
      },
    ]"
    @click.self="onClickOutside"
  >

    <div class="sliding-menu__menu">
      <div>

        <div class="user-account">
          <img class="user-account__avatar" src="" />
          <div>
            <div class="user-account__greeting">Welcome!</div>
            <div class="user-account__likecoin-id" @click="onClickOutside">
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

        <div class="sliding-menu__menu-footer">
          <v-menu open-on-hover top offset-y>
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

    <div class="sliding-menu__buttons">
      <v-btn class="btn--likecoin" flat icon large color="primary">
        <search-icon />
      </v-btn>
      <v-btn
        class="btn--likecoin"
        color="primary"
        flat
        icon
        large
        @click="onToggle"
      >
        <v-icon large>{{ isOpen ? 'close' : 'menu' }}</v-icon>
      </v-btn>
    </div>

  </div>
</template>

<script>
import SearchIcon from '~/assets/icons/search.svg';

export default {
  name: 'sliding-menu',
  components: {
    SearchIcon,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    menuItems() {
      return [
        {
          key: 'upload',
          title: 'Upload Image Now',
          to: { name: 'index' },
        },
        {
          key: 'my-image',
          title: 'My Images',
          to: { name: 'dashboard' },
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
@import '~assets/css/variables';
@import '~assets/css/mixins';

$sliding-menu__inset-x: 64px;

.sliding-menu {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  pointer-events: none;

  &.sliding-menu--open {
    pointer-events: all;
  }
}

.sliding-menu__buttons {
  position: absolute;
  top: 0;
  right: 0;

  margin-top: 104px;
  margin-right: $sliding-menu__inset-x;

  pointer-events: all;
}

.sliding-menu__menu {
  position: absolute;
  top: 0;
  right: 0;

  width: breakpoint(xs);
  height: 100vh;

  transition: transform .25s ease-out;
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
    padding: 104px 0 64px;

    transition: opacity .4s ease-out;

    opacity: 0;
  }

  .sliding-menu--open & {
    transform: none;
    pointer-events: all;

     > div {
      opacity: 1;
    }
  }
}

.sliding-menu__menu-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;

  margin-top: 64px;
  padding-right: $sliding-menu__inset-x;
}

.user-account {
  display: flex;
  align-items: center;

  margin-left: $sliding-menu__inset-x;

  color: color(like-green);

  font-size: 16px;
}

.user-account__avatar {
  width: 50px;
  height: 50px;
  margin-right: 12px;

  border-radius: 50%;
  background-color: #DDD;
}

.user-account__greeting {
  opacity: .5;
}

.site-menu {
  flex-grow: 1;

  margin-top: 104px;

  ul {
    margin: 0;
    padding: 0;

    list-style: none;

    li {
      transition: background-color .4s ease-out;

      &:hover {
        background-color: #FFFFFF44;
      }

      a {
        display: block;

        padding: 24px $sliding-menu__inset-x;

        font-size: 28px;
        line-height: 1.5;
      }
    }
  }
}
</style>

