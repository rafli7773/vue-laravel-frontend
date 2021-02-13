<template>
    <v-snackbar top
      v-model="snackbar"
      :color="color"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
export default {
    name: 'Snackbar',
    props: ['showSnackbar'],
    data(){
        return{
            snackbar: false,
            color: '',
            text: ''
        }
    },

    watch: {
        showSnackbar(value){
            this.snackbar = value.snackbar;
            this.color = value.color;
            this.text = value.text
        }
    }
    

}
</script>