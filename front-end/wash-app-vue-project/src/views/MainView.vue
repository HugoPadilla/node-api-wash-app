<script setup>
import {RouterView} from "vue-router";
import {customRef, onMounted, ref} from "vue";
import Cookies from "js-cookie";
import CustomDrawer from "../components/CustomDrawer.vue";
import CustomHeader from "../components/CustomHeader.vue";

let isVisible = ref(false);
const currentUser = ref({});

onMounted(() => {
  getCurrentUser();
});

function getCurrentUser() {
  try {
    const cookiesUser = Cookies.get("usuario");
    currentUser.value = JSON.parse(cookiesUser);
    console.log(currentUser.value)
  } catch (e) {
    console.log(e)
  }
}

function toggledrawe() {
  isVisible.value = !isVisible.value;
  console.log(isVisible.value);
}
</script>
<template>
  <div class="wrapper">
    <div
        class="wrapper-drawer"
        :class="{ 'wrapper-drawer--hidden': isVisible }"
    >
      <CustomDrawer/>
    </div>

    <div class="wrapper-main">
      <header class="header">
        <CustomHeader @toggle="toggledrawe" :title="currentUser.nombre +' - '+ currentUser.roll"
                      :subtitle="currentUser.email"/>
      </header>

      <div class="page">
        <RouterView/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  max-height: 100vh;

  &-drawer {
    width: 210px;

    &--hidden {
      display: none;
    }
  }

  &-main {
    width: 100%;
    height: 100vh;

    .page {
      padding: 1rem;
    }
  }

  @media (min-width: 1024px) {
    &-drawer {
      display: block;
      position: inherit;
    }
  }
}
</style>