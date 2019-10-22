const compose = (...fns) => fns.reduceRight(
  (f1, f2) => (...args) => f2(f1(...args)), value => value);

// async functions form a monoid under the asyncCompose operation
const asyncCompose = (f1,f2) => async x => f1( await f2(x));

// A function that takes an arbitrary number of arguments
const asyncCompseArgs = (...args) => args.reduce(asyncCompose, x => x);



const Maybe = value => ({
	value,
	isNothing: () => value === null || typeof value === 'undefined',
	map(f) {
		return this.isNothing() ? Maybe.isNothing() : Maybe(f(value));
	},
	flatten() {
		return this.isNothing() ? Maybe.Nothing() : Maybe(value.value);
	},
	chain(f) {
		return this.isNothing() ? Maybe.Nothing() : this.map(f).flatten();
	},
	getOrElse(defaultValue) {
		return this.isNothing() ? defaultValue : value;
	}
});

Maybe.Nothing = () => ({
	nothing: () => true,
	map: () => Maybe.Nothing(),
	flatten: () => Maybe.Nothing(),
	chain: f => Maybe.Nothing(),
	getOrElse: defaultValue => defaultValue,
	value: null
});

const maybeToEither = maybe =>
	maybe.isNothing() ? Left('no email') : Right(maybe.flatten());

const eitherToMaybe = either => Maybe(either.catch(e => null).flatten());

const TypeOf = obj => Object.prototype.toString.call(obj).slice(8, -1);

// const NumberBox = TypeBox(num => typeof num === 'number', NaN);
// const ObjectBox = TypeBox(obj => TypeOf(obj) === 'Object', null);





module.exports = {
  compose,
  asyncCompseArgs,
  Maybe,
  TypeOf
};
