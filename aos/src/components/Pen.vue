<script>
const colors = ["#ffb3ba","#ffdfba","#ffffba","#baffc9","#bae1ff"];

function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

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
    },
    color: {
      type: String,
      default: "#000000"
    }
  },
  render() {
    // Since the parent canvas has to mount first, it's *possible* that the context may not be
    // injected by the time this render function runs the first time.
    if (!this.provider.context) return;

    const ctx = this.provider.context;
    // console.log(ctx.canvas.width, ctx.canvas.height);
    console.log("Output coordinate: ",this.x * ctx.canvas.width, this.y * ctx.canvas.height);

    // ctx.fillStyle ="#" +
    //   "0123456789abcdef"
    //     .split("")
    //     .map(function(v, i, a) {
    //       return i > 5 ? null : a[Math.floor(Math.random() * 16)];
    //     })
    //     .join("");

    ctx.fillStyle = choose(colors);
    if (this.x > 0 && this.y > 0) {
      ctx.fillRect(this.x * ctx.canvas.width, this.y * ctx.canvas.height, 15, 15);
    }
    
    // ctx.arc(this.x * ctx.canvas.width, this.y * ctx.canvas.height, 10, 0, 2 * Math.PI);
    // ctx.stroke();
    // ctx.fill();
  }
};
</script>
