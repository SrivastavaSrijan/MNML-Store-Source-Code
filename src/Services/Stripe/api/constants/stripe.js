const configureStripe = require('stripe');

const STRIPE_SECRET_KEY =
  //process.env.NODE_ENV !== 'production'
  'sk_test_51H0pV6D69oy9wBSw0xSfXPqlBOfBnw51AEgwMStxh3YaNnHXcHU8fTy2Iu1kaQBhIbb2q8XXfBt15zfdPg4K3l1i00kV8AGXQ0';
// : 'pk_test_51H0pV6D69oy9wBSwNZMiTHl5ZOTyx1apUaEoElxOEbCIGOQA1deddv1UTRI4DKBOk9VBR7lHbHIcxHFcqmwsZvWr001kD3Mz6p';

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;
