export const state = () => {
  return {
      cars: [],
      cale: [],
      date: new Date(),
      calDate: null,
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
      let splitWorkingM = state.workingMonth.split('-')
      // new Date(parseInt(year, 10進数), parseInt(month, １０進数), 0)...monthは0~11で指定するわけだから
      //   2021-03は2021-04になる
      let date = new Date(parseInt(splitWorkingM[0], 10), parseInt(splitWorkingM[1], 10), 0).getDate()
      state.daysCount = date
  },
  setLoadDate(state, payload) {
      let splitWorkingM = state.workingMonth.split('-')
      let date = new Date(parseInt(splitWorkingM[0], 10), parseInt(splitWorkingM[1], 10), 0).getDate()
      state.daysCount = date
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
