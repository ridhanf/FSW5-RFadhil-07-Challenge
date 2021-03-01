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
  const players = await db.User.findAll({
    include: [db.UserBio, db.UserHistory],
  })
  res.json({ players })
}

const getPlayerById = async (req, res) => {
  const player = await db.User.findOne({
    where: {
      id: req.params.id,
    },
    include: [db.UserBio, db.UserHistory],
  })
  res.json({ player })
}

const createPlayer = async (req, res) => {
  const player = req.body
  const uuid = uuidv4()
  await db.User.create(
    {
      id: uuid,
      username: player.username,
      email: player.email,
      UserBio: {
        uid: uuid,
      },
      UserHistories: [
        {
          uid: uuid,
        },
      ],
    },
    {
      include: [db.UserBio, db.UserHistory],
    }
  )

  res.json({ status: 'Created' })
}

const deletePlayer = async (req, res) => {
  await db.User.destroy({
    where: {
      id: req.params.id,
    },
  })

  res.json({ status: 'Deleted' })
}

const updatePlayer = async (req, res) => {
  const data = req.body

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
      first_name: data.first_name,
      last_name: data.last_name,
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
      level: data.level,
      experience: data.experience,
    },
    {
      where: {
        user_id: req.params.id,
      },
    }
  )

  res.json({ ok: 'Updated' })
}

module.exports = {
  apiIndex,
  getAllPlayers,
  getPlayerById,
  createPlayer,
  deletePlayer,
  updatePlayer,
}
