<template>
  <section class="w-full h-full min-h-[100vh] grid place-items-center">
    <div class="basicFlex flex-col gap-10">
      <h1 class="text-[4rem] font-[600] text-[#0c0218]">Gamified Learning</h1>
      <div class="basicFlex gap-4">
        <router-link to="/mc-quiz" class="btn transitionEffect">
          Take Multichoice Quiz
        </router-link>
        <router-link to="/dad-quiz" class="btn transitionEffect">
          Take Drag and Drop Quiz
        </router-link>
      </div>
    </div>
  </section>
  </template>
  
  <script setup>
  
  </script>
  
  <style lang="scss" scoped>
  
  </style>