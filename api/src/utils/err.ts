export function Err<T>(message: string): T {
  throw new Error(message);
}
