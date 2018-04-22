<template>
  <div class="hello">
    <!-- <div id = "canvass" style="border:1px solid #000000;"> -->
      <!-- <canvas id="canvas"></canvas> -->
    <!-- </div> -->
    <div id="canvass" style="center">
    <my-canvas style="width: 100%; height: 300px;" >
      <pen :x="x" :y="y"></pen>
    </my-canvas>
    </div>
    <div>
      <button v-on:click="getColor">Say the color</button>
      <button v-on:click="getPitch">Pitch</button>
      <button v-on:click="stopPitch">Stop</button>
      <div>
        <h3>Color result: {{color}}</h3>
        <h3>Pitch: {{pitch}} Volume: {{y}}</h3>
        
      </div>
    </div>
  </div>
</template>

<script>
import ColorRecognizer from "../speech/color.js";
import PitchDetect from "../speech/pitch.js";
// import CanvasDraw from '../draw.js';
import MyCanvas from "./MyCanvas.vue";
// import MyBox from './MyBox.vue';
import Pen from "./Pen.vue";

export default {
  name: "HelloWorld",
  components: {
    MyCanvas,
    Pen
  },
  data() {
    return {
      x: 0,
      y: 0,
      color: "",
      pitch: 0,
      pitching: false,
      pd: new PitchDetect(
        x => {
          // console.log(x);
          this.pitch = x;
          this.x = this.pitch / 350;
          // this.y = Math.round(Math.random()*this.pitch);
        },
        y => {
          let volume = y / 0.5;
          this.y = volume;
          console.log(volume);
        }
      )
    };
  },
  methods: {
    getColor: function() {
      const rec = new ColorRecognizer(x => {
        this.color = x;
        // console.log(this.color);
        // console.log(x);
      });
      rec.start();
    },
    getPitch: function() {
      this.pd.start();
    },
    stopPitch: function() {
      this.pd.stop();
    },
    handleRight: function() {
      console.log(this.x);
      this.x++;
    }
  },
  mounted() {
    // let cd = new CanvasDraw();
    // cd.prepare();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#canvass {
  border: 1px solid black;
}
</style>
