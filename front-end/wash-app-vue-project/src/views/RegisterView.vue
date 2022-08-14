<script setup>
import {computed, ref} from "vue";
import {useStore} from "vuex";
import axios from "axios";
import router from "../router";
import CustomButton from "../components/CustomButton.vue";

const store = useStore();

const name = ref("");
const last_name = ref("");
const email = ref("");
const password = ref("");
const type_user = ref("");
const showTypeAccount = ref(false)

const isLoading = ref(false)

const enableFormWithCredential = computed(() => {
  return name.value === "" || last_name.value === "" || email.value === "" || password.value === "" || type_user.value === ""
})

const messageError = ref('')

function setTypeAccount (value) {
  type_user.value = value
  showTypeAccount.value = false
}

async function register() {
  messageError.value = ""
  isLoading.value = true

  try {
    const result = await axios.post("https://washull.herokuapp.com/api/signin", {
      roll: type_user.value,
      user: {
        name: name.value,
        last_name: last_name.value,
        email: email.value,
        password: password.value,
      },
    });

    isLoading.value = false

    const payload = {
      currentUser: result.data.data
    }

    store.commit('setCurrentUser', payload)

    await router.push({name: 'home'})

  } catch (error) {
    messageError.value = "No fue posible crear esta cuenta. Intenta nuevamente."
    isLoading.value = false
    console.log(error);
  }
}


function navigateToLogin() {
  router.push("/login")
}

</script>

<template>
  <div class="register-view">
    <div class="container-imagen">
      <img src="../assets/images/img-wash-auto.png" alt="Lavando auto"/>
    </div>

    <div class="container-formulario">
      <div class="wrapper-form">
        <img
            src="../assets/images/logo.png"
            alt="Logo principal"
            class="logo"
        />

        <div class="wrapper-title">
          <h2>Crear cuenta</h2>
          <p>Registra tu datos para crear una nueva cuenta en Wash</p>
        </div>

        <form @submit.prevent="register">
          <label for="name">Nombres</label>
          <input type="text" name="name" id="name" v-model="name"/>

          <label for="last_name">Apellidos</label>
          <input
              type="text"
              name="last_name"
              id="last_name"
              v-model="last_name"
          />

          <label for="email">Correo electronico</label>
          <input
              type="email"
              name="email"
              id="email"
              v-model="email"
          />

          <label for="password">Contraseña</label>
          <input
              type="password"
              name="password"
              id="password"
              v-model="password"
          />

          <label for="type-profile">Tipo de perfil</label>
          <div class="dropdown" style="width: 100%">
            <input
                type="text"
                name="type-profile"
                id="type-profile"
                v-model="type_user"
                readonly
                @click="showTypeAccount = true"
                placeholder="Seleciona una opcion"
            />

            <div v-if="showTypeAccount" class="dropdown-content">
              <p @click="setTypeAccount('cliente')">Cliente</p>
              <p @click="setTypeAccount('lavador')">Lavador</p>
            </div>
          </div>

          <p class="form__message-error" v-if="messageError">{{ messageError }}</p>

          <CustomButton
              label="Registrarse"
              :is-loading="isLoading"
              :is-disable="enableFormWithCredential"
              style="width: 100%"
          />

          <div class="label-login">
            <p>
              Ya estas registado?
              <span @click="navigateToLogin">Inicia sesion!</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.register-view {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
}

.container-imagen {
  height: 100%;
  width: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.container-formulario {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  width: 50%;
  margin: 0 auto;

  .wrapper-form {
    .logo {
      width: 100%;
      min-height: auto;
      max-width: 293.86px;
      max-height: 92px;
    }

    .wrapper-title {
      h2 {
        margin: 0;
      }

      p {
        margin: 0 0 2rem;
      }
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;

      label {
        font-size: var(--subtitle1);
        font-weight: 500;
        color: var(--color-on-background);
        margin: 0 0 0.2rem;
      }

      input {
        width: 90%;
        max-width: 90%;
        padding: 0.8em 1rem;
        margin: 0 0 1rem;
        border: 1px solid #d9d9d9;
        border-radius: 5px;
      }

      .dropdown {
        position: relative;
        display: inline-block;
        padding-bottom: 1.5rem;

        input {
          margin-bottom: 0;
          text-transform: capitalize;
        }

        &-content {
          position: absolute;
          width: 90%;
          border-radius: 5px;
          background-color: var(--color-background);
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);

          p {
            padding: 1rem 2rem;

            &:hover{
              background-color: var(--color-surface-variant);
              color: var(--color-on-background);
            }
          }
        }
      }

      .form__message-error {
        margin-bottom: 1rem;
        color: red;
      }

      .label-login {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-top: 1rem;

        span {
          cursor: pointer;
          color: var(--color-primary);
          margin-left: 0.3rem;
          padding: 0.5rem 0;
        }
      }
    }
  }
}
</style>
