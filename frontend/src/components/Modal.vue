<template>
  <Teleport to="body">
      <transition name="fade">
        <div class="overlay" @click.self="closeModal">
          <div class="formModal">
            <slot></slot>
          </div>
        </div>
      </transition>
  </Teleport>
</template>

<script>
import Button from "primevue/button"
import Textarea from 'primevue/textarea'


export default {
  name: "Modal",
  components: {Button, Textarea},
  emits: ["fermerModal"],
  methods: {
    closeModal() {
      this.$emit("fermerModal")
    },
  }
}
</script>

<style>
  .overlay{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .formModal{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    background: rgba(187, 190, 208, 1);
    width: 40%;
    border-radius: 5px;
  }
  .formModal-form{
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding: 40px 20px
  }

  .formModal-textarea{
    border-radius: 5px;
  }

  .formModal-button{
    margin-top: 20px
  }

  .overlay .imagePreview{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px 0;
  }

  .imagePreview img{
    width: 50%;
    height: 200px;
    border-radius: 5px;
    border: solid 1px #4E5166;
    padding: 3px;
    object-fit: cover;
  }

  /* pour les transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media all and (max-width: 992px){
  .formModal{
    width: 50%;
  }
}
@media all and (max-width: 768px){
  .formModal{
    width: 90%;
    left: 48%;
  }
}
</style>