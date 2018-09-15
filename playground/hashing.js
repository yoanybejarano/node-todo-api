const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

// bcrypt.genSalt(10, (error, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });

var hashed_password = '$2a$10$qjn8VJVNW/139WOGn0gwL.5gwa0yzw47UB8lv3xdg47MN0cPpLYlK';

bcrypt.compare(password, hashed_password,(err, res)=>{
    console.log(res);
});

// var data = {id: 10};
//
// var token = jwt.sign(data, '123abc');
// console.log(`Token: ${token}`);
//
// var decoded = JSON.stringify(jwt.verify(token,'123abc'));
// console.log(`Decoded: ${decoded}`);

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