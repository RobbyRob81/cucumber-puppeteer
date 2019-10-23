const {List} = require("immutable");

const compose = (...fns) => fns.reduceRight(
  (f1, f2) => (...args) => f2(f1(...args)), value => value);

// async functions form a monoid under the asyncCompose operation
const asyncCompose = (f1,f2) => async x => f1( await f2(x));

// A function that takes an arbitrary number of arguments
const asyncCompseArgs = (...args) => args.reduce(asyncCompose, x => x);

const flow = (func1, func2) => async x => func2(await func1(x));
const flowArgs = (...args) => args.reduce(flow, x => x);



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

const Right = value => ({
	value,
	inspect: () => `Right(${value})`,
	map: f => Right(f(value)),
	flatten: () => Right(value.value),
	chain(f) {
		return Right(this.map(f).flatten());
	},
	catch: f => Left(value)
});

const Left = value => ({
	value,
	inspect: () => `Left(${value})`,
	map: f => Left(value),
	flatten: () => Left(value),
	chain: () => Left(value),
	catch: f => Right(f(value))
});

const tryCatch = f => value => {
	try {
		return Right(f(value));
	} catch (error) {
		return Left(error);
	}
};

const get = key => object => object[key];


// const First = x => ({
//   fold: f => fold(either),
//   concat: () => either.isLeft ? Left: First(either)
// })

// First.empty = () => First(Left());

// const find = (xs, f) =>
//     List(xs)
//     .foldMap(x =>
//         First(f(x) ? Right(x) : Left(), First.empty()))
//     .fold(x => x)


module.exports = {
	asyncCompseArgs,
	compose,
	flow,
	flowArgs,
	Maybe
};
