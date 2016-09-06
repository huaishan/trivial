// new Vue({
//     el: '#app',
//     data: {
//         newTodo: '',
//         todos: [
//             {text: 'Learn JavaScript'},
//             {text: 'Learn Vue.js'},
//             {text: 'Build Something Awesome'}
//         ]
//     },
//     methods: {
//         addTodo: function() {
//             var text = this.newTodo.trim()
//             if (text) {
//                 this.todos.push({text: text})
//                 // this.newTodo = ''
//             }
//         }
//     }
// })

new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todos: [
            { text: 'Add some todos' }
        ]
    },
    methods: {
        addTodo: function () {
            var text = this.newTodo.trim()
            if (text) {
               this.todos.push({ text: text })
               this.newTodo = ''
            }
        },
        removeTodo: function (index) {
            this.todos.splice(index, 1) 
        }
    },
    created: function () {
        console.log('a is: ' + this.todos[0].text)
    }
})

