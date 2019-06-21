import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import jobs from "./jobs.json";

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
    state: {
        jobsData: [],
        parsedjobsData: [],
        height: 0
    },
    actions: {
        loadjobsData({
            commit
        }) {

            commit('SetJobsData', jobs.data);
            return new Promise((resolve, reject) => {
                axios
                    .get('https://jobsqared.herokuapp.com/jobs')
                    .then(r => r.data)
                    .then(jobsData => {
                        commit('SetJobsData', jobsData);
                        resolve(jobsData);
                    }, error => {
                        // http failed, let the calling function know that action did not work out
                        reject(error);
                    })
            });
        }
    },
    mutations: {
        SetJobsData(state, jobsData) {
            state.jobsData = jobsData;
        },
        setHeight(state, height) {
            state.height = window.innerHeight;
        }
    }
})