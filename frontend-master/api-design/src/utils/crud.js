export const getOne = (model) => async (req, res) => {
  try {
    const id = req.params.id
    const user = req.user._id

    const doc = await model.findOne({
      _id: id,
      createdBy: user,
    })

    if (!doc) {
      return res.status(404).end()
    }

    res.status(200).json({ data: doc })
  } catch (e) {
    console.error(e)
    return res.status(404).end()
  }
}

export const getMany = (model) => async (req, res) => {
  try {
    const user = req.user._id

    const docs = await model.find({
      createdBy: user,
    })

    if (!docs) {
      return res.status(404).end()
    }

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    return res.status(404).end()
  }
}

export const createOne = (model) => async (req, res) => {
  try {
    const user = req.user._id
    const body = req.body

    const doc = await model.create({
      ...body,
      createdBy: user,
    })

    if (!doc) {
      return res.status(400).end()
    }

    res.status(201).json({ data: doc })
  } catch (e) {
    console.error(e)
    return res.status(404).end()
  }
}

export const updateOne = (model) => async (req, res) => {
  try {
    const id = req.params.id
    const user = req.user._id
    const body = req.body

    const doc = await model.findOneAndUpdate(
      {
        _id: id,
        createdBy: user,
      },
      body,
      { new: true }
    )

    if (!doc) {
      return res.status(400).end()
    }

    res.status(200).json({ data: doc })
  } catch (e) {
    console.error(e)
    return res.status(404).end()
  }
}

export const removeOne = (model) => async (req, res) => {
  try {
    const id = req.params.id
    const user = req.user._id

    const doc = await model.findOneAndRemove({
      _id: id,
      createdBy: user,
    })

    if (!doc) {
      return res.status(400).end()
    }

    res.status(200).json({ data: doc })
  } catch (e) {
    console.error(e)
    return res.status(404).end()
  }
}

export const crudControllers = (model) => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model),
})
