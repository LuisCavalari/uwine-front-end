<template>
  <div class="login--area">
      <div class="login--left">
        <slot></slot>
      </div>
      <div class="login--right">
          <img class="glass" src="../assets/glass.png" alt="">
      </div>
  </div>
</template>

<script>
export default {
  name: 'InitialPageTemplate',
};
</script>

<style>
.login--area {
  height: 100%;
  display: flex;
}
.login--left,
.login--right {
  flex: 1;
}
.login--right {
  position: relative;
  background-color: #69306d;
}
.login--left {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.glass {
  position: absolute;
  bottom: 0;
  right: 0;
  max-width: 540px;
  width: 100%;
}
@media only screen and (max-width: 848px) {
  .login--right {
    display: none;
  }
}


</style>
