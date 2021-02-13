<template>
<div id="header">
        <v-navigation-drawer v-model="drawer" app class="blue darken-2 white--text">
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title white--text">
                        Application
                    </v-list-item-title>
                    <v-list-item-subtitle class="white--text">
                        subtext
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense nav>
                <v-list-item v-for="item in items" :key="item.title" link router :to="item.path">
                    <v-list-item-icon>
                        <v-icon class="white--text">{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <AppBar @toggle="toggle" />
        </div>
</template>

<script>
import AppBar from './AppBar';
    export default {
        name: 'NavigationDrawer',
        components: {AppBar},
        data() {
            return {
                drawer: false,
                items: [{
                        title: 'Posts',
                        icon: 'mdi-view-dashboard',
                        path: '/posts'
                    },
                    {
                        title: 'Join',
                        icon: 'mdi-image',
                        path: '/join'
                    },
                ],
                right: null,
            }
        },
        methods: {
            toggle(){
                this.drawer = !this.drawer;
            }
        }
    }
</script>