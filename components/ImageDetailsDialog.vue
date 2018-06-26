<template>
  <v-dialog
    v-model="isOpen"
    content-class="image-details-dialog"
    fullscreen
    full-width
    lazy
  >
    <div
      class="image-details-dialog"
      @click.self="close"
    >
      <div class="image-details-dialog__panel-wrapper">
        <div class="image-details-dialog__panel--left">
          <v-btn
            class="btn--likecoin image-details-dialog__close-btn"
            color="primary"
            icon
            flat
            large
            @click.native="close"
          >
            <v-icon>close</v-icon>
          </v-btn>
          <div
            v-if="isError"
            class="text--align-center pa-64 px-24--sm pt-24--sm"
          >
            There is an error when showing the image.
          </div>
          <div
            v-else
            class="image-preview"
          >
            <transition name="page">
              <v-progress-circular
                v-if="!isImageLoaded"
                :size="64"
                :width="2"
                class="image-preview__progress"
                color="primary"
                indeterminate
              />
            </transition>
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

        <div
          v-if="!isError"
          class="image-details-dialog__panel--right"
        >
          <div class="image-details">
            <section
              v-if="image.user"
              class="image-details__credits"
            >
              <user-badge
                :user="image.user"
                type="upload"
                @click="close"
              />
            </section>
            <section class="image-details__meta">
              <h1 v-if="image.description">Image Description</h1>
              <p v-if="image.description">{{ image.description }}</p>
              <h1 v-if="tags.length > 0">Tags</h1>
              <ul v-if="tags.length > 0">
                <li
                  v-for="(tag) in tags"
                  :key="tag.name"
                  @click="close"
                >
                  <nuxt-link
                    :to="{ name: 'search', query: {tags: tag.name } }"
                  >{{ tag.name }}</nuxt-link>
                </li>
              </ul>
            </section>
            <section class="image-details__actions">
              <ul>
                <li>
                  <v-btn
                    :loading="isFetching"
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
                    :loading="isFetching"
                    block
                  />
                </li>
              </ul>
            </section>
            <section
              v-if="image.license"
              class="image-details__license"
            >
              <p>{{ image.license }}</p>
              <a
                class="text--underline text--size-12"
                @click="reportImage"
              >Report Image Right Violations / Abuse</a>
            </section>
          </div>
        </div>
      </div>

    </div>

    <report-image-dialog
      v-if="!isError && isFetched"
      :image="image"
      :is-open.sync="isReportImageDialogOpen"
    />
    <use-image-dialog
      v-if="!isError && isFetched"
      :image="image"
      :is-open.sync="isUseImageDialogOpen"
    />
  </v-dialog>
</template>

<script>
import LikeButton from '~/components/LikeButton';
import ReportImageDialog from '~/components/ReportImageDialog';
import UseImageDialog from '~/components/UseImageDialog';
import UserBadge from '~/components/UserBadge';

export default {
  name: 'image-details-dialog',
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
    isError: {
      type: [Boolean, String],
      default: false,
    },
    isFetched: {
      type: [Boolean, String],
      default: false,
    },
    isFetching: {
      type: [Boolean, String],
      default: false,
    },
    isOpen: {
      default: false,
      type: [Boolean, String],
    },
    isReportImage: {
      type: [Boolean, String],
      default: false,
    },
    isUseImage: {
      required: true,
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
  computed: {
    tags() {
      const { tags } = this.image;
      return tags || [];
    },
  },
  watch: {
    image() {
      this.isImageLoaded = false;
    },
    isOpen(isOpen) {
      if (isOpen) {
        this.openSubDialogIfNeeded();
      }
    },
  },
  mounted() {
    this.openSubDialogIfNeeded();
  },
  methods: {
    onImageLoaded() {
      this.isImageLoaded = true;
    },
    close() {
      this.$emit('update:isOpen', false);
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

.image-details-dialog {
  @extend .py-24--sm;

  &__close-btn {
    margin: 40px 0 24px -16px;

    @include tablet-and-below {
      margin-top: 24px;
    }
  }

  &__panel-wrapper {
    background-color: white;
    box-shadow: 0 2px 94px 0 rgba(0, 0, 0, 0.5);

    @include desktop-and-up {
      display: flex;

      height: 100vh;
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

  min-height: 240px;

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

  &__progress {
    position: absolute;
    top: calc(50% - 32px);
    left: calc(50% - 32px);
  }
}

.image-details {
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

<style lang="scss">
.image-details-dialog.dialog {
  box-shadow: none;
}
</style>
