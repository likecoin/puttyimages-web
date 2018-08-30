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
          <transition name="page">
            <div
              v-if="isDownloadImageDialogOpen"
              class="image-preview__overlay"
            />
          </transition>
        </div>
        <div class="image-details__panel--left-bottom">
          <!-- TODO: LikeButton here -->
          <div class="my-32">
            <p class="text--color-gray-9b">
              {{ $tc('ImageDetails.label.views', viewCount, { count: viewCount }) }}
              /
              {{ $tc('ImageDetails.label.downloads', downloadCount, { count: downloadCount }) }}
            </p>
          </div>
        </div>
      </div>

      <div class="image-details__panel--right">
        <div class="image-details-content">
          <section class="image-details-content__credits">
            <user-badge
              :label="image.likeOwner ? image.likeOwner[0] : ''"
              :link="image.link"
              :user="image.user"
              type="min"
            >
              <template
                v-if="!isUploaderImageOwner"
                slot="from"
              >
                <i18n
                  class="text--color-gray-9b text--size-10 text--weight-600"
                  path="ImageDetails.label.from"
                  tag="span"
                >
                  <span class="text--underline text--capitalize">
                    {{ getImageSourceFromUrl(image.link) }}
                  </span>
                </i18n>
              </template>
            </user-badge>
            <a
              v-if="!isUploaderImageOwner"
              class="pl-64 text--color-primary text--size-10 text--underline"
            >{{ $t('ImageDetails.label.claimPhoto') }}</a>
          </section>

          <hr class="my-24">

          <section class="image-details-content__actions">
            <ul>
              <li>
                <v-btn
                  block
                  class="btn--likecoin text--size-20"
                  color="green"
                  depressed
                  @click="downloadImage"
                >{{ $t('ImageDetails.button.download') }}</v-btn>
              </li>
            </ul>
          </section>

          <section class="image-details-content__license">
            <a
              :href="licenseLink"
              class="text--size-14 text--underline text--weight-600"
              rel="noopener noreferrer"
              target="_blank"
            >{{ $t(`ImageDetails.label.${image.license}`) }}</a>
            <!-- TODO: figure out a good way to avoid v-html -->
            <!-- eslint-disable vue/no-v-html -->
            <p
              class="mt-4"
              v-html="$t(`ImageDetails.label.${image.license}-details`)"
            />
            <!-- eslint-enable vue/no-v-html -->
            <a
              class="text--underline text--size-12 text--color-gray-9b"
              @click="reportImage"
            >{{ $t('ImageDetails.button.reportAbuse') }}</a>
          </section>

          <hr class="mt-32 mb-24">

          <section class="image-details-content__meta">
            <ul>
              <li
                v-for="(tag) in image.tags"
                :key="tag.name"
              >
                <nuxt-link
                  :to="{ name: 'search', query: { tags: tag.name } }"
                >{{ tag.name }}</nuxt-link>
              </li>
            </ul>
            <p class="text--size-14 mt-16 mb-24">
              {{ image.description }}
            </p>
          </section>

          <section
            class="image-details-content__exif"
          >
            <h1 v-if="hasExif && (image.exif.Make || image.exif.Model)">
              {{ image.exif.Make }} {{ image.exif.Model }}
            </h1>
            <span
              v-if="hasExif"
              class="text--color-gray-9b"
            >
              <span v-if="image.exif.LensMake || image.exif.LensModel">
                {{ image.exif.LensMake }} {{ image.exif.LensModel }}<br>
              </span>
              <span v-if="image.exif.FocalLength">
                {{ image.exif.FocalLength }}mm
              </span>
              <span v-if="image.exif.FNumber">
                · f/{{ image.exif.FNumber }}
              </span>
              <span v-if="image.exif.ExposureTime">
                · 1/{{ 1 / (image.exif.ExposureTime) }}s
              </span>
              <span v-if="image.exif.ISO">
                · ISO {{ image.exif.ISO }} ↯
              </span>
            </span>
            <ul>
              <li v-if="image.type">
                <span>{{ $t('ImageDetails.label.imageType') }}</span>
                <span class="image-details-content__type">{{ image.type }}</span>
              </li>
              <li>
                <span>{{ $t('ImageDetails.label.resolution') }}</span>
                <span>{{ image.width }} x {{ image.height }}</span>
              </li>
              <li v-if="image.dateCreated">
                <span>{{ $t('ImageDetails.label.created') }}</span>
                <span>{{ formatDate(image.dateCreated) }}</span>
              </li>
              <li>
                <span>{{ $t('ImageDetails.label.uploaded') }}</span>
                <span>{{ relativeUploadTime }}</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>

    <report-image-dialog
      :image="image"
      :is-open.sync="isReportImageDialogOpen"
    />
    <download-image-dialog
      :image="image"
      :is-open.sync="isDownloadImageDialogOpen"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import format from 'date-fns/format';

import DownloadImageDialog from '~/components/DownloadImageDialog';
import ReportImageDialog from '~/components/ReportImageDialog';
import UserBadge from '~/components/UserBadge';

import { getImageSourceFromUrl } from '~/util/index';
import { LICENSE } from '~/constant/index';

export default {
  name: 'image-details',
  components: {
    DownloadImageDialog,
    ReportImageDialog,
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
      isDownloadImageDialogOpen: false,
    };
  },
  computed: {
    isUploaderImageOwner() {
      return !this.image.likeEscrow;
    },
    licenseLink() {
      return this.image.licenseUrl || LICENSE[this.image.license] || null;
    },
    relativeUploadTime() {
      return distanceInWordsToNow(this.image.updatedAt, {
        addSuffix: true,
      });
    },
    downloadCount() {
      return (this.image.stats || {}).downloadCount || 0;
    },
    viewCount() {
      return (this.image.stats || {}).viewCount || 0;
    },
    hasExif() {
      return this.image.exif && Object.keys(this.image.exif).length > 0;
    },
  },
  watch: {
    image() {
      this.isImageLoaded = false;
    },
  },
  mounted() {
    this.viewImage(this.image.fingerprint);
    this.openSubDialogIfNeeded();
  },
  methods: {
    ...mapActions('ImageDetailsDialog', ['viewImage']),
    onImageLoaded() {
      this.isImageLoaded = true;
    },
    openSubDialogIfNeeded() {
      this.openSubDialogTimer = setTimeout(() => {
        this.isReportImageDialogOpen = this.isReportImage;
        this.isDownloadImageDialogOpen = this.isUseImage;
      }, 500);
    },
    reportImage() {
      this.isReportImageDialogOpen = true;
    },
    downloadImage() {
      this.isDownloadImageDialogOpen = true;
    },
    formatDate(date) {
      return format(date, 'MMMM D, YYYY');
    },
    getImageSourceFromUrl,
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/css/classes';

.image-details {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  &__panel-wrapper {
    flex-grow: 1;

    background-color: white;

    @include desktop-and-up {
      display: flex;
    }
  }

  &__panel--left {
    flex-grow: 1;

    @extend .px-24--sm;
    @include desktop-and-up {
      display: flex;
      flex-direction: column;
    }

    &-bottom {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      @extend .pl-40, .pr-24;
      @include mobile-only {
        flex-direction: column;
      }

      iframe {
        height: 120px;
      }
    }
  }

  &__panel--right {
    width: 100%;

    background-color: color(gray-f7);

    @include desktop-and-up {
      position: relative;

      overflow-y: auto;
      flex-shrink: 0;

      width: 288px;
      height: inherit;

      border-left: solid 1px #ccc;
    }
    @extend .px-24, .px-24--sm, .py-48, .pt-24--sm;

    hr {
      border: none;
      border-top: 1px solid color(gray-e6);
    }
  }
}

.image-preview {
  position: relative;

  flex-grow: 1;

  @extend .my-24;

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

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    content: ' ';

    background-color: rgba(0, 0, 0, 0.5);
  }
}

.image-details-content {
  display: flex;
  flex-direction: column;

  font-size: 12px;

  > *:not(.image-details-content__actions) {
    @extend .px-8;
  }

  h1 {
    margin: 0 0 4px;

    color: color(like-green);

    font-size: 12px;
    font-weight: 600;
  }

  &__type {
    text-transform: uppercase;
  }

  &__credits {
    @extend .mt-32--sm;

    :global(.user-badge__likecoin-id) {
      @extend .text--size-18, .text--weight-600;
    }
  }

  &__exif {
    @extend .mt-16;

    ul {
      list-style: none;

      @extend .mt-8;

      li {
        display: flex;
        justify-content: space-between;

        @extend .text--height-1-8;

        span:last-child {
          text-align: right;
        }
      }
    }
  }

  &__actions {
    @extend .mt-8--sm;

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

  &__meta {
    ul {
      list-style: none;

      > li {
        display: inline-block;

        @extend .text--underline;

        &:not(:first-child) {
          margin-left: 4px;
        }
        &:not(:last-child)::after {
          content: ',';
        }
      }
    }
  }

  &__license {
    @extend .mt-24, .mt-32--sm;
  }
}
</style>
