export const state = () => {
    return {
        cars: [],
        cale: []
    }
}

export const mutations = {
    setData(state, payload) {
        state.cars = payload.data[0],
        state.cale = payload.data[1]
    }
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
