import * as types from "./mutation-type"
const mutations = {
	// 城市
	[types.SET_CITY](state,selectCity){
		state.selectCity = selectCity
	},
    // 小区
    [types.SET_COMMUNITY](state,selectCommunity){
        state.selectCommunity = selectCommunity
    },
    // 城市id
    [types.SET_CITYID](state,hasSelCityID){
        state.hasSelCityID = hasSelCityID
    },
}
export default mutations