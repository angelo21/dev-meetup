
<template>
  <v-container>
    <v-layout row>
      <v-flex xs-12 sm6 offset-sm3>
        <h2 class="red--text darken-1">Create a New Meetup</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-form @submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title*"
                id="title"
                v-model="title"
                color="red darken1"
                required>
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="location"
                label="Location*"
                id="location"
                v-model="location"
                color="red darken1"
                required>
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="imageUrl"
                label="Image Url*"
                id="image-url"
                v-model="imageUrl"
                color="red darken1"
                required>
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row justify-center>
            <v-flex 
              xs12 sm6 
              class="text-xs-center">
              <img :src="imageUrl" width="100%"> 
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="description"
                label="Description*"
                id="description"
                multi-line
                v-model="description"
                color="red darken1"
                required>
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn 
                class="red darken1" dark
                :disabled="!formIsValid"
                type="submit">Create Meetup
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        title: "",
        location: "",
        imageUrl: "",
        date: new Date(),
      }
    },
    computed: {
      formIsValid() {
        return this.title !== "" && 
          this.location !== "" && 
          this.imageUrl !== "" && 
          this.description !== "";
      }
    },
    methods: {
      onCreateMeetup() {
        if (!this.formIsValid) {
          return;
        }
        const meetupData = {
          title: this.title,
          location: this.location,
          imageUrl: this.imageUrl,
          description: this.description,
          date: this.date,
        }
        this.$store.dispatch("createMeetup", meetupData)
        this.$router.push("/meetups");
      }
    }
  }
</script>

