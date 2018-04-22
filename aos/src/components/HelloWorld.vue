<template>
  <div id="hello">
    <!-- <div id = "canvass" style="border:1px solid #000000;"> -->
      <!-- <canvas id="canvas"></canvas> -->
    <!-- </div> -->
    <my-canvas style="width: 1000px; height: 300px;" >
      <pen :x="x" :y="y"></pen>
    </my-canvas>
    <h1>The Art of Sound</h1>
    <div>
      <button v-on:click="getPitch">Pitch</button>
      <button v-on:click="stopPitch">Stop</button>
      <div>

        <h3>Pitch: {{pitch}} Volume: {{y}}</h3>


      </div>
    </div>
  </div>
</template>

<script>
import ColorRecognizer from "../speech/color.js";
import PitchDetect from "../speech/pitch.js";
// import CanvasDraw from '../draw.js';
import MyCanvas from './MyCanvas.vue';
// import MyBox from './MyBox.vue';
import Pen from './Pen.vue';

export default {
  name: "HelloWorld",
  components: {
    MyCanvas,
    Pen
  },
  data() {
    return {
      x:0,
      y:0,
      color: "",
      pitch: 0,
      pitching: false,
      pd: new PitchDetect(x => {
        // console.log(x);
        this.pitch = x;
        this.x = Math.round(this.pitch/500 * 1000);
        // this.y = Math.round(Math.random()*this.pitch);
      }, y => {
        let volume = (y/0.5)*300
        this.y = Math.round(volume);
        console.log(volume);
      })
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
      this.x ++;
    }
  },
  mounted () {
    // let cd = new CanvasDraw();
    // cd.prepare();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

  h3 {
    font-family: "Verdana";
    font-style: italic;
    font-size: 14pt;
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
  h1 {
    font-size: 200;
    font-family: "Verdana";
    font-weight: bolder;
  }
  button {
    background-color: #957bed; /* bed color */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 5px 15px 15px 5px;
    border-radius: 5px;
  }
  button:hover{
    background-color: #766ce2;
  }
body{
    background: #d9a7c7;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #fffcdc, #d9a7c7);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #fffcdc, #d9a7c7); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    height: 100%;
  }
</style>
