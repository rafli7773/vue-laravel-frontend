<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="white--text" v-bind="attrs" v-on="on" text>Logout</v-btn>
            </template>

            <v-card>
                <v-card-title>
                    Logout
                </v-card-title>

                <v-card-text>
                    Yakin Logout
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">
                        Batal
                    </v-btn>
                    <v-btn color="green" text @click="logout" :loading="loading">
                        Yakin
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        data() {
            return {
                dialog: false,
                loading: false
            }
        },

        methods: {
            logout() {
                this.loading = true;
                axios.get('http://localhost:8000/api/logout').then(() => {
                    localStorage.removeItem('loggedIn');
                    this.loading = false;
                    return this.$router.push({
                        name: 'Login'
                    });
                })
            }
        }
    }
</script>