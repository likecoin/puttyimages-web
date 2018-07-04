export default function({ store }) {
  if (process.client) {
    // Close the image details dialog when route changes
    store.dispatch('toggleImageDetailsDialog', { isOpen: false });
  }
}
