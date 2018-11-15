/**
 * @flow
 */

declare module "rorre" {
    declare type Dictionary = {
      [string]: string;
    }

    declare interface RorreError<K: string, V: string> {
      message: V,
      name: K,
    }

    declare interface Rorre<T: Dictionary> {
      dictionary: $ReadOnly<T>;
      error: $ReadOnly<{
        [$Keys<T>]: RorreError<$Keys<T>, $Values<T>>
      }>;
      name: $ReadOnly<{
        [$Keys<T>]: $Keys<T>
      }>;
    }

    declare export default {
      declare<T>(dictionary: Dictionary): Rorre<T>;
    }
}
