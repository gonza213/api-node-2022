const mercadopago = require("mercadopago");

const crearOrden = async (req, res) => {
  // TEST-2249660162772800-071622-265e7f6ebb97d978596c7bf129ff0c8d-1162117741
  const data = req.body;
  const preference = {
    items: data,
    notification_url: "https://65dd-190-191-88-101.sa.ngrok.io/api/mercado-pago/notificacion",
    back_urls: {
        success: "https://www.devsarg.tech/"
    }
  };
  mercadopago.configure({
    access_token:
      "TEST-2249660162772800-071622-265e7f6ebb97d978596c7bf129ff0c8d-1162117741",
  });

  mercadopago.preferences
    .create(preference)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

const notificationOrden = async (req, res) => {
  const datos = req.query;

  console.log(datos);

  res.status(200);
};

module.exports = {
  crearOrden,
  notificationOrden,
};
