<template>
    <div id="delete-post">
        <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="red" text v-bind="attrs" v-on="on" ref="deleteElement">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </template>

            <v-card>
                <v-card-title>
                    Hapus Data
                </v-card-title>

                <v-card-text>
                    Yakin hapus data?
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">
                        Batal
                    </v-btn>
                    <v-btn color="red" :loading="loading" text @click="destroy">
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
        name: 'DeletePost',
        props: ['slug'],
        data() {
            return {
                dialog: false,
                loading: false,
                showSnackbar: {}
            }
        },
        methods: {
            destroy() {
                this.loading= true;
                let nodeElement = this.$refs.deleteElement.$refs.link;
                axios.delete(`http://localhost:8000/api/posts/${this.slug}/delete`).then(async response => {
                    this.$emit('showSnackbar', this.showSnackbar = {
                        snackbar: true,
                        color: 'green',
                        text: response.data.message
                    })
                    this.loading = false;
                    await nodeElement.parentNode.parentNode.parentNode.parentNode.remove();
                    this.dialog = false;
                })
            }
        }
    }
</script>