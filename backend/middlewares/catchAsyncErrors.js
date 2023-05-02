// module.exports = (func) => {
//   return (req, res, next) => func(req, res, next).catch(next);
// };

// module.exports = (func) => (req, res, next) =>
//   Promise.resolve(func(req, res, next)).catch(next);


const catchAsyncErrors = (func) => (req, res, next) =>
  Promise.resolve(func(req, res, next)).catch(next);

module.exports = catchAsyncErrors;