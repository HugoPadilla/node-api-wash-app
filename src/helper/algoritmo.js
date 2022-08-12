const { getLavadorForState, updateStateLavador } = require("../database/queryLavador");
const {
    updateStateOfSolicitud,
    updateIdLavadorOfSolicitude,
} = require("../database/Quety/QuerySolicitudes");

const changeLavadorForCurrentSolicitude = async (solicitudeInserted) => {
    // 1. query lavadro disponible
    const result = await getLavadorForState("true");
    

    // 2. update solicitude (id lavador, estado);
    if (result.rowCount > 0) {
        const lavadorDisponible = result.rows[0];

        // Actualza el estado de la solicitud de pendiente a asignado
        await updateStateOfSolicitud(solicitudeInserted.id, "asignado");

        // Asigna el id de lavador en la solicitud que fue insertada
        const resultAfterChange = await updateIdLavadorOfSolicitude(
            solicitudeInserted.id,
            lavadorDisponible.id
        );
        
        // Actualiza el status del lavador por el miso valor actual para solo actulizar la fecha.
        await updateStateLavador(lavadorDisponible.id, lavadorDisponible.status);

        return resultAfterChange.rows[0];
    }
};

module.exports = {
    changeLavadorForCurrentSolicitude,
};
