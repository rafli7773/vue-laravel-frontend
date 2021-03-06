<template>
    <div id="create-post">
        <v-container>
            <v-form v-model="valid" ref="form" enctype="multipart/form-data">
                <v-row class="justify-center">
                    <v-col cols="12" sm="10" md="8">
                        <v-text-field label="Judul" v-model="form.title" placeholder="Contoh Judul" outlined
                            :rules="titleRules"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="10" md="8">
                        <v-text-field label="Tempat" placeholder="Jakarta" outlined v-model="form.place"
                            :rules="placeRules"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="10" md="8">
                        <v-dialog ref="dialog" v-model="modal" :return-value.sync="form.postDate" persistent width="290px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="form.postDate" label="Picker in dialog" prepend-icon="mdi-calendar"
                                    readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="form.postDate" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="modal = false">
                                    Cancel
                                </v-btn>
                                <v-btn text color="primary" @click="$refs.dialog.save(form.postDate)">
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-dialog>
                    </v-col>
                    <v-col cols="12" md="8" sm="8">
                        <template>
                            <v-file-input @change="imageSelected" :rules="thumbnailRules" accept="image/png, image/jpeg, image/bmp"
                                label="Upload Gambar" prepend-icon="mdi-camera"></v-file-input>
                        </template>
                    </v-col>
                    <v-col cols="12" md="8" sm="8" v-if="imagePreview">
                        <v-img :lazy-src="imagePreview" max-height="150" max-width="250" v-model="form.thumbnail"
                            :src="imagePreview"></v-img>
                    </v-col>
                    <v-col cols="12" md="8" sm="8">
                        <v-btn type="submit" @click.prevent="store" :loading="loading">Buat</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-container>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'CreatePost',
        data: () => ({
            loading: false,
            imagePreview: null,
            form: {
                title: '',
                place: '',
                postDate: new Date().toISOString().substr(0, 10),
                thumbnail: null
            },
            titleRules: [
                v => !!v || 'Judul harus di isi',
                v => v.length <= 50 || 'Judul harus kurang dari 50 karakter'
            ],
            placeRules: [
                v => !!v || 'Tempat harus di isi',
                v => v.length <= 70 || 'Tempat harus kurang dari 70 karakter'
            ],
            thumbnailRules: [
                value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
            ],
            valid: true,
            modal: false,
        }),

        methods: {
            async store() {
                this.loading = true;
                const formData = new FormData;
                formData.set('thumbnail', this.form.thumbnail);
                formData.set('title', this.form.title);
                formData.set('place', this.form.place);
                formData.set('postDate', this.form.postDate);                try {
                    let response = await axios.post(`http://localhost:8000/api/posts/create`, formData);
                    if(response.status === 200){
                        this.loading = false;
                        this.$router.push({
                            name: 'Posts',
                            params: {
                                showSnackbar: {
                                    snackbar: true,
                                    color: 'green',
                                    text: response.data.message
                                }
                            }
                        })
                    }
                } catch (error) {
                    console.log(error)
                    this.loading = false;
                }
            },

            imageSelected(e){
                this.form.thumbnail = e
                let reader = new FileReader();
                reader.readAsDataURL(this.form.thumbnail);
                reader.onload = e => {
                    this.imagePreview = e.target.result;
                }
            }
        },
        
        mounted(){
            this.$emit('progressPost', false);
        }
    }
</script>

<style>

</style>