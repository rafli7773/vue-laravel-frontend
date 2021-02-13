<template>
    <div id="login">
        <v-row class="d-flex justify-center mt-3">
            <v-col cols="12" md="6" sm="10">
                <v-card elevation="2">
                    <v-card-title>Login</v-card-title>
                    <v-form v-model="valid" ref="form">
                        <v-row class="px-6">
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field append-icon="mdi-email" :rules="emailRules" label="Email"
                                    v-model="form.email" autofocus placeholder="example@gmail.com">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field append-icon="mdi-lock" type="password" v-model="form.password"
                                    label="Password" :rules="passwordRules">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-btn type="submit" @click.prevent="store" :loading="loading">Login</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
        <Snackbar :showSnackbar="showSnackbar" />
    </div>
</template>

<script>
    import Snackbar from '../../components/Snackbar';
    import axios from 'axios';
    export default {
        name: 'Login',
        components: {
            Snackbar
        },

        data() {
            return {
                loading: false,
                showSnackbar: {},
                valid: true,
                form: {
                    email: "",
                    password: "",
                },
                emailRules: [
                    v => !!v || 'E-mail harus di isi',
                    v => /.+@.+\..+/.test(v) || 'E-mail tidak valid',
                ],
                passwordRules: [
                    v => !!v || 'Password harus di isi',
                    v => (v && v.length >= 6) || 'Password harus lebih dari 6 karakter',
                ],

                loggedIn: localStorage.getItem('loggedIn'),
                token: localStorage.getItem('token'),
                loggedInFailed: null,
                user: []
            }
        },

        methods: {
            store() {
                this.loading = true;
                if (this.$refs.form.validate()) {
                    axios.get('http://localhost:8000/sanctum/csrf-cookie').then(async () => {
                        try {
                            const response = await axios.post('http://localhost:8000/api/login', {
                                email: this.form.email,
                                password: this.form.password
                            })
                            if (response.data.success) {
                                localStorage.setItem('loggedIn', 'true')
                                localStorage.setItem('token', response.data.token)
                                this.loggedIn = true
                                this.loading = false;
                                return this.$router.push({
                                    name: 'JoinPost'
                                });
                            } else {
                                this.loginFailed = true
                                this.loading = false;
                                this.form.password = '';
                            }
                        } catch (error) {
                            this.showSnackbar = {
                                snackbar: true,
                                color: 'red',
                                text: error.response.data.message
                            }
                            this.loading = false;
                            this.form.password = '';
                        }
                    }).catch((error) => {
                        this.loading = false
                        this.showSnackbar = {
                            snackbar: true,
                            color: 'red',
                            text: error.response.data.message
                        }
                        this.loading = false;
                        this.form.password = '';
                    });
                } else {
                    this.loading = false;
                }
            },
        },

        mounted() {
            if (this.loggedIn) {
                return this.$router.push({
                    name: 'JoinPost'
                });
            }
            this.$emit('progressPost', false);
        },

    }
</script>