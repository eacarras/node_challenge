const express = require('express');
const router = express.Router();

const db = require('../database');

// Routes
router.get('/getAllEmployees', (_, res) => {
    console.log("Obteniendo datos de la base...");

    db.ref('user').once('value', (snapshot) => {
        data = snapshot.val();
        res.json({
            status: 200,
            data
        })
    }, (err) => {
        console.error("Error al traer los datos...");
        res.json({
            message: err,
            status: 500
        })
    });
});

router.get('/getNumberEmployee', (_, res) => {
    db.ref('user').once('value', (snapshot) => {
        data = snapshot.val();
        const len = Object.keys(data).length;

        res.json({
            status: 200,
            value: len
        })
    }, (err) => {
        console.error("Error al obtener los datos..");
        res.json({
            message: err,
            status: 500
        })
    })
});

router.get('/getMostVotedByDepartment', (req, res) => {
    const amount = req.query.amount ? req.query.amount : 1;

    db.ref('user').on('value', (snapshot) => {
        data = snapshot.val();
        let finalObj = {};
        let dataToResponse = {};

        Object.values(data).forEach((element) => finalObj[element.department] = []);

        for(let key in data) {
            const name = data[key]["name"]
            const department = data[key]["department"]
            const votes = data[key]["votes"]
            
            finalObj[department].push({
                name,
                votes
            });
        }

        Object.entries(finalObj).forEach(([key, value]) => {
            value.sort((a, b) => (a.votes < b.votes) ? 1 : -1);
            const arr = amount > value.length ? value : value.slice(0, amount);
            dataToResponse[key] = arr;
        });
        
        res.json({
            status: 200,
            data: dataToResponse
        })
    }, (err) => {
        console.error("Error al traer los datos...");
        res.json({
            message: err,
            status: 500
        })
    });
});

router.get('/getMostVoted', (req, res) => {
    const amount = req.query.amount ? req.query.amount : 1;
    
    db.ref('user').once('value', (snapshot) => {
        data = snapshot.val();
        let arr = []
        for(let key in data) {
            const name = data[key]["name"]
            const votes = data[key]["votes"]
            
            arr.push({
                name,
                votes
            });
        }
        arr.sort((a, b) => (a.votes < b.votes) ? 1 : -1);

        res.json({
            status: 200,
            data: amount > arr.length ? arr : arr.slice(0, amount)
        })
    }, (err) => {
        console.error("Error al traer los datos...");
        res.json({
            message: err,
            status: 500
        })
    });
});

router.post('/insertUser', (req, res) => {
    const { data } = req.body;
    const newPostKey = db.ref().child('user').push().key;

    var updates = {};
    updates['/user/' + newPostKey] = data;

    db.ref().update(updates)
    .then(() => {
        console.log("Datos ingresados!");
        res.json({
            status: 200,
            msg: 'Datos Ingresados!'
        });
    }).catch((e) => {
        console.error("Error al ingresar los datos", e);
        res.json({
            status: 500,
            msg: 'Error al actualizar datos..'
        })
    });
});

router.post('/updateField', (req, res) => {
    const { data } = req.body;
    for(let key in data) {
        console.error("Datos duplicados...");
        const unique = new Set(data[key]["voteDepartment"]);
        if (unique.size < data[key]["voteDepartment"].length) {
            res.json({
                status: 400,
                msg: 'No se puede procesar mas de un voto a un departamento..'
            })
        }
    }

    db.ref('user').update(data)
      .then(() => {
          console.log("Datos actualizados!");
          res.json({
              status: 200,
              msg: 'Datos Actualizados!'
          });
      }).catch((e) => {
          console.error("Error al actualizar datos", e);
          res.json({
              status: 500,
              msg: 'Error al actualizar datos..'
          })
      });
});


module.exports = router;
