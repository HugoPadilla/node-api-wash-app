<script setup>
import axios from "axios";
import Cookies from "js-cookie";
import {computed, ref} from "vue";
import CustomButton from "../components/CustomButton.vue";
import router from "../router";

const email = ref("");
const password = ref("");
const isError = ref(false)
const isLoading = ref(false);

const enableFormWithCredential = computed(() => {
  return email.value === "" || password.value === "";
})

async function login() {

  isLoading.value = true
  isError.value = false

  try {
    const body = {
      user: {
        email: email.value,
        password: password.value,
      },
    };

    const result = await axios.post(
        "https://washull.herokuapp.com/api/login",
        body
    );

    console.log(result);

    const clientString = JSON.stringify(result.data.data);

    Cookies.set("usuario", clientString);
    isLoading.value = false
    await router.push("/");
  } catch (error) {
    isLoading.value = false
    isError.value = true
    console.log(error);
  }
}

function navigateToRegister() {
  router.push("/register")
}

</script>

<template>
  <div class="login-page">
    <div class="constainer-imagen">
      <img
          src="../assets/images/img-wash-auto.png"
          alt="Imagen principal"
      />
    </div>

    <div class="container-formulario">
      <div class="wrapper-formulario">
        <img
            class="logo"
            src="../assets/images/logo.png"
            alt="Logo principal"
        />

        <div class="formulario-title">
          <h6>Login</h6>
          <p>Ingresa tus credenciales para ingresar a tu perfil</p>
        </div>

        <div id="algo" class="formulario">
          <form @submit.prevent="login">
            <label for="email">Correo electronico</label>
            <input
                id="email"
                type="email"
                placeholder="correo@emai.com"
                required
                v-model="email"
            />

            <label for="password">Constraseña</label>
            <input

                type="password"
                name="password"
                id="password"
                v-model="password"
            />

            <p class="message-error" v-if="isError">* Correo electronico o contraseña incorectas, revisa tu credenciales.</p>

            <CustomButton
                label="Iniciar sesion"
                :is-loading="isLoading"
                :is-disable="enableFormWithCredential"
                @click="login"
                style="width: 100%"
            />

            <div class="label-registro">
              <p>
                No tienes una cuenta aun?
                <span @click="navigateToRegister">Registrate aqui!</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  display: flex;
  flex-direction: row;
  height: 100%;

  .constainer-imagen {
    width: 50%;
    background-color: aqua;

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
    justify-content: center;
    padding: 2rem;
    width: 50%;
    margin: 0 auto;

    .wrapper-formulario {
      .logo {
        width: 100%;
        height: auto;
        max-width: 293.86px;
      }

      .formulario-title {
        margin: 2rem 0;

        h6 {
          font-size: var(--title1);
          margin: 0;
        }

        p {
          font-size: var(--subtitle1);
          margin: 0;
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

        .message-error {
          color: red;
          margin: 0 0 1rem;
        }

        .label-registro {
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
}
</style>
