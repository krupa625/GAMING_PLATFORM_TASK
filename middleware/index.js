const commonLogger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

module.exports = {
  commonLogger
};
