// 函数的合并
function reverse(x: number): number;
function reverse(X: string): string;
function reverse(x: number | string): number | string {
  if (typeof x == 'number') {
    return Number(
      x
        .toString()
        .split('')
        .reverse()
        .join('')
    );
  } else {
    x.split('')
      .reverse()
      .join('');
  }
}
