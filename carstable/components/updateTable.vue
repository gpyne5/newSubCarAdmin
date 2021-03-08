<template>
<div class="post-form" v-show="putForm" v-bind:style="[pos]">
    <div  class="form-position">
        <span class="selected-day">{{selectedDays[0]}}日 〜 {{selectedDays[1]}}日</span>
        <input type="text" v-model="customerName">
        <input type="submit" v-on:click="click" value="予約">
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default{
    name: 'updateTable',
    computed: mapState(['workingMonth', 'selectedDays', 'selectedCarId', 'putForm', 'pos']),
    data() {
        return {
            customerName: '',
        }
    },
    methods: {
        click() {
            let data = {
                customerName: this.customerName,
                currentMonth: this.workingMonth,
                dateStart: this.selectedDays[0],
                dateEnd: this.selectedDays[1]
            };
            let payload = {
                id : this.selectedCarId,
                data: data
            }
            this.$store.dispatch('putData', payload);
            this.$store.commit('putForm', false)
        },
    },
    
}

</script>