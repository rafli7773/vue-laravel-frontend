<template>
    <v-app-bar app class="blue darken-2 white--text ">
        <v-app-bar-nav-icon class="white--text" @click="toggle"></v-app-bar-nav-icon>
        <v-app-bar-title>Logo</v-app-bar-title>
        <v-spacer></v-spacer>
        <router-link to="/login" class="text-decoration-none" v-if="!loggedIn">
            <v-btn text class="white--text">Login</v-btn>
        </router-link>
        <router-link to="/register" class="text-decoration-none" v-if="!loggedIn">
            <v-btn text class="white--text">Daftar</v-btn>
        </router-link>
        <DialogLogout v-if="loggedIn" />
    </v-app-bar>
</template>

<script>
    import DialogLogout from './DialogLogout';
    export default {
        name: 'AppBar',
        components: {
            DialogLogout
        },
        data() {
            return {
                loggedIn: null,
                loading: false,
            }
        },
        methods: {
            toggle() {
                this.$emit('toggle');
            },
            getLoggedIn() {
                this.loggedIn = localStorage.getItem('loggedIn')
            },

        },

        watch: {
            $route: {
                inmediate: true,
                handler() {
                    this.getLoggedIn()
                }
            }
        }
    }
</script>