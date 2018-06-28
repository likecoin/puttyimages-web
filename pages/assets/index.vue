<script>
export default {
  fetch({ redirect }) {
    redirect(301, { name: 'index' });
  },
};
</script>
