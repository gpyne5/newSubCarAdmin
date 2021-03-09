<template>
    <div class="current-month"><a href="javascript:void(0)" v-if="exist" v-on:click="beforeMonth">&lt;&lt;</a><h2>{{ workingMonth }}月</h2> <a href="javascript:void(0)" v-on:click="nextMonth">&gt;&gt;</a></div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'CurrenMonth',
    computed: mapState([ 'date', 'daysCount' ]),
    data: function() {
        return {
            //date: new Date(),
            currentDate: new Date().toISOString().slice(0,7),
            workingMonth: new Date().toISOString().slice(0,7),
            calDate: new Date(),
            exist: false,
        }
    },
    methods: {
        nextMonth: function() {
            //親にデータを返す処理 workingMonthを変える処理　
            this.calDate.setMonth(this.calDate.getMonth() + 1);
            this.workingMonth = this.calDate.toISOString().slice(0,7);
            this.$store.commit('changeMonth', this.workingMonth);
            this.$store.commit('changeDate', 1);
            console.log(this.daysCount)
            //this.$emit('change-month', this.workingMonth);
        },
        beforeMonth: function() {
            //親にデータを返す処理 workingMonthを変える処理
            this.calDate.setMonth(this.calDate.getMonth() - 1);
            this.workingMonth = this.calDate.toISOString().slice(0,7);
            this.$store.commit('changeMonth', this.workingMonth);
            this.$store.commit('changeDate', -1);
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
        }
    }
}
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