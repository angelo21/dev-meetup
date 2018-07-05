
<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h4 class="red--text darken-6">{{ meetup.title }}</h4>
          </v-card-title>
          <v-card-media
            :src="meetup.imageUrl"
            height="400px">
          </v-card-media>
          <v-card-text>
            <div class="info--text">{{ meetup.date }} - Where it takes place</div>
            <div>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum omnis voluptates debitis repellendus adipisci? Eaque quis reprehenderit incidunt et illo sit aliquid adipisci omnis, quisquam facere vero ut minima impedit.
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="red darken-5" dark>Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ["id"],
    computed: {
      meetup() {
        return this.$store.getters.loadedMeetup(this.id);
      }
    }
  }
</script>

