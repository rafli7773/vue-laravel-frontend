<template>
  <div id="detail-post">
    <v-container>
      <v-row>
        <h1>Detail</h1>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="12" md="8" sm="10">
          <template>
            <v-card class="mx-auto" max-width="500" :loading="loading">
              <v-img :lazy-src="`http://localhost:8000post.thumbnail}`" :src="`http://localhost:8000${post.thumbnail}`"
                height="200px"></v-img>
              <v-card-title>
                {{post.title}}
              </v-card-title>
              <v-card-subtitle>
                Waktu: {{post.postDate}}
              </v-card-subtitle>
              <v-card-text>
                Tempat: {{post.place}}
              </v-card-text>
              <v-card-actions>
                <v-btn :loading="btnLoading" :disabled="loadUser" v-if="loading ? '' : 'disable'" type="submit" @click.prevent="handleJoin">Gabung</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'DetailPost',

    data() {
      return {
        post: [],
        loadUser: true,
        loading: true,
        loggedIn: localStorage.getItem('loggedIn'),
        token: localStorage.getItem('token'),
        user: [],
        showSnackbar: {},
        btnLoading: false,
      }
    },

    created() {
      this.getPost();
      this.getUser();
    },

    methods: {
      async getPost() {
        try {
          let response = await axios.get(`http://localhost:8000/api/posts/${this.$route.params.postSlug}/show`);
          if (response.status === 200) {
            this.post = response.data;
            this.loading = false;
          } else {
            console.log(response)
          }
        } catch (error) {
          console.log(error)
        }
      },

      async getUser() {
        this.$emit('progressPost', true);
        axios.get(`http://localhost:8000/api/user`, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        }).then(response => {
          this.user = response.data;
          this.$emit('progressPost', false);
          this.loadUser = false;
        })
      },

      async handleJoin(){
        if(!this.loggedIn){
          this.$router.push({name: 'Login'});
        }else{
          this.btnLoading = true;
          let formData = {
            user_id: this.user.id,
            post_id: this.post.id
          }
          try {
            let response = await axios.post('http://localhost:8000/api/join/create', formData);
            if(response.status === 200){
              this.btnLoading = false;
              this.$emit('showSnackbar', this.showSnackbar = {
                snackbar: true,
                color: 'green',
                text: response.data.message
              })
              this.$router.push({name: 'JoinPost'})
            }else{
              console.log(response);
            }
          } catch (error) {
            this.$emit('showSnackbar', this.showSnackbar = {
              snackbar: true,
              color: 'yellow darken-4',
              text: 'Anda sudah bergabung'
            })
            this.btnLoading = false;
          }
        }
      }
    }

  }
</script>