export function range(start: number, end: number, step: number = 1) {
  let res = [];
  for (start; start <= end; start += step)
    res.push(start);
  return res;
}