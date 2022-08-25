<template>
     <ConfirmDialog></ConfirmDialog>
</template>

<script>
import ConfirmDialog from "primevue/confirmdialog";

export default {
  name: "Dialog",
  components: {ConfirmDialog},
  props: {
    deleteDialog: {
      type: Function
        }, 
    deleteComment: {
      type: Function,
      required: false
      }
    },
  methods: {
    supprimer(){
      return this.deleteDialog()
    },

    suppComment() {
      return this.deleteComment()
    }
  }
};
</script>

<style>
</style>