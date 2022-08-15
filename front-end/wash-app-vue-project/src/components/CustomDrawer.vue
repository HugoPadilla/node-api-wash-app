<script setup>
import {computed, ref, watch, watchEffect} from "vue";
import {RouterLink} from "vue-router";
import Cookies from "js-cookie";
import axios from "axios";
import ItemDrawer from "./ItemDrawer.vue";
import router from "../router";
import {useStore} from "vuex";
const BASE_API = import.meta.env.VITE_API_ENDPOINT

const checkbox = ref(false);

const store = useStore()
const currentUser = computed(() => {
  return store.state.currentUser
})

watchEffect(() => {
  checkbox.value = currentUser.value.status
})

async function updateState() {
  try {
    const data = {
      state: checkbox.value,
      id_lavador: currentUser.value.id
    }

    const result = await axios.put(BASE_API + "lavador", data)

    store.commit("updateRollOfUser", {status: data.state})

    console.log(result)

  } catch (e) {
    console.error(e);
  }

}

function closeSession() {
  store.commit('removeCurrentUser')
  router.push('login')
}

</script>

<template>
  <div class="drawer">
    <img class="logo" src="../assets/images/logo.png" alt=""/>

    <div v-if="currentUser.roll === 'lavador'" class="disponibilidad">
      <div class="disponibilidad-label">
        <h5>Disponibilidad</h5>
        <h6>Establece si estas activos para lavar autos</h6>
      </div>

      <input
          v-model="checkbox"
          @change="updateState"
          class="checkbox"
          type="checkbox"
          name=""
          id=""
      />
    </div>

    <nav class="">
      <RouterLink to="/" class="col drawer__router_link">
        <ItemDrawer label="Inicio"/>
      </RouterLink>
      <ItemDrawer
          @click="closeSession"
          label="Cerrar sesion"
      />
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.drawer {
  background-color: var(--color-surface);
  border: 1px solid #d4e2f3;
  padding: 1rem;
  height: 100vh;

  .drawer__router_link {
    text-decoration: none;
  }

  .logo {
    width: 100%;
    margin-bottom: 1rem;
  }

  .disponibilidad {
    display: flex;
    margin: 2rem 0;

    h5 {
      margin: 0;
    }

    h6 {
      margin: 0;
    }

    .checkbox {
      display: inline-block;
      border-radius: 100%;
      width: 2.5rem;
    }
  }
}
</style>
