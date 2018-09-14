const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {id: 10};

var token = jwt.sign(data, '123abc');
console.log(`Token: ${token}`);

var decoded = JSON.stringify(jwt.verify(token,'123abc'));
console.log(`Decoded: ${decoded}`);

// var message = 'beyonder';
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Result: ${hash}`);
//
// var data = {id: 4};
// var token = {
//     data, hash: SHA256(JSON.stringify(data + 'somesecret')).toString()
// };
//
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(data)).toString();
//
// var result_hash = SHA256(JSON.stringify(token.data + 'somesecret')).toString();
// if(result_hash === token.hash){
//     console.log('Data has not changed.');
// }else {
//     console.log('Data has changed. Do not trust!');
// }