import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const pokemons = [
  {
    id: 1,
    name: 'Pikachu',
    image: 'image.jpg'
  },
  {
    id: 2,
    name: 'Raichu',
    image: 'image.jpg'
  },
  {
    id: 3,
    name: 'Mew',
    image: 'image.jpg'
  },
  {
    id: 4,
    name: 'Mewtwo',
    image: 'image.jpg'
  },
  {
    id: 5,
    name: 'Bulbasaur',
    image: 'image.jpg'
  }
]

const port = 4567

app.get('/', (req, res) => {
  if (req.query.name && req.query.age) {
    res.send(
      `Hello ${req.query.name}. You will be ${Number(req.query.age) + 1} soon.`
    )
  } else if (req.query.name) {
    res.send(`Hello, ${req.query.name}!`)
  } else {
    res.send('Hello!')
  }
})

app.get('/pokemons', (req, res) => {
  let name = String(req.query.name)
  let search = String(req.query.search)

  if (search !== 'undefined') {
    const filteredPokemons = pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    )
    res.send(filteredPokemons)
  } else if (name !== 'undefined') {
    const filteredPokemons = pokemons.filter(
      pokemon => pokemon.name.toLowerCase() === name.toLowerCase()
    )
    res.send(filteredPokemons)
  } else {
    res.send(pokemons)
  }
})

app.patch('/pokemons/:id', (req, res) => {
  const id = Number(req.params.id)
  const newName: string = req.body.name
  const newImage: string = req.body.image

  const match = pokemons.find(pokemon => pokemon.id === id)

  if (match) {
    if (newName) match.name = newName
    if (newImage) match.image = newImage
    res.send(match)
  } else {
    res.status(404).send({ error: 'Pokemon not found.' })
  }
})

app.listen(port, () => {
  console.log(`Go to: http://localhost:${port}`)
})
