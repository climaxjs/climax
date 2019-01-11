const R = require('ramda')

const between = (min, max, included) => {
  if (included === undefined) included = true

  return included
    ? R.both(R.gte(R.__, min), R.lte(R.__, max))
    : R.both(R.gt(R.__, min), R.lt(R.__, max))
}

const isBetween = between(-1, 1, false)

console.log(isBetween(-2))
console.log(isBetween(-1))
console.log(isBetween(0))
console.log(isBetween(1))
console.log(isBetween(2))

// console.log(isIntegerC(1))
// console.log(isIntegerC(1.2))
