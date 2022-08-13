<script setup>

import CustomButton from "../CustomButton.vue";
import Cookies from "js-cookie";
import axios from "axios";
import moment from "moment";
import {computed, ref, } from "vue";



const date = ref(moment().format());
// Variables del formulario
const fechaLavado = ref(date.value);
const typeAuto = ref("");
const placaAuto = ref("");

const isLoading = ref(false);

const isDisableButton = computed(() => {
  return fechaLavado.value === "" || typeAuto.value === "" || placaAuto.value === ""
});

const showError = ref(false)

const emit = defineEmits(["closeDialog"])

async function sendNewSolicitud() {

  isLoading.value = true

  console.log(date)
  console.log(fechaLavado.value)

  try {
    const cookies = Cookies.get("usuario");
    const currentUser = JSON.parse(cookies);

    const data = {
      solicitud: {
        id_cliente: currentUser.id,
        fecha_creacion: date.value, // Fecha actual
        fecha_lavado: fechaLavado.value, // Fecha del lavado del auto
        type_auto: typeAuto.value, // Info del form
        placa: placaAuto.value // Info del form
      }
    }

    const result = await axios.post(import.meta.env.VITE_API_ENDPOINT + "solicitudes", data)
    isLoading.value = false;
    showError.value = false
    await emit("closeDialog")


  } catch (e) {
    isLoading.value = false;
    showError.value = true;
    console.log(e)
  }

}


</script>

<template>
  <form @submit.prevent="sendNewSolicitud">

    <img @click="$emit('closeDialog')" class="icon-close" src="@/assets/icon/icon-close.svg">

    <h4 class="title">Formulario de nueva solicitud</h4>

    <label for="date">Fecha de lavado</label>
    <input id="date" type="date" required v-model="fechaLavado">

    <label for="type_auto">Tipo de auto</label>
    <input id="type_auto" type="text" required v-model="typeAuto">

    <label for="placa_auto">Placa del vehiculo</label>
    <input id="placa_auto" type="text" required v-model="placaAuto">

    <p v-if="showError">Ocurrio un error. Intenta nueva mente.</p>

    <CustomButton label="Registrar solicitud" :is-loading="isLoading" :is-disable="isDisableButton"/>
  </form>

</template>

<style lang="scss" scoped>

.title {
  margin: 0 0 1rem;
}

form {
  display: flex;
  flex-direction: column;
  width: 400px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-surface-variant);
  border-radius: 5px;
  padding: 1.5rem 2rem;

  .icon-close {
    width: 24px;
    padding: .5rem;
    flex-basis: 50%;
    align-self: end;
  }

  label {
    width: 100%;
    margin-bottom: .5rem;
    font-size: var(--subtitle1);
  }

  input {
    border: 1px solid var(--color-surface-variant);
    padding: .6rem 1rem;
    margin: 0 0 1rem;
  }

  p {
    color: red;
    margin: 0 0 1rem;
  }
}

</style>