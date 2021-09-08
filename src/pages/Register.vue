<template>

    <!-- Message modal -->
    <Modal v-if="created" :created="created" @fail="retry()"/>

    <div v-else class="auth-wrapper">
        <h1>Registration</h1>

        <!-- registration form -->
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

            <!-- check password -->
            <div class="form-item" :class="{ errorInput: $v.passwordCheck.$error }">
                <label>Check Password</label>
                <p class="errorText" v-if="!$v.passwordCheck.sameAsPassword"> Password is not correct!</p>
                <input
                    v-model="passwordCheck"
                    :class="{ error: $v.passwordCheck.$error }"
                    @change="$v.passwordCheck.$touch()">
            </div>

            <!-- button -->
            <button>Sign Up</button>

            <!-- switch to login-->
            <a @click="handleSwitch" class="switch">I have an account</a>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
import Modal from '@/components/Modal'
export default {
    components: {
        Modal
    },
    data () {
        return {
            email: "",
            password: "",
            passwordCheck: "",
            created: ""
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
        passwordCheck: {
        required,
        sameAsPassword: sameAs("password")
        }
    },
    methods: {
        // submit modal
        onSubmit () {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                const newUser = {
                    "billing_type": "demo",
                    "data": {},
                    "email": this.email,
                    "password": this.password
                }
                console.log(newUser)

                axios.post('api/v1/users', newUser)
                    .then(
                        res => {
                            console.log(res)
                            this.created = 'success'
                        }
                    ).catch(
                        err => {
                            console.log(err)
                            this.created = 'fail'
                        }
                    )

                //reset data
                this.email = ""
                this.password = ""
                this.passwordCheck = ""
                this.$v.$reset()
            }
        },
        //switch to login
        handleSwitch () {
            this.$router.push('login')
            this.$v.$reset()
        },
        //registration fail
        retry() {
            this.created = ''
        }
    }
}
</script>
