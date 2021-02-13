<template>
    <div id="join-post">
        <v-container>
            <h1>Join</h1>
            <v-row>
                <template v-for="post in posts">
                    <v-col cols="12" md="4" sm="6" :key="post.id">
                        <template>
                            <v-card class="mx-auto" max-width="344">
                                <v-img :lazy-src="`http://localhost:8000${post.thumbnail}`" :src="`http://localhost:8000${post.thumbnail}`" height="200px"></v-img>
                                <v-card-title>{{post.title}}</v-card-title>
                                <v-card-subtitle>{{post.postDate}}</v-card-subtitle>
                                <v-card-text>{{post.place}}</v-card-text>
                                <v-card-actions>
                                <v-btn disabled>Telah Bergabung</v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </v-col>
                </template>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'JoinPost',
        data() {
            return {
                loggedIn: localStorage.getItem('loggedIn'),
                token: localStorage.getItem('token'),
                user: [],
                showSnackbar: {},
                posts: []
            }
        },

        mounted() {
            if (!localStorage.getItem('loggedIn')) {
                this.$emit('showSnackbar', this.showSnackbar = {
                    snackbar: true,
                    color: 'red',
                    text: 'Login dulu'
                })
                this.$router.push({
                    name: 'Login'
                });
            }
        },

        created() {
            this.$emit('progressPost', true);
            axios.get(`http://localhost:8000/api/user`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            }).then(response => {
                this.user = response.data;
                this.getPosts();
            })
        },

        methods: {
            async getPosts() {
                let response = await axios.get(`http://localhost:8000/api/join/${this.user.id}/show`);
                if (response.status === 200) {
                    this.posts = response.data[0].posts;
                    this.$emit('progressPost', false);
                }
            }
        }
    }
</script>