<template>
    <ConfirmDialog></ConfirmDialog>
</template>

<script>
import ConfirmDialog from "primevue/confirmdialog";

export default {
  name: "Dialog",
  components: {ConfirmDialog},
  props: ["deleteDialog"],
  created(){
    this.supprimer()
  },
  methods: {
    supprimer(){
      return this.deleteDialog()
    }
  }
};
</script>

<style>
</style>