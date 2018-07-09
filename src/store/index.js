
import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {imageUrl: "https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200", 
      id: "shaohgalg", 
      title: "Meetup in New York",
      dateFormatted: "7-18-2018",
      location: "New York",
      description: "It's New York"
      },
      {imageUrl: "https://www.telegraph.co.uk/content/dam/video_previews/v/2/v2exl2nje6lsczqgxklf2mh1qjkhmfu-xlarge.jpg", 
      id: "lshgohsob", 
      title: "Meetup in Paris",
      dateFormatted: "7-19-2",
      location: "Paris",
      description: "It's Paris"
      },
    ],
    user: null,
  },
  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    setUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    createMeetup({commit}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        dateFormatted: payload.dateFormatted,
        timeFormatted: payload.timeFormatted,
        id: "shenpgnghw"
      }
      //Reach out to firebase for storage
      commit("createMeetup", meetup)
    },
    signUserUp({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        const newUser = {
          id: user.user.uid,
          registeredMeetups: []
        }
        commit("setUser", newUser)
      })
      .catch(error => {
        console.log(error)
      })
    },
    signUserIn({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        const newUser = {
          id: user.user.uid,
          registeredMeetups: []
        }
        commit("setUser", newUser)
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      });
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup(state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id == meetupId;
        })
      }
    },
    user(state) {
      return state.user;
    }
  },
})