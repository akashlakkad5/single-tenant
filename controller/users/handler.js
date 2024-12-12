const { bcrypt } = require("../../utils");
const { users } = require('../../models');
//register user

exports.registerUser = (req) => {
    return new Promise((resolve, reject) => {
        const checkUserExistance = () => {
            return new Promise(async (resolve, reject) => {
                try {
                    const userDetails = await db.collection('users').findOne({ email: req.body.email, })
                    if (userDetails) {
                        return reject({
                            error: "User Already Exists",
                            code: 400
                        })
                    }
                    return resolve();
                } catch (error) {
                    console.log("Error: checkUserExistance" + error);
                    return reject(error);
                }
            })
        }

        const createUser = () => {
           return new Promise(async (resolve, reject) => {
                try {

                    await db.collection('users').insertOne({
                        ...req.body,
                        password: await bcrypt.bcryptPassword(req.body.password)
                    })

                    return resolve({ ...req.body })

                } catch (error) {
                    console.log('error creating user', error);
                    return reject(error);
                }
            })
        }

        checkUserExistance().then(createUser).then(resolve).catch(reject);
    })
}

exports.login = (req) =>
    new Promise((resolve, reject) => {

        const userLogin = () =>
            new Promise(async (resolve, reject) => {
                try {

                    const userDetails = await db.collection('users').find({ email: req?.body?.email })

                    if (!userDetails) {
                        return reject({
                            error: 'User not found',
                            code: 404,
                        })
                    }

                    const userPassword = userDetails?.password

                    const verifyPassword = await bcrypt.comparePassword(req?.body?.password, userPassword)
                    if (!verifyPassword) {
                        return reject({
                            error: "Invalid user email or password",
                            code: 404,
                        })
                    }

                    return resolve();

                } catch (error) {
                    console.log("ERROR: userLogin" + error)
                    return reject(error)
                }
            })
            userLogin().then(resolve).catch(reject)
    })