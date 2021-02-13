<template>
  <v-app>
    <NavigationDrawer />
    <v-main>
    <v-progress-linear indeterminate color="black" v-if="progressPost"></v-progress-linear>
      <v-container fluid>
        <router-view @showSnackbar="getShowsnackbar" @progressPost="handleProgressPost"></router-view>
      </v-container>
    </v-main>
    <Snackbar :showSnackbar="showSnackbar" />
  </v-app>
</template>

<script>
  import NavigationDrawer from './components/NavigationDrawer';
  import Snackbar from './components/Snackbar';
  export default {
    name: 'App',
    data() {
      return {
        showSnackbar: {},
        progressPost: false,
      }
    },
    components: {
      NavigationDrawer,
      Snackbar
    },

    methods: {
      getShowsnackbar(data) {
        this.showSnackbar = data
      },

      handleProgressPost(condition){
        this.progressPost = condition
      }
    }
  }
</script>

<style>

</style>