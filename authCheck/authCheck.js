import jwt from "jsonwebtoken";

const verifyUser = (req, res, next) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    next();
  } else {
    return res.status(401).send("You aren't an admin");
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    return res.status(401).send("You aren't an admin");
  }
};

export const verifySessionTokenUser = (req, res, next) => {
  const token = req.cookies.session_token;
  if (!token) {
    return res.status(401).send("Not authorized");
  }
  jwt.verify(token, process.env.SECRET_JWT, (err, user) => {
    if (err) {
      return res.status(404).send("Token isn't valid");
    }
    req.user = user;

    verifyUser(req, res, next);
  });
};

export const verifySessionTokenAdmin = (req, res, next) => {
  const token = req.cookies.session_token;
  if (!token) {
    return res.status(401).send("Not authorized");
  }
  jwt.verify(token, process.env.SECRET_JWT, (err, decodedToken) => {
    if (err) {
      return res.status(404).send("Token isn't valid");
    }
    req.user = decodedToken;

    verifyAdmin(req, res, next);
  });
};
