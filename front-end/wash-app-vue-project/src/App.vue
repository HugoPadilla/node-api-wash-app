<script setup>
import {RouterView} from "vue-router";
import {onBeforeMount} from "vue";
import {useStore} from "vuex";

const store = useStore()

onBeforeMount(() => {
  store.commit('initialiseStore')
})
</script>

<template>
  <RouterView/>
</template>

<style lang="scss" scoped></style>
