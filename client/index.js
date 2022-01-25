import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js'

Vue.component('loader', {
    template: `
    <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
    `
})

new Vue({
    el: '#app',
    data() {
        return {
            loading: false,
            form: {
                name: '',
                value: ''
            },
            contacts: [
                /*{id: 1, name: 'Nazar', value: '380-63-45-10-555', marked: false}*/
            ],
            testArr: [1, 2, 3, 5]
        }
    },
    computed: {
        canCreate() {
            return this.form.value.trim() && this.form.name.trim()
        }
    },
    methods: {
        async createContacts() {
            const {...contact} = this.form

            const newContact = await request('/api/contacts', 'POST', contact)

            console.log('newContact', newContact)

            this.contacts.push(newContact)

            // this.contacts.push({...contact, id: Date.now(), marked: false})
            // this.form.name = this.form.value = ''
        },
        async markContact(id) {

            const contact = this.contacts.find(c => c.id === id)

            const updated = await request(`/api/contacts/${id}`, 'PUT', {
                ...contact,
                marked: true
            })

            console.log(updated)

            contact.marked = true
        },
        async removeContact(id) {
            await request(`/api/contacts/${id}`, 'DELETE')
            this.contacts = this.contacts.filter(c => c.id !== id)
        }
    },
    async mounted() {
        this.loading = true
        const data = await request('/api/contacts')
        this.contacts = data
        this.loading = false
        console.log(data)
    }
})

async function request(url, method = 'GET', data = null) {
    try {
        const headers = {}
        let body

        if (data) {
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        })
        return response.json()
    } catch (e) {
        console.warn('Error', e.message)
    }
}