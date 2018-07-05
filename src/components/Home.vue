
<template>
  <v-container>
    <v-layout row wrap class="mb-2">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right" >
        <v-btn 
          large 
          router 
          to="/meetups"
          class="blue lighten-2" dark>Explore Meetups
        </v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn 
          large 
          router 
          to="/meetup/new"
          class="blue lighten-2" dark>Organize Meetup
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.imageUrl">
          <div class="title">
            {{ meetup.title }}
          </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <p>Join our awesome meetups!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        meetups: [
          {imageUrl: "https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200", id: "'shaohgalg", title: "Meetup in New York"
          },
          {imageUrl: "https://www.telegraph.co.uk/content/dam/video_previews/v/2/v2exl2nje6lsczqgxklf2mh1qjkhmfu-xlarge.jpg", id: "lshgohsob", title: "Meetup in Paris"
          },
        ]
      }
    }
  }
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0,0,0,0.5);
    color: white;
    font-size: 2em;
    padding: 20px;
  }
</style>


