
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
    loading: false,
    error: null,
  },
  mutations: {
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload;
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    loadMeetups({commit}) {
      commit("setLoading", true)
      firebase.database().ref("meetups").once("value")
      .then(data => {
        const meetups = [];
        const obj = data.val();
        for (let key in obj) {
          meetups.push({
            id: key,
            title: obj[key].title,
            description: obj[key].description,
            imageUrl: obj[key].imageUrl,
            dateFormatted: obj[key].dateFormatted,
            timeFormatted: obj[key].timeFormatted,
            creatorId: obj[key].creatorId
          })
        }
        commit("setLoadedMeetups", meetups)
        commit("setLoading", false)
      })
      .catch(error => {
        console.log(error)
        commit("setLoading", false)
      })
    },
    createMeetup({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        dateFormatted: payload.dateFormatted,
        timeFormatted: payload.timeFormatted,
        creatorId: getters.user.id,
      }
      //Sends meetup info to database and pictures to storage
      let imageUrl;
      let key;
      firebase.database().ref("meetups").push(meetup)
      .then(data => {
        key = data.key;
        return key;
      })
      .then(key => {
        const filename = payload.image.name;
        const ext = filename.slice(filename.lastIndexOf("."))
        return firebase.storage().ref(`meetups/${key}${ext}`).put(payload.image)
      })
      .then(filedata => {
        let imagePath = filedata.metadata.fullPath;
        return firebase.storage().ref().child(imagePath).getDownloadURL();
      })
      .then(url => {
        imageUrl = url;
        return firebase.database().ref("meetups").child(key).update({imageUrl: imageUrl, id: key})
      })
      .then(() => {
        commit("createMeetup", {
          ...meetup,
          imageUrl: imageUrl,
          id: key
        })
      })
      .catch(error => console.log(error))
    },
    
    signUserUp({commit}, payload) {
      commit("setLoading", true)
      commit("clearError")
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit("setLoading", false)
        const newUser = {
          id: user.user.uid,
          registeredMeetups: []
        }
        commit("setUser", newUser)
      })
      .catch(error => {
        commit("setLoading", false)
        commit("setError", error)
      })
    },
    signUserIn({commit}, payload) {
      commit("setLoading", true)
      commit("clearError")
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit("setLoading", true)
        const newUser = {
          id: user.user.uid,
          registeredMeetups: []
        }
        commit("setUser", newUser)
      })
      .catch(error => {
        commit("setLoading", false)
        commit("setError", error)
      })
    },
    autoSignIn({commit}, payload) {
      commit("setUser", {
        id: payload.uid,
        registeredMeetups: []
      })
    },
    logout({commit}) {
      firebase.auth().signOut();
      commit("setUser", null)
    },
    clearError({commit}) {
      commit("clearError");
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
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    }
  },
})