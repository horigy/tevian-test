<template>
    <div class="auth-wrapper">
        <h1>Login</h1>

        <!-- login form -->
        <form @submit.prevent="onSubmit">

            <!-- email -->
            <div class="form-item" :class="{ errorInput: $v.email.$error }">
                <label>Email:</label>
                <p class="errorText" v-if="!$v.email.email"> Email is not correct!</p>
                <input
                    v-model="email"
                    :class="{ error: $v.email.$error }"
                    @change="$v.email.$touch()">
            </div>

            <!-- password -->
            <div class="form-item" :class="{ errorInput: $v.password.$error }">
                <label>Password</label>
                <p class="errorText" v-if="!$v.password.minLength"> Password must have at least {{ $v.password.$params.minLength.min }} !</p>
                <input
                    v-model="password"
                    :class="{ error: $v.password.$error }"
                    @change="$v.password.$touch()">
            </div>

            <!-- button -->
            <button>Log In</button>

            <!-- switch to registration -->
            <a @click="handleSwitch" class="switch">Registration</a>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
export default {
    data () {
        return {
        email: "",
        password: "",
        }
    },
    //validation settings
    validations: {
        email: {
        required,
        email
        },
        password: {
        required,
        minLength: minLength(6)
        },
    },
    methods: {
        //submit login form
        onSubmit () {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                const user = {
                email: this.email,
                password: this.password
                }
                console.log(user)

                axios.post('api/v1/login', user)
                    .then(
                        res => {
                            console.log(res)
                            localStorage.setItem('tevian-token', res.data.data.access_token)
                            localStorage.setItem('tevian-user', user.email)
                            this.$emit('login')
                            this.$router.push('/')
                        }
                    ).catch(
                        err => {
                            console.log(err)
                        }
                    )
                //reset data
                this.email = ''
                this.password = ''
                this.$v.$reset()
            }
        },
        //swtich to registration
        handleSwitch () {
            this.$router.push('registration')
            this.$v.$reset()
        }
    }
}
</script>
