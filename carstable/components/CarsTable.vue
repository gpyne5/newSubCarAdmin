<template>
<div>
    <div>
        <table class="table">
            <thead>
                <tr><th></th><th v-for="(i, index) in days" v-bind:key="index">{{ i }}</th></tr>
            </thead>
            <tbody>
                <tr v-for="(car, index) in cars" v-bind:id="car.id" v-bind:key="index"><th>{{ car.car_name }}</th>
                <td v-for="(reservation, key) in makeCalender(car)" v-on:mousedown="mousedown" v-bind:id="key" v-bind:key="key" class="td01">{{ reservation }}</td></tr>
            </tbody>
        </table>
    </div>
    <updateTable></updateTable>
</div>
</template>

<script>
import { mapState } from 'vuex'
import updateTable from '../components/updateTable.vue'

export default{
    name: 'CarsTable',
    components: { updateTable },
    props: ['days'],
    data: function() {
        return {
            reservation: '',
            date: new Date().toISOString().slice(0,7), // 2021-02 のような文字列
            currentDate: new Date().toISOString().slice(0,7),
            keys: [],
            onClick: {},
            show: false,
            selectCell: false,
            makeCalender: function(car) {
                let result = {};
                for(let j=0,len=this.cale.length;j<len;j++){
                    if(this.cale[j].y_m === this.workingMonth){
                        if(this.cale[j].car_id === car.id){
                            for(let i=1,len=this.days+1;i<len;i++){
                                result[i] = this.cale[j]['_' + i.toString()];
                            }
                            return result;
                        }
                    }
                }
            }
        };
    },
    computed:  mapState([ 'cars', 'cale', 'workingMonth' ]),
    methods: {
        mousedown(e) {
            e.target.style.backgroundColor = 'rgba(0,123,255,0.2)';
            this.$store.commit('selectCar', e.path[1].id);
            this.onClick[Number(e.target.id)] = e.target.outerText;
            this.keys = Object.keys(this.onClick);
            if(this.keys.length === 2){
                this.keys.sort();
                this.pos = {
                    top: e.pageY + 'px',
                    left: e.pageX + 'px',
                    position: 'absolute'
                };
                // this.keys...○日〜○日の配列
                this.$store.commit('selectDays', this.keys)
                this.$store.commit('putForm', true)
                this.$store.commit('pos', this.pos)
            }
            if(this.keys.length === 3){
                this.keys.splice(1, 1);
            };
        },
    },
}
</script>

<style>
.td01:hover {
    background-color: rgba(0,123,255,0.6)
}
th {
    width: 50px; border-bottom:1px solid gray;border-left:1px solid gray; overflow-wrap : break-word;text-align: center;
}

td {
    width: 50px; border-bottom:1px solid gray;border-left:1px solid gray;overflow-wrap : break-word;text-align: center;
}

table {
    table-layout:fixed;width: 100%;
}

.post-form {
    height: 80px;
    width: 250px;
    background-color: rgba(92, 133, 245, 0.5);
    border: solid 1px blue;
}

.form-position {
    position: relative;
    padding: 10px;
}

.selected-day {
    padding: 8px;
}

</style>
