const { payload, jwt } = require("../utils");

exports.auth = async (req, res, next) => {
    let userDetails
    let token = req.headers.authorization;
    if (!token) {
        return payload.sendResponse({
            res,
            statusCode: 401,
            data: { error: 'Unauthorized' }
        })
    }

    let data = await jwt.verifyToken(token);

    userDetails = await db.collection('users').findOne({ email: data.email });
    if (!userDetails) {
        return payload.sendResponse({
            res,
            statusCode: 401,
            data: { error: 'Unauthorized' }
        })
    }
    req.session = {
        firstName: userDetails?.firstName,
        lastName: userDetails?.lastName,
        _id: userDetails?._id,
        email: userDetails?.email,
    };

    next();
}