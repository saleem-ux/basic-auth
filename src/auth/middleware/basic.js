'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { UsersModel } = require('../models/index');


module.exports = async (req, res, next) => {
    if (req.headers["authorization"]) {
        let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
        console.log('basicHeaderParts', basicHeaderParts);
        let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
        let decodedString = base64.decode(encodedString); // "username:password"
        let [username, password] = decodedString.split(':'); // username, password
        console.log('decodedString', decodedString, username, password);



        try {

            const user = await UsersModel.findOne({ where: { username: username } })
            console.log('user', user);
            if (!user || !password) {
                res.status(403).json('Wrong User / password');
                return;
            }
            const valid = await bcrypt.compare(password, user.password);
            console.log('user:', user, 'valid', valid);
            if (valid) {
                req.user = user;
                next();
            }

            else {

                throw new Error('Invalid User')
            }
        } catch (error) {
            console.log(error);

            res.status(403).send("Invalid Login");
        }
    }
}