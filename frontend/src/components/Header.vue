<template>
  <header class="header-form">
    <img src="../assets/icon-left-font.svg" alt="" class="header-logo">
    <div class="header-links">
      <router-link to="/">Créer un compte</router-link>
      <router-link to="/login">Se connecter</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name:"Header"
}
</script>

<style>
.header-form{
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 180px;
  background: white
}

.header-logo{
  width: 300px;
  height: 100%;
}

.header-links{
  font-size: 18px;
}

.header-links a{
  text-decoration: none;
  color: #FD2D01;
  position: relative;
  padding-bottom: 10px;
}

.header-links a:first-child{
  margin-right: 50px;
}

.header-links a::before{
  content: "";
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #FD2D01;
  height: 3px;
  transform: scaleX(0);
  transition: transform 300ms ease-in-out;
}

.header-links a:hover::before,
.header-links a:focus::before{
  transform: scaleX(1);
}
</style>