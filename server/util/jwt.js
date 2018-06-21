const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');
const {
  JWT_COOKIE_KEY,
  JWT_EXPIRE_TIME,
  JWT_COOKIE_MAX_AGE,
  JWT_SECRET,
} = require('../../config/server');

const secret =
  JWT_SECRET ||
  crypto
    .randomBytes(64)
    .toString('hex')
    .slice(0, 64);

function getToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies[JWT_COOKIE_KEY]) {
    return req.cookies[JWT_COOKIE_KEY];
  }
  return null;
}

function setNoCacheHeader(res) {
  res.setHeader('Surrogate-Control', 'no-store');
  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  );
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
}

export const jwtSign = (payload) =>
  jwt.sign(payload, secret, { expiresIn: JWT_EXPIRE_TIME });

export const jwtVerify = (token) => jwt.verify(token, secret);

export const jwtAuth = (options) => (req, res, next) => {
  setNoCacheHeader(res);
  expressjwt(Object.assign({ getToken, secret }, options))(req, res, (e) => {
    next(e);
  });
};

export const AUTH_COOKIE_OPTION = {
  httpOnly: true,
  maxAge: JWT_COOKIE_MAX_AGE,
  secure: !!process.env.production,
};

export default jwtAuth;
