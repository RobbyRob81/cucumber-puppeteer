const compose = (...fns) =>
  fns.reduceRight(
    (f1, f2) => (...args) => f2(f1(...args)),
    value => value
  );

module.exports = {
  compose
};
