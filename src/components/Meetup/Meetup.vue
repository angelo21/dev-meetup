
<template>
  <v-container>
    <v-layout row wrap v-if="loading">
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
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h4 class="red--text darken-6">{{ meetup.title }}</h4>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-meetup 
                :meetup="meetup">
              </app-edit-meetup>
            </template>
          </v-card-title>
          <v-card-media
            :src="meetup.imageUrl"
            height="400px">
          </v-card-media>
          <v-card-text>
            <div 
              class="red--text darken1">{{ meetup.dateFormatted }}, {{ meetup.timeFormatted }} - {{ meetup.location }}
            </div>
            <div
              class="red--text darken1">{{ meetup.description }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-register 
              :meetupId="id" 
              v-if="userIsAuthenticated && !userIsCreator">
            </app-register>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import AppEditMeetup from "./Edit/EditMeetupDetails.vue";
  import AppRegister from "./Registration/RegisterDialog.vue";

  export default {
    props: ["id"],
    computed: {
      meetup() {
        return this.$store.getters.loadedMeetup(this.id);
      },
      userIsAuthenticated() {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined;
      },
      userIsCreator() {
        if (!this.userIsAuthenticated) {
          return false;
        }
        return this.$store.getters.user.id === this.meetup.creatorId;
      },
      loading() {
        return this.$store.getters.loading
      }
    },
    components: {
      AppEditMeetup,
      AppRegister,
    }
  }
</script>

