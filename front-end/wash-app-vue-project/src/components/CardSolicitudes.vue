<script setup>
import moment from "moment";
import {computed, ref} from "vue";

const props = defineProps({
  solicitud: {
    id: -1,
    id_cliente: -1,
    id_lavador: null,
    fecha_solicitud: "",
    fecha_lavado: "",
    estado: "completado",
    type_auto: "",
    placa: ""
  },
  accessForUpdateState: Boolean
});

const showMenu = ref(false);

const classColor = computed(() => {
  switch (props.solicitud.estado) {
    case "pendiente":
      return "card__status--pendiente";
      break;
    case "asignado":
      return "card__status--asignado";
      break;
    case "encurso":
      return "card__status--encurso";
      break;
    case "completado":
      return "card__status--completado";
      break;
  }
})

const classCircleColor = computed(() => {
  return classColor.value.replace("card__status", "card__status__circle");
})

function formatFecha() {
  return moment(props.solicitud.fecha_lavado).format(
      "MMMM Do YYYY"
  );
}

function showMenuWithAccess() {
  if (props.accessForUpdateState) {
    showMenu.value = !showMenu.value
  } else  {
    showMenu.value = false;
  }
}

</script>

<template>
  <div class="card">
    <div class="card__info">
      <h4 class="card__info-subtitle1">Lavador para: {{ solicitud.type_auto }} - {{ solicitud.placa }}</h4>
      <h6 class="card__info-subtitle2">{{ formatFecha() }}</h6>
    </div>

    <div @click="showMenuWithAccess" class="card__status" :class="classColor">
      <div class="card__status__circle" :class="classCircleColor"></div>
      <p style="user-select: none;">{{ solicitud.estado }}</p>

      <div v-if="showMenu" class="card__status__menu">
        <ul>
          <li @click="$emit('updateStatus', solicitud.id, 'encurso')" class="menu--encurso">En curso</li>
          <li @click="$emit('updateStatus', solicitud.id, 'completado')" class="menu--completado">Completado</li>
        </ul>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  margin-bottom: 1rem;
  border: 1px solid var(--color-surface-variant);
  border-radius: 5px;
}

.card__info {
  display: flex;
  flex-direction: column;

  &-subtitle1 {
    margin: 0;
  }

  &-subtitle2 {
    margin: 0;
  }
}

.card__status {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  gap: 4px;
  background: #fffdc8;
  border-radius: 100px;

  &__menu {
    position: absolute;
    top: 2rem;
    background: var(--color-surface);
    padding: 0 1rem;
    border-radius: .5rem;
    -webkit-box-shadow: 0 18px 35px -11px rgba(125, 128, 150, 0.51);
    -moz-box-shadow: 0 18px 35px -11px rgba(125, 128, 150, 0.51);
    box-shadow: 0 18px 35px -11px rgba(125, 128, 150, 0.51);

    ul {
      list-style: none;
      padding: 0;
    }

    li {
      cursor: pointer;
      padding: .3rem 1rem;
      font-size: 1rem;
      font-weight: 600;
      background: #37d0f6;
      border-radius: .5rem;
      margin-bottom: 5px;


    }

    .menu--encurso {
      background: #C8E2FF;
      color: #0059C1;
    }

    .menu--completado {
      background: #C8FFCD;
      color: #013906;
    }
  }

  p {
    margin: 0;
  }

  &__circle {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #F8F007;

    &--pendiente {
      background: #F8F007;
    }

    &--asignado {
      background: #37D0F6;
    }

    &--encurso {
      background: #3790F6;
    }

    &--completado {
      background: #37F64A;
    }
  }

  &--pendiente {
    background: #FFFDC8;

    p {
      color: #464400;
    }
  }

  &--asignado {
    background: #C8F4FF;

    p {
      color: #004E62;
    }
  }

  &--encurso {
    background: #C8E2FF;

    p {
      color: #0059C1;
    }
  }

  &--completado {
    background: #C8FFCD;

    p {
      color: #013906;
    }
  }

}
</style>
