<template>
  <div class="the-likecoin-amount">
    <div class="the-likecoin-amount__avatar">
      <img
        :src="avatar"
        alt="avatar"
      >
    </div>

    <div class="pb-16 text--size-18">
      LikeCoin ID:
      <a
        :href="`https://like.co/${likecoinId}`"
        rel="noopener noreferrer"
        target="_blank"
      >{{ likecoinId }}</a>
    </div>

    <div class="the-likecoin-amount__wrap">
      <span class="the-likecoin-amount__label">
        Amount of LikeCoin Received via Puttyimage
      </span>
      <span class="the-likecoin-amount__amount">
        {{ amount }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'the-like-coin-amount',
  props: {
    amount: {
      type: Number,
      default: 0,
    },
    avatar: {
      type: String,
      default: '',
    },
    likecoinId: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/css/classes';

$avatar-size: 112px;
$avatar-border-size: 3px;
$avatar-spacing-horizontal: 24;

.the-likecoin-amount {
  > *:not(.the-likecoin-amount__avatar) {
    padding-left: $avatar-size + $avatar-spacing-horizontal * 2;
  }

  &__avatar {
    position: absolute;

    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;

    width: $avatar-size + $avatar-border-size * 2;
    height: $avatar-size + $avatar-border-size * 2;

    border-radius: 50%;
    background-image: $gradient-likecoin;
    box-shadow: 0 2px 13px 0 rgba(0, 0, 0, 0.5);

    @extend .mx-#{$avatar-spacing-horizontal};

    img {
      width: $avatar-size;
      height: $avatar-size;

      border-radius: 50%;

      object-fit: cover;
    }
  }

  &__wrap {
    display: flex;

    color: #28646e;
    background-image: $gradient-likecoin;

    @extend .py-32, .pr-48, .pr-24--xs;
    @include tablet-and-up {
      align-items: center;
      flex-direction: row;
      justify-content: space-between;

      border-radius: 8px;
    }
    @include mobile-only {
      flex-direction: column;
    }
  }

  &__label {
    max-width: 196px;

    letter-spacing: -0.1px;
  }

  &__amount {
    font-size: 38px;

    @extend .text--weight-300;
    @include mobile-only {
      margin-left: -4px;
    }
  }
}
</style>
