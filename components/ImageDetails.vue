<template>
  <div class="image-details">
    <div class="image-details__panel-wrapper">
      <div class="image-details__panel--left">
        <slot name="panel-top-left" />
        <div class="image-preview">
          <img
            ref="image"
            :class="[
              'image-preview__image',
              {
                'image-preview__image--loaded': isImageLoaded,
              },
            ]"
            :src="image.url"
            :alt="image.description"
            @load="onImageLoaded"
          >
        </div>
      </div>

      <div class="image-details__panel--right">
        <div class="image-details-content">
          <section class="image-details-content__credits">
            <user-badge
              :user="image.user"
              type="upload"
            />
          </section>
          <section class="image-details-content__meta">
            <h1>Image Description</h1>
            <p>{{ image.description }}</p>
            <h1>Tags</h1>
            <ul>
              <li
                v-for="(tag) in image.tags"
                :key="tag.name"
              >
                <nuxt-link
                  :to="{ name: 'search', query: {tags: tag.name } }"
                >{{ tag.name }}</nuxt-link>
              </li>
            </ul>
          </section>
          <section class="image-details-content__actions">
            <ul>
              <li>
                <v-btn
                  class="btn--likecoin text--size-14"
                  color="primary"
                  depressed
                  block
                  @click="useImage"
                >Use or Download This Image</v-btn>
              </li>
              <li>
                <like-button
                  :count="image.like.count"
                  block
                />
              </li>
            </ul>
          </section>
          <section class="image-details-content__license">
            <p>{{ image.license.name }}</p>
            <a
              class="text--underline text--size-12"
              @click="reportImage"
            >Report Image Right Violations / Abuse</a>
          </section>
        </div>
      </div>
    </div>

    <report-image-dialog
      :image="image"
      :is-open.sync="isReportImageDialogOpen"
    />
    <use-image-dialog
      :image="image"
      :is-open.sync="isUseImageDialogOpen"
    />
  </div>
</template>

<script>
import LikeButton from '~/components/LikeButton';
import ReportImageDialog from '~/components/ReportImageDialog';
import UseImageDialog from '~/components/UseImageDialog';
import UserBadge from '~/components/UserBadge';

export default {
  name: 'image-details',
  components: {
    LikeButton,
    ReportImageDialog,
    UseImageDialog,
    UserBadge,
  },
  props: {
    image: {
      required: true,
      type: Object,
    },
    isReportImage: {
      default: false,
      type: [Boolean, String],
    },
    isUseImage: {
      default: false,
      type: [Boolean, String],
    },
  },
  data() {
    return {
      isImageLoaded: false,
      isReportImageDialogOpen: false,
      isUseImageDialogOpen: false,
    };
  },
  watch: {
    image() {
      this.isImageLoaded = false;
    },
  },
  mounted() {
    this.openSubDialogIfNeeded();
  },
  methods: {
    onImageLoaded() {
      this.isImageLoaded = true;
    },
    openSubDialogIfNeeded() {
      this.openSubDialogTimer = setTimeout(() => {
        this.isReportImageDialogOpen = this.isReportImage;
        this.isUseImageDialogOpen = this.isUseImage;
      }, 500);
    },
    reportImage() {
      this.isReportImageDialogOpen = true;
    },
    useImage() {
      this.isUseImageDialogOpen = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/css/classes';

.image-details {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  @extend .py-24--sm;

  &__close-btn {
    margin: 40px 0 24px -16px;

    @include tablet-and-below {
      margin-top: 24px;
    }
  }

  &__panel-wrapper {
    flex-grow: 1;

    background-color: white;

    @include desktop-and-up {
      display: flex;
    }
  }

  &__panel--left {
    flex-grow: 1;

    @extend .px-64, .px-24--sm, .pb-64, .pb-0--sm;

    @include desktop-and-up {
      display: flex;
      flex-direction: column;
    }
  }

  &__panel--right {
    width: 100%;

    @include desktop-and-up {
      position: relative;

      overflow-y: auto;

      flex-shrink: 0;

      width: 316px;
      height: inherit;

      border-left: solid 1px #ccc;
    }

    @extend .px-40, .px-24--sm, .py-40, .pt-24--sm;
  }
}

.image-preview {
  position: relative;

  flex-grow: 1;

  &__image {
    display: block;

    width: 100%;

    transition: opacity 2s ease;

    opacity: 0;

    object-fit: contain;
    object-position: center;

    @include desktop-and-up {
      position: absolute;
      top: 50%;
      right: 0;
      left: 0;

      max-height: 100%; // Hack for image overflow

      transform: translateY(-50%);
    }

    &--loaded {
      opacity: 1;
    }
  }
}

.image-details-content {
  display: flex;
  flex-direction: column;

  font-size: 12px;

  h1 {
    margin: 24px 0 12px;

    color: color(like-green);

    font-size: 12px;
    font-weight: 600;
  }

  &__credits {
    @extend .mt-32--sm;
  }

  &__meta {
    ul {
      list-style: none;

      > li {
        display: inline;

        &:not(:last-child)::after {
          content: ', ';
        }
      }
    }
  }

  &__actions {
    @extend .mt-48, .mt-8--sm;

    ul {
      margin: -8px;

      list-style: none;

      @include tablet-only {
        display: flex;
        flex-wrap: wrap;
      }

      > li {
        padding: 0 8px;

        @include tablet-only {
          width: 50%;
        }
      }
    }
  }

  &__license {
    @extend .mt-48, .mt-32--sm;
  }

  @include tablet-and-below {
    &__credits {
      order: 2;
    }
    &__meta {
      order: 3;
    }
    &__actions {
      order: 1;
    }
    &__license {
      order: 4;
    }
  }
}
</style>
