<template>
  <button :style="{background: color}">{{ text }}</button>
</template>

<script>
export default {
  name: "Button",
  props: ["text", "color"]
}
</script>

<style scoped>
button {
  color: white
}

</style>