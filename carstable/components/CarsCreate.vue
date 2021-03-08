<template>
<div class="cars-create">
    <button type="button" v-on:click="onoff" class="btn btn-outline-primary">車両追加</button>
    <div v-show="flag" class="create">
        <!--基本的にフォームは使わないと教えてもらった/もし使うのであればdefaultのactionを無効にする処理を書く-->
        車種名：<input name="car_name" v-model="carName" type="text"><br>
        ナンバー（4桁）：<input name="car_number" v-model="carNumber" type="number"><br>
        <input type="submit" id="submit" v-on:click="onclick" class="submit">
    </div>
</div>
</template>

<script>
export default {
    name: 'CarsCreate',
    data: function() {
        return {
            carName: '',
            carNumber: null,
            postData: {
                car_number: this.carNumber,
                car_name: this.carName
            },
            flag: false,
        };
    },
    methods: {
        async onclick(e) {
            let data = {
                'car_name': this.carName,
                'car_number': this.carNumber,
            }
            console.log(e);
            this.$store.dispatch('postData', data);
            this.onoff();
            this.carName = '';
            this.carNumber = null;
        },
        onoff: function() {
            if(this.flag) {
                this.flag = false;
            } else {
                this.flag = true;
            }
        }
    }
}
</script>

<style>
.cars-create {
    padding: 10px;
    float: left;
}

.submit {
    margin:5px;
}

.create {
    color:gray;
    padding: 10px;
    position: relative;
    border: solid 1px #000;
    height: 180px;
    width: 200px;
    background-color: rgba(0, 123, 255, 0.2);
}
</style>
