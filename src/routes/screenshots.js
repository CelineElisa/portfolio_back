const express = require('express')
const { connection } = require('../helper/conf.js')
const router = express.Router()


router.get('/', (req, res) => {
    const sql = 'SELECT * FROM screenshot'
    connection.query(sql, (err, results) => {
      if (err) {
        res.status(500).send('Erreur dans la récupération de tous les screenshots')
      } else {
        res.status(200).send(results)
      }
    })
  })

router.get('/:id', (req, res) => {
    const idProject = req.params.id
    const sql = 'SELECT * FROM screenshot WHERE id_project = ?'
    connection.query(sql, [idProject], (err, results) => {
      if (err) {
        res.status(500).send('Erreur dans la récupération des screenshots')
      } else {
        res.status(200).send(results)
      }
    })
  })




router.post('/', (req, res) => {
  const formData = req.body
  connection.query('INSERT INTO screenshot SET ?', [formData], (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de l'ajout d'un screenshot")
    } else {
      // const newProject = { id: results.insertId, ...formData }
      res.status(200).json('Nouveau screenshot ajouté !')
    }
  })
})

router.put('/:id', (req, res) => {
  const idScreenshot = req.params.id
  const formData = req.body
  connection.query(
    'UPDATE screenshot SET ? WHERE id = ?',
    [formData, idScreenshot],
    (err) => {
      if (err) {
        res.status(500).send("Erreur lors de la modification du Screenshot")
      } else {
        //const updatedProject = { id: parseInt(idProject), ...formData }
        res.status(200).json('Le screenshot a bien été modifié')
      }
    }
  )
})

router.delete('/:id', (req, res) => {
    const idScreenshot = req.params.id
    connection.query('DELETE FROM screenshot WHERE id = ?', [idScreenshot], (err) => {
      if (err) {
        res.status(500).send("Erreur lors de la suppression du screenshot")
      } else {
        res.sendStatus(204)
      }
    })
  })

module.exports = router
