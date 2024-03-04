const ReservaClien = require("../../models/ReservaClienteModel");

 export function getSillasCliente(id){

}

const getSillasCliente = (id) => {
   
  };

const getReservaCliente = asyncHandler(async (req, res) => {
    try {

        const ReservasCliente = await ReservaClien.find({ _id: req.params.id }, { asientosSala: 1, asientosNumeroOcupado: 1 })
        res.json({ ReservasCliente });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});