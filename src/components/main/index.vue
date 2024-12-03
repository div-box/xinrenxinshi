<template>
  <section class="content">
    <router-view></router-view>
  </section>
</template>
<style lang="scss" scoped>
.opacity-enter-active,
.opacity-leave-active {
  transition: opacity 0.2s ease;
}

.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
}
</style>
