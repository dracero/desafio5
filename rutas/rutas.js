const express = require('express')

const router = express.Router()
const productos = require('../api/productos')

router.get('/listar', (req, res, next) => {
  const prods = productos.getAll()
  if (prods.length === 0) {
    next({ code: 404, message: 'No hay productos cargados' })
  }
  res.json(prods)
})

router.get('/listar/:id', (req, res, next) => {
  const { id } = req.params
  const producto = productos.getById(id)
  if (producto === undefined)
    next({ code: 404, message: 'No se encontro el producto' })
  res.json(producto)
})

router.post('/guardar', (req, res) => {
  const producto = productos.save(
    req.query.title,
    req.query.price,
    req.query.thumbnail
  )
  res.json(producto)
})

module.exports = router
