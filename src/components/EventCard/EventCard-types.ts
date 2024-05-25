type Seperator = '.';
type Num = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Num2 = Num | 0;

type YY = `19${Num2}${Num2}` | `20${Num2}${Num2}`;
type MM = `0${Num}` | `1${0 | 1 | 2}`;
type DD = `${0}${Num}` | `${1 | 2}${Num2}` | `3${0 | 1}`;

type GenStr<Type extends string> = Type extends 'YY'
  ? YY
  : Type extends 'MM'
    ? MM
    : DD;

export type FormatDate<Pattern extends string> =
  Pattern extends `${infer Aaa}${Seperator}${infer Bbb}${Seperator}${infer Ccc}`
    ? Pattern extends `${Aaa}${infer Sep}${Bbb}${infer _}${Ccc}`
      ? `${GenStr<Aaa>}${Sep}${GenStr<Bbb>}${Sep}${GenStr<Ccc>}`
      : never
    : never;
