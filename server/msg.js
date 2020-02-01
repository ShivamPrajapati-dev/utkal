var twilio = require('twilio');
// console.log("running...");
// // Find your account sid and auth token in your Twilio account Console.
//     var client = new twilio('AC76432d52b7c513e4b39dfc54eb93b355', '2d9f6d69b6a6a12cbccee1e1618157e0');
//                 client.messages.create({
//   to: '8960507109',
//   from: '6265070160',
//   body: 'Hello from Twilio!'
// });

const accountSid = 'AC76432d52b7c513e4b39dfc54eb93b355';
const authToken = '2d9f6d69b6a6a12cbccee1e1618157e0';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     to: '+918960507109',
     from: '6265070160',
   })
  .then(message => console.log(message.sid)).catch(err=>console.log(err));
