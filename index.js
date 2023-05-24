const express = require('express');

const port = 8000;

const app = express();

const db = require('./config/mongoose');

const CrudTbl = require('./model/crudModel');
const crud = require('./model/crudModel');

app.use(express.urlencoded());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    CrudTbl.find({}).then((user) => {
        return res.render('form', {
            user,
            single: ""
        });
    }).catch((err) => {
        if (err) {
            console.log(err);
            return res.redirect('/');
        }
    })
})

app.post('/insertData', (req, res) => {
    const { editid, name, price, page, author } = req.body;

    if (editid) {
        if (!name || !price || !page || !author) {
            console.log("Please Enter All Field");
            return res.redirect('/');
        }
        CrudTbl.findByIdAndUpdate(editid, {
            name: name,
            price: price,
            page: page,
            author: author
        }).then((data) => {
            console.log("Book SuccessFully Inserted");
            return res.redirect('/');
        }).catch((err) => {
            console.log(err);
            return res.redirect('/');
        })
    }
    else {
        if (!name || !price || !page || !author) {
            console.log("Please Enter All Field");
            return res.redirect('/');
        }
        CrudTbl.create({
            name: name,
            price: price,
            page: page,
            author: author
        }).then((data) => {
            console.log("Book SuccessFully Inserted");
            return res.redirect('/');
        }).catch((err) => {
            console.log(err);
            return res.redirect('/');
        })
    }
})

app.get('/DeleteData/:id', (req, res) => {
    let id = req.params.id;

    CrudTbl.findByIdAndDelete(id).then((data) => {
        console.log("Book Successfully Delete");
        return res.redirect('/');
    }).catch((err) => {
        console.log(err);
        return res.redirect('/');
    })
})

app.get('/EditData/:id', async (req, res) => {
    let id = req.params.id;
    let allData = await crud.find({});
    CrudTbl.findById(id).then((single) => {
        return res.render('form', {
            single,
            user: allData
        })
    })
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log("Server is Start on Port :-" + port);
})