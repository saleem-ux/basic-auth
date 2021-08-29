'use strict';

const { Users } = require('../../models/index');
const bcrypt = require('bcrypt');
const base64 = require('base-64');

async function signup(req, res, next) {

    try {
        //1- get user info from the request.
        let authHeader = req.headers.authorization;
        // ['Basic username:password']
        console.log(authHeader);

        // let encodedCreditentials = authHeader.split(' ')[1];
        let encodedCreditentials = authHeader.split(' ').pop();

        let decodedCreditentials = base64.decode(encodedCreditentials);
        // username:password
        console.log(decodedCreditentials);

        let [username, password] = decodedCreditentials.split(':');

        //2- TODO: check if the user already exists

        //3- encrypt password
        let hashedPassword = await bcrypt.hash(password, 10);

        //4- create user
        const record = await Users.create({ username, password: hashedPassword });
        res.status(201).json(record);
    } catch (e) {
        console.log(e);
        res.status(403).send('Error Creating User');
        next('Error Creating User');
    }
}

async function signin(req, res, next) {

    try {
        let authHeader = req.headers.authorization;
        // ['Basic username:password']
        console.log(authHeader);

        // let encodedCreditentials = authHeader.split(' ')[1];
        let encodedCreditentials = authHeader.split(' ').pop();

        let decodedCreditentials = base64.decode(encodedCreditentials);
        // username:password
        console.log(decodedCreditentials);

        let [username, password] = decodedCreditentials.split(':');

        // get the user from the database
        const user = await Users.findOne({ where: { username } });
        // compare the password, to make sure that the user is the one that is trying to sign in
        const isValid = await bcrypt.compare(password, user.password);

        if (isValid) {// success
            res.status(200).json(user);
        } else {// unauthenticated
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(403).send('Invalid Login');
    }
}

module.exports = {
    signup,
    signin,
};