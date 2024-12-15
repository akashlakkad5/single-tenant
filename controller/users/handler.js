const { bcrypt, jwt } = require("../../utils");

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
        let userDetails
        const userLogin = () =>
            new Promise(async (resolve, reject) => {
                try {

                    userDetails = await db.collection('users').findOne({ email: req?.body?.email });

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
        const createToken = () => 
            new Promise(async (resolve, reject) => {
                try {
                    let createToken = await jwt.createToken({ payload: userDetails })
                    if(createToken){
                        await db.collection('tokens').insertOne({
                            user: userDetails?._id,
                            token: createToken
                        })
                    }
                    return resolve();
                } catch (error) {
                    console.log("createToken", error)
                    return reject(error)
                }
            })
        userLogin().then(createToken).then(resolve).catch(reject)
    })

exports.updatePassword = (req) =>
    new Promise((resolve, reject) => {
        try {
            const checkUserExistance = () =>
                new Promise(async (resolve, reject) => {
                    try {
                        let userDetails = await db.collection('users').findOne({
                            _id: req.session._id
                        })
                        if (!userDetails) {
                            return reject({
                                error: 'user not found',
                                code: 412
                            })
                        }
                        return resolve();
                    } catch (error) {
                        console.log("Error: checkUserExistance" + error)
                        return reject(error)
                    }
                })

            const updatePassword = () =>
                new Promise(async (resolve, reject) => {
                    try {
                        if (req?.body?.password !== req?.body?.cPassword) {
                            return reject({
                                error: 'Passwords do not match with the confirm password',
                                code: 412
                            })
                        }
                        let uPassword = await db.collection('users').findOneAndUpdate(
                            { _id: req.session._id }, // Query
                            { $set: { password: await bcrypt.bcryptPassword(req.body.password) } }, // Update
                            { returnDocument: "after" } // Options: Return the updated document
                        );
                        console.log(uPassword)
                        return resolve();
                    } catch (error) {
                        console.log("Error: updatePassword" + error)
                        return reject(error)
                    }
                })

            checkUserExistance().then(updatePassword).then(resolve).catch(reject)

        } catch (error) {
            console.log("updatePassword", error)
            return reject(error)
        }
    })