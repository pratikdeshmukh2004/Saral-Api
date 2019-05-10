var twilio = require('twilio');

// Find your account sid and auth token in your Twilio account Console.
var client = new twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');

// Send the text message.
client.messages.create({
  to: '8130201994',
  from: '1234567890',
  body: 'Hello from Twilio!'
});