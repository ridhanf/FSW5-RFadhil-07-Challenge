//  API Controller

const { v4: uuidv4 } = require('uuid')
const db = require('../db/models')

const apiIndex = async (req, res) => {
  res.status(200).json({
    "message": "Welcome to Game API",
    "api/v1/playes": "Get All Players"
  })
}

const getAllPlayers = async (req, res) => {
  const users = await db.User.findAll({
    include: [db.UserBio, db.UserHistory],
  })
  res.json({ users })
}

const getPlayerById = async (req, res) => {
  const user = await db.User.findOne({
    where: {
      id: req.params.id,
    },
    include: [db.UserBio, db.UserHistory],
  })
  res.json({ user })
}

const createPlayer = async (req, res) => {
  const user = req.body
  const uuid = uuidv4()
  await db.User.register(user, uuid, db)
    .then(() => {
      res.json({ status: 'Created' });
    })
    .catch((error) => next(error.message))
}

const updatePlayer = async (req, res) => {
  const data = await req.body

  await db.User.update(
    { email: data.email },
    {
      where: {
        id: req.params.id,
      },
    }
  )

  await db.UserBio.update(
    {
      firstname: data.firstname,
      lastname: data.lastname,
      city: data.city,
    },
    {
      where: {
        uid: req.params.id,
      },
    }
  )

  await db.UserHistory.update(
    {
      winStatus: data.winStatus,
      score: data.score,
    },
    {
      where: {
        user_id: req.params.id,
      },
    }
  )

  res.json({ status: 'Updated' })
}

const deletePlayer = async (req, res) => {
  await db.User.destroy({
    where: {
      id: req.params.id,
    },
  })

  res.json({ status: 'Deleted' })
}

module.exports = {
  apiIndex,
  getAllPlayers,
  getPlayerById,
  createPlayer,
  deletePlayer,
  updatePlayer,
}
