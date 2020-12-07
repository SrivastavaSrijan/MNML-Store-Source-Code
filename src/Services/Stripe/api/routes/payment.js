const stripe = require('../constants/stripe');

// const postStripeCharge = (res) => (stripeErr, stripeRes) => {
//   if (stripeErr) {
//     res.status(500).send({ error: stripeErr });
//   } else {
//     res.status(200).send({ success: stripeRes });
//   }
// };

const paymentApi = (app) => {
  app.get('/', (req, res) => {
    res.send({
      message: 'Hello Stripe checkout server!',
      timestamp: new Date().toISOString(),
    });
  });

  app.post('/', async (req, res, next) => {
    const { amount } = req.body;
    try {
      const paymentIntent = await stripe.paymentIntents.create(
        {
          amount,
          currency: 'inr',
        },
        // postStripeCharge(res),
      );
      res.status(200).send(paymentIntent.client_secret);
    } catch (err) {
      next(err, res);
    }
  });
  app.use((err, req, res, next) => {
    // handle error here
    res.status(500).json({ statusCode: 500, message: err.message });
  });

  return app;
};

module.exports = paymentApi;
