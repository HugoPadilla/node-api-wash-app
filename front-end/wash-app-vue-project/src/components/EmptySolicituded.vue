<script setup>
import CustomButton from "./CustomButton.vue";
import {computed, onMounted} from "vue";
import {useStore} from "vuex";

const store = useStore()

const currentUser = computed(() => store.state.currentUser)

const infoEmptyWithRoll = computed(() => {

  let info = {
    title: "",
    label: "",
    isVisible: false
  }

  switch (currentUser.value.roll) {
    case "cliente":
      info = {
        title: "¡Programa tu primer lavado!",
        label: "Aqui veras el progreso de tu lavado. Solicita tu primer lavado de auto",
        isVisible: true
      }
      break;
    case "lavador":
      info = {
        title: "¡Gestiona tu solicitudes de lavado!",
        label: "Aqui veras tu solicitudes asignadas y actualizar el estado del cada una de ellas.",
        isVisible: false
      }
      break;
  }

  return info;
})

</script>

<template>
  <div class="empty">
    <img class="empty__image" src="@/assets/images/img-customer.png" alt="Lavar tu auto">
    <h5 class="empty__title">{{ infoEmptyWithRoll.title }}</h5>
    <p class="empty__text">{{ infoEmptyWithRoll.label }}</p>
    <CustomButton v-if="infoEmptyWithRoll.isVisible" @click="$emit('openForm')" class="empty__button"
                  label="Nueva solicitud"/>
  </div>
</template>

<style lang="scss" scoped>
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__image {

  }

  &__title {
    margin: 0;
    font-size: var(--title4);
  }

  &__text {
    font-size: var(--subtitle2);
    margin: 1rem 0 2rem;
  }

}
</style>