<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {RouterLink} from "vue-router";
import Cookies from "js-cookie";
import axios from "axios";
import ItemDrawer from "./ItemDrawer.vue";
import router from "../router";

const checkbox = ref(false);
const rollCurrentUser = ref("");

onMounted(() => {
  const cookiesUser = Cookies.get("usuario");
  const currentUser = JSON.parse(cookiesUser);

  checkbox.value = currentUser.status
  rollCurrentUser.value = currentUser.roll
});

watch(checkbox, (e) => {
  if(rollCurrentUser.value === "lavador") updateState(checkbox.value)
});

async function updateState(newState) {

  try {

    const cookiesUser = Cookies.get("usuario");
    const currentUser = JSON.parse(cookiesUser);

    const data = {
      state: newState,
      id_lavador: currentUser.id
    }

    const result = await axios.put(import.meta.env.VITE_API_ENDPOINT + "lavador", data)

    currentUser.status = newState;
    const currentUserString = JSON.stringify(currentUser);
    Cookies.set("usuario", currentUserString)

    console.log(result)

  } catch (e) {
    console.error(e);
  }

}

async function closeSession() {
  await Cookies.remove('usuario');
  await router.push('login')
}

</script>

<template>
  <div class="drawer">
    <img class="logo" src="../assets/images/logo.png" alt=""/>

    <div v-if="rollCurrentUser === 'lavador'" class="disponibilidad">
      <div class="disponibilidad-label">
        <h5>Disponibilidad</h5>
        <h6>Establece si estas activos para lavar autos</h6>
      </div>

      <input
          v-model="checkbox"
          class="checkbox"
          type="checkbox"
          name=""
          id=""
      />
    </div>

    <nav class="">
      <RouterLink to="/" class="col drawer__router_link">
        <ItemDrawer label="Inicio" icon="src/assets/icon/icon-menu.svg"/>
      </RouterLink>
      <RouterLink to="/activity" class="drawer__router_link">
        <ItemDrawer
            label="Activida"
            icon="src/assets/icon/icon-menu.svg"
        />
      </RouterLink>
      <ItemDrawer
          @click="closeSession"
          label="Cerrar sesion"
          icon="src/assets/icon/icon-arrow-left-circle.svg"
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
