/**
 * Apply a list of mixins to a list of class constructors.
 */

export default function applyMixins(classes: any[], mixins: any[]) {
  classes.forEach(_class =>
    mixins.forEach(mixin =>
      Object
        .getOwnPropertyNames(mixin.prototype)
        .forEach(name => _class.prototype[name] = mixin.prototype[name])))
}
