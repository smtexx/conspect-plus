export function createId(length: number): string {
  return Math.floor(Math.random() * 10 ** length).toString();
}
