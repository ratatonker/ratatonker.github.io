var app = new Vue({
    el: '#app',
    data: {
        rat_list: []
    },
    methods: {
        delete: function (rat) {
            console.log('hi')
            remove(rat)
        },
    },
    mounted: function () {
        store = localStorage.getItem('saved_rats')
        store = JSON.parse(store)
        this.rat_list = store.rats
    },


})

function remove(rat) {
    i = app.rat_list.indexOf(rat)
    app.rat_list.splice(i, 1)
    store = localStorage.setItem('saved_rats', JSON.stringify({ rats: app.rat_list }))
}