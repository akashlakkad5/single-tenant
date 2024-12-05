//

exports.sendResponse = ({ res, statusCode, data }) => {
    res.status(statusCode).json({
        error: statusCode !== 200,
        statusCode,
        data: { ...data, sentDate: new Date() }
    })
}

exports.apiHandler = ({ payload, handler }) => (req, res) => {
    //validate payload

    const validatePayload = () => {
        new Promise((resolve, reject) => {
            try {

                if (!payload) return resolve();

                const { error } = payload.validate(req.body);
                if (error) {
                    return reject({
                        error: error?.details?.[0]?.message,
                        code: 400
                    })
                }
                return resolve();

            } catch (error) {
                console.log("validatePayload", error);
                return reject(error);
            }
        })
    }

    //process handler

    const processHandler = () => {
        new Promise((resolve, reject) => {
            try {

                handler(req, res)?.then(resolve).catch(reject)

            } catch (error) {
                console.log(error, "Processing");
                return reject(error);
            }
        })
    }

    validatePayload().then(processHandler).then((data) => {
        return this.sendResponse(res, statusCode, data);
    }).catch(err => {
        console.log("[ERROR] PATH => ", req.originalUrl, err, JSON.stringify(req.body));
        /** if no error and no code means something wrong in code */
        if (err?.error && err?.code) {
            return (this.sendResponse({ res, statusCode: err.code, data: { ...err } }));
        } else {
            return (this.sendResponse({ res, statusCode: 500, data: err }));
        }
    })

}