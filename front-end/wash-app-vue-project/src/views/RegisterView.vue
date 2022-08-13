<script setup>
import axios from "axios";
import Cookies from "js-cookie";
import { ref } from "vue";
import CustomButton from "../components/CustomButton.vue";
import router from "../router";

const name = ref("");
const last_name = ref("");
const email = ref("");
const password = ref("");
const type_user = ref("");

async function register() {
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

        console.log(result);
        
        const clientString = JSON.stringify(result.data.data);

        Cookies.set("usuario", clientString);

        router.push("/")


    } catch (error) {
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
            <img src="../assets/images/img-wash-auto.png" alt="Lavando auto" />
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

                <form action @submit.prevent="register">
                    <label for="name">Nombres</label>
                    <input type="text" name="name" id="name" v-model="name" />

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
                    <input
                        type="text"
                        name="type-profile"
                        id="type-profile"
                        v-model="type_user"
                    />

                    <CustomButton
                        @click="register"
                        label="Registrarse"
                        style="width: 80%"
                    />

                     <div class="label-login">
                            <p>
                                No tienes una cuenta aun?
                                <span @click="navigateToLogin" >Registrate aqui!</span>
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

            .label-login {
                    display: flex;
                    justify-content: center;
                    width: 100%;

                    p {
                    }

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
