export const state = () => {
    return {
        cars: [],
        cale: [],
        date: new Date().getMonth() + 1,
        daysCount: 0,
        workingMonth: new Date().toISOString().slice(0,7),
        selectedDays: [], //選択した期間
        selectedCarId: null, //選択した車のid
        putForm: false,
        pos: { left: 0, top: 0 },
        cellColor: {},
    }
}

export const mutations = {
    setData(state, payload) {
        state.cars = payload.data[0],
        state.cale = payload.data[1]
    },
    changeMonth(state, payload) {
        state.workingMonth = payload
    },
    selectDays(state, payload) {
        state.selectedDays = payload
    },
    selectCar(state,payload) {
        state.selectedCarId = payload
    },
    putForm(state,payload) {
        state.putForm = payload
    },
    pos(state, payload) {
        state.pos = payload
    },
    cellColor(state, payload) {
        state.cellColor = payload
    },
    changeDate(state, payload) {
        let now = state.date.getMonth() + payload
        state.date.setMonth(now + payload)
        let count = state.date
        count.setDate(0)
        console.log(count.getDate())
        state.daysCount = count.getDate()
    },
    
    
}

export const actions = {
    async getData(context){
        await this.$axios.get('http://localhost/admin')
            .then(res => context.commit('setData', res))
            .catch(e => console.log(e))
    },
    
    async postData(context, payload) {
        await this.$axios.post('http://localhost/admin', payload)
            .then(res => context.commit('setData',res))
            .catch(e => console.log(e))
    },
    async deleteData(context, payload){
        await this.$axios.delete('http://localhost/admin/' + payload)
            .then(res => context.commit('setData',res))
            .catch(e => console.log(e))
    },

    async putData(context, payload){
        await this.$axios.put('http://localhost/admin/' + payload.id, payload.data)
            .then(res => context.commit('setData',res))
            .catch(e => console.log(e))
    },
}
