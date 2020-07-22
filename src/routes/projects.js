const express = require('express')
const { connection } = require('../helper/conf.js')
const router = express.Router()

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM projet'
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send('Erreur dans la récupération des projets')
    } else {
      res.status(200).send(results)
    }
  })
})

router.post('/', (req, res) => {
  const formData = req.body
  console.log(formData)
  connection.query('INSERT INTO projet SET ?', [formData], (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de l'ajout d'un projet")
    } else {
      const newProject = { id: results.insertId, ...formData }
      res.status(200).json(newProject)
    }
  })
})

router.put('/:id', (req, res) => {
  const idProject = req.params.id
  const formData = req.body
  console.log(formData)
  console.log(idProject)
  connection.query(
    'UPDATE projet SET ? WHERE id = ?',
    [formData, idProject],
    (err) => {
      if (err) {
        res.status(500).send("Erreur lors de la modification du projet")
      } else {
        const updatedProject = { id: parseInt(idProject), ...formData }
        res.status(200).json(updatedProject)
      }
    }
  )
})

router.delete('/:id', (req, res) => {
    const idProject = req.params.id
    connection.query('DELETE FROM projet WHERE id = ?', [idProject], (err) => {
      if (err) {
        res.status(500).send("Erreur lors de la suppression d'un projet")
      } else {
        res.sendStatus(204)
      }
    })
  })

module.exports = router
