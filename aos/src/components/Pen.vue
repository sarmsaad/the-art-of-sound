<script>
export default {
  // Gets us the provider property from the parent <my-canvas> component.
  inject: ["provider"],

  props: {
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    }
  },
  render () {
    // Since the parent canvas has to mount first, it's *possible* that the context may not be
    // injected by the time this render function runs the first time.
    if(!this.provider.context) return;

    const ctx = this.provider.context;
    console.log(this.x, this.y);
    ctx.fillRect(this.x, this.y, 20, 20);
  }
};
</script>
