
// eslint-disable-next-line no-unused-vars
export default () => (err, req, res, next) => {
  res.status(500);
  res.send({
    code: err.code,
    message: err.message
  });
}
