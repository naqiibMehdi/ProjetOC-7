<template>
  <button :style="{background: color}" :type="type">{{ text }}</button>
</template>

<script>
export default {
  name: "Button",
  props: ["text", "color", "type"]
}
</script>

<style scoped>
button {
  color: white
}

</style>