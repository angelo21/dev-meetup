
<template>
  <v-container class="hi">
    <v-layout row wrap>
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
    <v-layout row wrap>
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
            :src="item.src"
          ></v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style>
  .hi{
    border: 1px solid red
  }
</style>


