//

exports.sendResponse = (res, statusCode, data) => {
    res.status(statusCode).json({
        error: statusCode !== 200,
        statusCode,
        data: { ...data, sentDate: new Date() }
    });
};

exports.apiHandler = ({ payload, handler }) => async (req, res) => {
    // Validate payload
    const validatePayload = async () => {
        if (!payload) return;
        const { error } = payload.validate(req.body);
        if (error) {
            throw {
                error: error?.details?.[0]?.message,
                code: 400,
            };
        }
    };

    // Process handler
    const processHandler = async () => {
        try {
            return await handler(req, res);
        } catch (error) {
            console.error("[ERROR] Processing handler:", error);
            throw error;
        }
    };

    try {
        // Step 1: Validate payload
        await validatePayload();

        // Step 2: Process handler
        const data = await processHandler();

        // Successful processing
        this.sendResponse(res, 200, data);
    } catch (err) {
        console.error("[ERROR] PATH =>", req.originalUrl, err, JSON.stringify(req.body));

        // Send error response
        if (err?.error && err?.code) {
            this.sendResponse(res, err.code, { ...err });
        } else {
            this.sendResponse(res, 500, { error: "Internal Server Error", details: err });
        }
    }
};
