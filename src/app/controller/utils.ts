export function createID() {
  return Array(8)
    .fill('')
    .map(() =>
      String.fromCodePoint(Math.floor(Math.random() * 26) + 97)
    )
    .join('');
}
