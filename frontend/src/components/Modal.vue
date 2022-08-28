<template>
  <Teleport to="body">
    <transition name="fade">
      <div class="overlay" @click.self="closeModal">
        <div class="formModal">
          <div class="cross" @click="closeModal">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path
              d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
            />
          </svg>
          </div>
          <slot></slot>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script>
import Button from "primevue/button";
import Textarea from "primevue/textarea";

export default {
  name: "Modal",
  components: { Button, Textarea },
  emits: ["fermerModal"],
  methods: {
    closeModal() {
      this.$emit("fermerModal");
    },
  },
};
</script>

<style>
.overlay {
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

.formModal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  background: rgba(187, 190, 208, 1);
  width: 40%;
  border-radius: 5px;
}

.formModal .cross{
  width: 30px;
  height: 30px;
  position: absolute;
  top: 5px;
  right: 5px;
  margin-bottom: 10px;
  cursor: pointer
}

.cross svg{
  width: 100%;
  height: 100%;
}

.formModal-form {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 50px 20px;
}

.formModal-textarea {
  border-radius: 5px;
}

.formModal-button {
  margin-top: 20px;
}

.overlay .imagePreview {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0;
}

.imagePreview img {
  width: 50%;
  height: 200px;
  border-radius: 5px;
  border: solid 1px #4e5166;
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

@media all and (max-width: 992px) {
  .formModal {
    width: 60%;
  }
}
@media all and (max-width: 768px) {
  .formModal {
    width: 100%;
    height: 100%;
    position: initial;
    transform: none;
    padding: 0 25px 0 10px;
  }

  .formModal .cross{
    top: 240px;
    right: 40px;
}

  .formModal-form {
    justify-content: center;
  }
}
</style>