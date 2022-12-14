/**
 * Moves an element in an array from one spot to another. Only supports single moves
 * for now.
 *
 * @param arr The array in which to perform the manipulation
 * @param move The index of the element that should move
 * @param to The index where the element should move
 * @returns The array after the transformation is complete
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function arrayMove(arr: Array<any>, move: number, to: number) {
  if (arr.length <= 1 || move == to) {
    return arr;
  }
  const moving = arr[move];
  if (move < to) {
    // loop through the array moving elements to the left
    for (let i = move; i < to; i++) {
      arr[i] = arr[i + 1];
    }
  } else {
    // loop through the array moving elements to the right
    for (let i = move; i > to; i--) {
      arr[i] = arr[i - 1];
    }
  }
  arr[to] = moving;
  return arr;
}
