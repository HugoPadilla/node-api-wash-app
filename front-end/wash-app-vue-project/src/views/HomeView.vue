<script setup>
import axios from "axios";
import Cookies from "js-cookie";
import {computed, onMounted, ref} from "vue";

import CustomBanner from "../components/CustomBanner.vue";
import CardSolicitudes from "../components/CardSolicitudes.vue";
import CustomButton from "../components/CustomButton.vue";
import NuewSolicitud from "../components/dialog/NuewSolicitud.vue";
import EmptySolicituded from "../components/EmptySolicituded.vue";
import {useStore} from "vuex";

const BASE_URL_API = import.meta.env.VITE_API_ENDPOINT;

const store = useStore()

const currentUser = computed(() => {
  return store.state.currentUser
})

const solicitudes = ref([]);

let showFormSolicitude = ref(false);

const isSolicitudeEmpty = computed(() => solicitudes.value.length === 0)

const showButtonNewSolicitude = computed(() => {
  return currentUser.value.roll === 'cliente' && !isSolicitudeEmpty.value;
})

onMounted(() => {
  getSolicitudes();
});

async function getSolicitudes() {

  solicitudes.value = [];

  const result = await axios.get(BASE_URL_API + "solicitudes", {
    params: {
      id_owner: currentUser.value.id,
      roll: currentUser.value.roll
    },
  });

  solicitudes.value = result.data.solicitudes;
}

/**
 * Llamada a la api para actualizar el estado del lavador.
 *
 * @returns {Promise<void>}
 * @param idSolicitude
 * @param newState
 */
async function updateStateSolicitude(idSolicitude, newState) {
  console.log("Update solicitude: " + idSolicitude + newState)

  try {
    const config = {
      params: {
        id: idSolicitude,
        state: newState
      }
    }

    const result = await axios.put(BASE_URL_API + "solicitudes", null, config);
    console.info(result);
    await getSolicitudes();

  } catch (e) {
    console.warn(e)
  }

}

function closeDialog() {
  showFormSolicitude.value = false
  getSolicitudes()
}

</script>

<template>
  <div class="home-view">
    <CustomBanner/>

    <div class="wrapper-title">
      <h2 class="wrapper-title__label">
        Seguimiento de lavados
      </h2>
      <CustomButton
          v-if="showButtonNewSolicitude"
          v-on:click="showFormSolicitude = true"
          label="Nueva solicitud"
          :is-loading="false"
      />
    </div>

    <div class="container">
      <div v-for="solicitude in solicitudes">
        <CardSolicitudes
            @updateStatus="updateStateSolicitude"
            :solicitud="solicitude"
            :access-for-update-state="currentUser.roll === 'lavador'"
        />
      </div>

      <EmptySolicituded
          v-if="isSolicitudeEmpty"
          @openForm="showFormSolicitude = true"
      />
    </div>

    <NuewSolicitud
        v-if="showFormSolicitude"
        @closeDialog="closeDialog"
        class="form-solicitude"
    />
  </div>

</template>

<style lang="scss" scoped>
.home-view {
  .form-solicitude {
    position: fixed;
    top: 20vh;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
}

.wrapper-title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;

  &__label {
    margin: 0;
  }
}
</style>
