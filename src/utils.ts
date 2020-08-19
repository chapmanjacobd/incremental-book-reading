// if less than 500 words, append until 500

// check files in

// remove lines: https://stackoverflow.com/questions/38843016/how-to-remove-one-line-from-a-txt-file

// shell.cd('lib')
// shell.ls('*.js').forEach(function (file) {
//   shell.sed('-i', /^.*REMOVE_THIS_LINE.*$/, '', file)
//   shell.sed('-i', /.*REPLACE_LINE_WITH_MACRO.*\n/, shell.cat('macro.js'), file)
// })
// shell.cd('..')

function range(start: number, end: number): number[] {
  const isReverse = start > end;
  const targetLength = isReverse ? start - end + 1 : end - start + 1;
  const arr = new Array(targetLength);
  const b = Array.apply(null, arr);
  const result = b.map((discard, n) => {
    return isReverse ? n + end : n + start;
  });

  return isReverse ? result.reverse() : result;
}

function arrayResize(array: any[], integer: number) {
  const factor = array.length / integer;

  return Array.apply(null, { length: integer }).map(function (_: any, i: number) {
    return array[Math.floor(i * factor)];
  });
}

export function nextCron(emailsPerMonth: number) {
  const days = emailDays(emailsPerMonth);

  const nextDay = days.filter((x) => x >= new Date().getDate() + 1)[0];

  return `* * ${nextDay} * *`;
}

export function emailDays(emailsPerMonth: number): number[] {
  return arrayResize(range(1, 31), emailsPerMonth);
}
