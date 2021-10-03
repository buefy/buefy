import Vue from 'Vue'

/**
 * Here you put global variables for use and update through the components
 * Alternative to vuex
 **/
export const GlobalStore = new Vue({
    data: {
        durationProgress: null
    }
})
