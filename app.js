const express = require('express')
const path = require('path')
const app = express()
const {v4} = require('uuid')


let CONTACTS = [
    {id: v4(), name: 'Nazar', value: '380-63-45-10-555', marked: false},
    {id: v4(), name: 'Nazar', value: '380-63-45-10-555', marked: false},
]

app.use(express.json())

//GET
app.get('/api/contacts', (req, res) => {

    // const contact = {req}
    res.status(200).json(CONTACTS)

})

//POST

app.post('/api/contacts/', (req, res) => {

    const contact = {...req.body, id: v4(), marked: false}
    // console.log(req.body.name)
    // res.json({...req.body})
    CONTACTS.push(contact)
    res.status(201).json(contact)
})

//DELETE

app.delete('/api/contacts/:id', (req, res) => {
    CONTACTS = CONTACTS.filter(c => c.id !== req.params.id)
    res.status(200).json({message: 'Контак удален'})
})

//PUT
app.put('/api/contacts/:id', (req, res) => {
    // res.json({...req.body})
    // res.json(req.params)
    const idx = CONTACTS.findIndex(c=>c.id === req.params.id)
    CONTACTS[idx] = req.body
    res.json(CONTACTS[idx])
})

//=================
app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'index.html'))
})

app.listen(3000, () => console.log('Server has been started on port 3000...'))

