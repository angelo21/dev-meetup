
<template>
  <v-container>
    <v-layout row>
      <v-flex xs-12 sm6 offset-sm3 text-xs-center>
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
              <v-textarea
                name="description"
                label="Description*"
                id="description"
                multi-line
                v-model="description"
                color="red darken1"
                required>
              </v-textarea>
            </v-flex>
          </v-layout>

          <v-layout row justify-center mb-2>
            <v-flex xs12 sm6 text-xs-center>
              <h2 
                class="red--text darken1">Choose a date and time</h2>
            </v-flex>
          </v-layout>

          <!-- DATE AND TIME -->
          <v-layout row wrap> 
            <v-flex xs12 sm6>
              <v-menu
                ref="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="dateDisplay"
                  label="Select Date"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker 
                  header-color="red darken1"
                  @input="formatDate"
                  v-model="date">
                  <v-spacer></v-spacer>
                </v-date-picker>
              </v-menu>
            </v-flex>

            <v-flex xs12 sm6>
              <v-menu
                ref="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="timeDisplay"
                  label="Select Time"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-time-picker 
                  header-color="red darken1"
                  @input="formatTime"
                  v-model="time">
                  <v-spacer></v-spacer>
                </v-time-picker>
              </v-menu>
            </v-flex>
            <v-spacer></v-spacer>
          </v-layout>
          <!--END DATE AND TIME-->
          <v-layout row>
            <v-flex xs12 class="text-xs-center">
              <v-btn 
                class="red darken1" dark
                :disabled="!formIsValid"
                type="submit"
                >Create Meetup
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
      description: "",
      date: null,
      dateFormatted: null,
      time: null,
      timeFormatted: null,
    };
  },
  computed: {
    formIsValid() {
      return (
        this.title !== "" &&
        this.location !== "" &&
        this.imageUrl !== "" &&
        this.description !== "" &&
        this.date !== null &&
        this.time !== null

      );
    },
    dateDisplay: {
      get () {
        return this.dateFormatted;
      }
    },
    timeDisplay: {
      get () {
        return this.timeFormatted;
      }
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
        dateFormatted: this.dateFormatted,
        timeFormatted: this.timeFormatted,
      };
      this.$store.dispatch("createMeetup", meetupData);
      this.$router.push("/meetups");
    },
    formatDate() {
      const date = this.date.split("-");
      const [year, month, day] = date;
      const formattedDate = `${month}-${day}-${year}`;
      this.dateFormatted = formattedDate;
    },
    formatTime() {
      let time = this.time;
      const numCheck = time.split(":");
      let numConvert = parseInt(numCheck[0]);
      if (time === "00:00") {
        time = `12:00 AM`
      } else if (numConvert <= 11) {
        time = `${numConvert}:${numCheck[1]} AM`
      } else {
        numConvert -= 12;
        time = `${numConvert}:${numCheck[1]} PM`
      }
      this.timeFormatted = time;
    }
  },
};
</script>

