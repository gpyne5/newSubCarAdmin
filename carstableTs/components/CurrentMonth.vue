<template>
    <div class="current-month"><a href="javascript:void(0)" v-if="exist" v-on:click="beforeMonth">&lt;&lt;</a><h2>{{ workingMonth }}月</h2> <a href="javascript:void(0)" v-on:click="nextMonth">&gt;&gt;</a></div>
</template>

<script lang="ts">
import {mapState} from 'vuex';
import Vue from 'vue'


export default Vue.extend({
  name: 'CurrenMonth',
  computed: mapState([ 'date', 'daysCount' ]),
  data: function() {
    return {
      //date: new Date(),
      currentDate: new Date().toISOString().slice(0,7),
      workingMonth: new Date().toISOString().slice(0,7),
      calDate: new Date(),
      exist: false,
    };
  },
  methods: {
    nextMonth() {
      //親にデータを返す処理 workingMonthを変える処理　
      console.log(this)
      this.calDate.setMonth(this.calDate.getMonth() + 1);
      this.workingMonth = this.calDate.toISOString().slice(0,7);
      this.$store.commit('changeMonth', this.workingMonth);
      this.$store.commit('changeDate');
      //this.$emit('change-month', this.workingMonth);
    },
    beforeMonth() {
      //親にデータを返す処理 workingMonthを変える処理
      this.calDate.setMonth(this.calDate.getMonth() - 1);
      this.workingMonth = this.calDate.toISOString().slice(0,7);
      this.$store.commit('changeMonth', this.workingMonth);
      this.$store.commit('changeDate');
      //this.$emit('change-month', this.workingMonth);
    }
  },
  watch: {
    workingMonth: function(){
      if(this.workingMonth > this.currentDate){
          this.exist = true;
      } else {
          this.exist = false;
      }
    },
  },
})
const instance = new Vue()

</script>

<style>
.current-month {
    width: 100%;
    text-align: center;
}

h2 {
    text-align: center;
    font-size: 20px;
    display: inline-table;
    margin: 0 auto;
}
</style>