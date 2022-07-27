<template>
  <button :style="{background: bgdclr, color: color}" :type="type">{{ text }}</button>
</template>

<script>
export default {
  name: "Button",
  props: ["text", "bgdclr", "type", "color"]
}
</script>

<style scoped>
button{
  outline: none;
  border: none
}
</style>