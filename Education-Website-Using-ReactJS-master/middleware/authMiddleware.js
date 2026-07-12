const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    
    if (!token) {
        return res.status(403).json({ message: "Token নেই! Login করুন।" });
    }

    try {
        const decoded = jwt.verify(token, "mysecretkey");
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token Invalid বা Expired!" });
    }
};

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === "admin") {
            next();
        } else {
            res.status(403).json({ message: "শুধুমাত্র Admin এর জন্য!" });
        }
    });
};

module.exports = { verifyToken, verifyAdmin };