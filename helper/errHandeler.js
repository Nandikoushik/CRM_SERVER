
const { getDb } = require("../loader/db");
const { isodate, objectify } = require("./helper");
const errHandeler = async (err, req, res, next) => {
    try {
        const db = getDb();
        const user = req?.user && JSON.parse(req?.user);
        const statusCode = err?.statusCode || 400;
        const message = err?.message || 'Invalid Request ';
        const stack = err?.stack || null;
        if (stack && statusCode !== 429) await db.collection("errLog").insertOne({ statusCode: statusCode, message: message, stack: stack, createdDate: isodate(new Date().toLocaleString("en-US", {timeZone: 'America/Chicago'})), reqUser: objectify(user?.data[0]?._id) });
        err?.stack && delete err.stack;
        res && res.status(statusCode).json({ success: false, ...err, data: [] });
    } catch (error) {
        console.log('Error On ErrorHandler =>', error.message);
    }
}
module.exports = errHandeler;