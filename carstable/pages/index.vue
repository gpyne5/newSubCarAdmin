<template>
  <div id="app" class='app'>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <CurrentMonth v-on:change-month="changeMonth" />
    <CarsCreate />
    <CarDelete v-bind:cars='cars' />
    <br>
    <CarsTable v-bind:id="cars" v-bind:cale="cale" v-bind:workingmonth="workingMonth" v-on:change-month="changeMonth" />
{{cars}}<br>
{{cale}}
    <!-- AWSの実験のため追加 -->
    <input type="text" v-model="car_name">
    <input type="number" v-model="car_number">
    <button type="submit" @click="awsPost">AWSへPOST</button>
  
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
      workingMonth: new Date().toISOString().slice(0,7),
      car_name: '',
      car_number: null,
      
    }
  },
  created: function() {
    //this.$axios.get('https://hikbjihjp0.execute-api.ap-northeast-1.amazonaws.com/webhook')
      //.then(res => console.log('g'))
    this.$store.dispatch('getData');
    this.$store.commit('setLoadDate', this.date)
  },
  computed: mapState([ 'cars', 'cale', 'daysCount', 'date' ]),
  methods: {
      changeMonth: function(e) {
          this.workingMonth = e;
      },
      async awsPost() {
        let params = {
        'car_name': this.car_name,
        'car_number': this.car_number
        }
        await this.$axios.post('https://hikbjihjp0.execute-api.ap-northeast-1.amazonaws.com/webhook', params)
          .then(res => console.log('p'))
          this.car_name = ''
          this.car_number = null
      }
  },
}
</script>

<style>
.app {
  width: 100%;
}
</style>