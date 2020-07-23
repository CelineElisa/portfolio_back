const express = require('express')
const { connection } = require('../helper/conf.js')
const router = express.Router()

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM profile'
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send('Erreur dans la récupération des données du profil')
    } else {
      res.status(200).send(results[0])
    }
  })
})

router.put('/:id', (req, res) => {
  const idProfile = req.params.id
  const formData = req.body
  console.log(formData)
  console.log(idProfile)
  connection.query(
    'UPDATE profile SET ? WHERE id = ?',
    [formData, idProfile],
    (err) => {
      if (err) {
        res.status(500).send("Erreur lors de la modification du profil")
      } else {
        //const updatedProject = { id: parseInt(idProject), ...formData }
        res.status(200).json('Le profil a bien été modifié')
      }
    }
  )
})

module.exports = router
