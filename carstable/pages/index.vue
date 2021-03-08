<template>
  <div id="app">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <CurrentMonth v-on:change-month="changeMonth" />
    <CarsCreate />
    <CarDelete v-bind:cars='cars' />
    <br>
    <CarsTable v-bind:id="cars" v-bind:days="days(date)" v-bind:cale="cale" v-bind:workingmonth="workingMonth" v-on:change-month="changeMonth" />
  </div>
</template>

<script>
import CurrentMonth from '../components/CurrentMonth.vue'
import CarsCreate from '../components/CarsCreate.vue'
import CarDelete from '../components/CarDelete.vue'
import CarsTable from '../components/CarsTable.vue'
import { mapState } from 'vuex'

export default {
  template: { 
    CarsTable,
    CurrentMonth,
    CarsCreate,
    CarDelete,
     },
  data: function() {
    return {
      date: new Date(),
      workingMonth: new Date().toISOString().slice(0,7),
      days: function(date) {
          date.setMonth(date.getMonth() + 1);
          date.setDate(0);
          return date.getDate();
      }
    }
  },
  mounted: function() {
    this.$store.dispatch('getData');
  },
  computed: mapState([ 'cars', 'cale' ]),
  methods: {
      changeMonth: function(e) {
          this.workingMonth = e;
      }
  },
}
</script>
