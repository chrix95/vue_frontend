import  Vue  from "vue"
import Vuex  from "vuex"

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        user: {},
        token: '',
        bucketList: []
    },
    getters: {
        getUser(state) {
            return state.user;
        },
        getToken(state) {
            return state.token;
        },
        getBucketList(state) {
            return state.bucketList;
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;
        },
        setBucketList(state, bucketList) {
            state.bucketList.push(bucketList);
        }
    }
});