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
  if (move - to > 1) {
    console.warn('AAAAH I only support single moves!');
    return arr;
  }
  // todo loop here to handle moving things more than one place
  return swap(arr, move, to);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function swap(arr: Array<any>, move: number, to: number) {
  const movedElement = arr[move];
  arr[move] = arr[to];
  arr[to] = movedElement;
  return arr;
}
