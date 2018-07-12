
<template>
  <v-container>
    <v-layout row wrap class="mb-5">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right" >
        <v-btn 
          large 
          router 
          to="/meetups"
          class="red darken1" dark>Explore Meetups
        </v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn 
          large 
          router 
          to="/meetup/new"
          class="red darken 1" dark>Organize Meetup
        </v-btn>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          color="red darken1"
          :width= "7"
          :size= "70"
          v-if="loading">
        </v-progress-circular>
      </v-flex>
    </v-layout>

    <v-layout 
      row wrap 
      class="mt-2" 
      v-if="!loading && featuredAvailable > 0">
      <v-flex xs12 style="height: 70vh">
        <v-carousel style="cursor: pointer; height: 100%">
          <v-carousel-item
            v-for="meetup in meetups"
            :key="meetup.id"
            @click.native="onLoadMeetup(meetup.id)"
            :src="meetup.imageUrl">
          <div class="title">
            {{ meetup.title }}
          </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    
    <div 
      v-else
      class="text-xs-center">
      <h2 class="red--text darken1">Organize a Meetup to Get Started</h2>
    </div>
  </v-container>
</template>

<script>
  export default {
    computed: {
      meetups() {
        return this.$store.getters.featuredMeetups;
      },
      featuredAvailable() {
        return this.$store.getters.featuredMeetups.length;
      },
      loading() {
        return this.$store.getters.loading
      }
    },
    methods: {
      onLoadMeetup(id) {
        this.$router.push(`/meetups/${id}`)
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


