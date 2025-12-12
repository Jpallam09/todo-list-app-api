export const requireAuth = (req, res, next) => {
    // check if session exists and has a user
    if (!req.session || !req.session.user) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // attach user info to req.user for controller convenience
    req.user = {
        userId: req.session.user.userId,
        username: req.session.user.username,
        email: req.session.user.email
    };

    next();
};
