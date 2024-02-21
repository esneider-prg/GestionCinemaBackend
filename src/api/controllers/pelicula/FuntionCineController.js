const FuntionCine = require("../../models/FuntionCineModel.js");
const asyncHandler = require("express-async-handler");


const createFuntionCine = asyncHandler(async (req, res) => {
  try {

    const {
      Sala,
      Hora,
      Sillas,
    } = req.body;


    const funtionCine = new FuntionCine({
      Sala,
      Hora,
      Sillas,
      userId: req.user._id,
    });


    if (funtionCine) {
      const createFuntionCine = await funtionCine.save();
      res.status(201).json(createFuntionCine);
    } else {
      res.status(400);
      throw new Error("Invalid Funtion data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



const getFuntionCine = asyncHandler(async (req, res) => {
  try {
    const count = await FuntionCine.find();
    res.status(201).json(count);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



const updateFuntionCine = asyncHandler(async (req, res) => {
  try {

    const {
      Sala,
      Hora,
      Sillas,
    } = req.body;


    const funtionCine = await FuntionCine.findById(req.params.id);

    if (funtionCine) {

      funtionCine.Sala = Sala || funtionCine.Sala;
      funtionCine.Hora = Hora || funtionCine.Hora;
      funtionCine.Sillas = Sillas || funtionCine.Sillas;


      const updatedFuntionCine = await funtionCine.save();

      res.status(201).json(updatedFuntionCine);
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



const deleteFuntionCine = asyncHandler(async (req, res) => {
  try {

    const funtionCine = await FuntionCine.findById(req.params.id);

    if (funtionCine) {
      await funtionCine.deleteOne();
      res.json({ message: "FuntionCine removed" });
    }

    else {
      res.status(404);
      throw new Error("Funtioncine not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



module.exports = {
  getFuntionCine,
  updateFuntionCine,
  deleteFuntionCine,
  createFuntionCine,
};