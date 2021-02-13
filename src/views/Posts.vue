<template>
  <div class="posts">
    <v-container>
      <div class="row mb-3">
        <v-col cols="12" md="4" sm="4">
          <router-link class="text-decoration-none" to="/posts/create">
            <v-btn class="blue white--text">Buat</v-btn>
          </router-link>
        </v-col>
        <v-col cols="12" md="5" sm="5" class="text-center">
            <v-text-field dense label="Cari" placeholder="masukkan lalu enter" :loading="loadingSearch" v-model="form.query" @keyup.enter="search" autocomplete="off">
              <v-icon slot="append">mdi-magnify</v-icon>
            </v-text-field>
        </v-col>
      </div>
      <CardPost :posts="posts" @showSnackbar="handleShowSnackbar" />
    </v-container>
  </div>
</template>

<script>
  import axios from 'axios';
  import CardPost from './posts/CardPost';
  export default {
    name: 'Posts',
    components: {
      CardPost
    },
    data() {
      return {
        showSnackbar: {},
        posts: [],
        loadingSearch: false,
        form: {
          query: null
        }
      }
    },

    mounted() {
      if (this.$route.params.showSnackbar) {
        this.$emit('showSnackbar', this.$route.params.showSnackbar)
      }

    },

    created() {
      this.getPosts();
    },

    methods: {
      async getPosts() {
        this.$emit('progressPost', true);
        let response = await axios.get('http://localhost:8000/api/posts');
        if (response.status === 200) {
          this.posts = response.data.data;
          this.$emit('progressPost', false);
        }
      },

      search(){
        this.loadingSearch = true;
        axios.post(`http://localhost:8000/api/posts/search`, this.form).then(response => {
          this.loadingSearch = false;
          this.posts = response.data;
          this.form.query = null;
        });
      },

      handleShowSnackbar(data) {
        console.log(data);
        this.$emit('showSnackbar', data);
      }
    },

  }
</script>