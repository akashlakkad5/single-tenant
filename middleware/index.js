const { payload, jwt } = require("../utils");

exports.auth = async (req, res, next) => {

    let token = req.headers.authorization;
    if (!token) {
        return payload.sendResponse({
            res,
            statusCode: 401,
            data: { error: 'Unauthorized' }
        })
    }

    let data = await jwt.verifyToken(token);

    let userDetails = await db.collection('users').findOne({ email: data.email });
    if (!userDetails) {
        return payload.sendResponse({
            res,
            statusCode: 401,
            data: { error: 'Unauthorized' }
        })
    }
    req.session = {
        firstName: userDetail?.firstName,
        lastName: userDetail?.lastName,
        _id: userDetail?._id,
        email: userDetail?.email,
    };

    next();
}