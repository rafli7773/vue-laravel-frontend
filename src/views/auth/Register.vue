<template>
    <div id="register">
        <v-row class="d-flex justify-center mt-3">
            <v-col cols="12" md="6" sm="10">
                <v-card elevation="2">
                    <v-card-title>Daftar</v-card-title>
                    <v-form v-model="valid" ref="form">
                        <v-row class="px-6">
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field append-icon="mdi-email" :rules="emailRules" label="Email"
                                    v-model="form.email" autofocus placeholder="example@gmail.com">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field append-icon="mdi-account" :rules="nameRules" v-model="form.name"
                                    label="Username" placeholder="John Doe">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field append-icon="mdi-lock" type="password" v-model="form.password"
                                    label="Password" :rules="passwordRules">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field append-icon="mdi-lock" type="password" v-model="form.confirmPassword"
                                    :rules="confirmPasswordRules" label="Konfirmasi Password">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-btn type="submit" @click.prevent="store" :loading="loading">Daftar</v-btn>
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
        name: 'Register',
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
                    name: "",
                    password: "",
                    confirmPassword: "",
                },
                nameRules: [
                    v => !!v || 'Nama Harus di isi',
                    v => (v && v.length >= 3) || 'Nama harus lebih dari tiga karakter',
                ],
                emailRules: [
                    v => !!v || 'E-mail harus di isi',
                    v => /.+@.+\..+/.test(v) || 'E-mail tidak valid',
                ],
                passwordRules: [
                    v => !!v || 'Password harus di isi',
                    v => (v && v.length >= 6) || 'Password harus lebih dari 6 karakter',
                    v => v !== this.confirmPassword || 'Password tidak sama',
                ],
                confirmPasswordRules: [
                    v => !!v || 'Password harus di isi',
                    v => (v && v.length >= 6) || 'Password harus lebih dari 6 karakter',
                ],
            }
        },

        methods: {
            store() {
                this.loading = true;
                if (this.$refs.form.validate()) {
                    if (this.form.password !== this.form.confirmPassword) {
                        this.showSnackbar = {
                            snackbar: true,
                            color: 'red',
                            text: 'Password tidak sama'
                        }
                        this.form.password = '';
                        this.form.confirmPassword = '';
                        this.loading = false;
                    } else {
                        axios.post('http://localhost:8000/api/register', this.form).then(response => {
                            this.loading = false;
                            this.$emit('showSnackbar', {
                                snackbar: true,
                                color: 'green',
                                text: response.data.message
                            })
                            this.$router.push({name: 'Login'});
                        }).catch(error => {
                            console.log(error)
                            this.loading = false;
                        });
                    }
                }else{
                    this.loading = false;
                }
            },
        }

    }
</script>