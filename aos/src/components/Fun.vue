<template>

<div>
    <h>Hello, {{text}}</h>
    <input name="box" type="text" v-model="text" />>
</div>
  
</template>


<script>
export default {
  name: 'Fun',
  data () {
      return {
          text: "World"
      }
  }
}
</script>

<style>

</style>
