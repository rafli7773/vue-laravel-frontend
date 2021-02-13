<template>
    <div id="card-post">
        <v-row>
        <template v-for="post in posts">
            <v-col cols="12" md="4" sm="6" :key="post.id">
            <v-card>
                <v-img height="250" :src="`http://localhost:8000${post.thumbnail}`"></v-img>
                <v-card-title>{{post.title}}</v-card-title>
                <v-card-text>
                    <div class="my-4 subtitle-1">
                        Waktu: {{post.postDate}}
                    </div>
                    <div>{{post.place}}.</div>
                </v-card-text>
                <v-card-actions class="d-flex justify-space-around">
                    <router-link class="text-decoration-none" :to="`/posts/${post.slug}/show`">
                    <v-btn color="yellow text--white">
                        Bergabung
                    </v-btn>
                    </router-link>
                    <DeletePost :slug="post.slug" @showSnackbar="handleShowSnackbar" />
                    <router-link class="text-decoration-none" :to="`/posts/${post.slug}/edit`">
                    <v-btn text color="green">
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    </router-link>
                </v-card-actions>
            </v-card>
        </v-col>
        </template>
    </v-row>
    </div>
</template>

<script>
import DeletePost from './Delete';
    export default {
        name: 'CardPost',
        props: ['posts'],
        components: {
            DeletePost
        },

        methods: {
            handleShowSnackbar(data){
                this.$emit('showSnackbar', data);
            }
        }
    }
</script>