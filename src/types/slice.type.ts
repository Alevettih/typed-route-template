export type Slice<
  Arr extends unknown[],
  Start extends number,
  Result extends unknown[] = [],
> = Result['length'] extends Start
  ? Arr
  : Arr extends [infer First, ...infer Rest]
    ? Slice<Rest, Start, [...Result, First]>
    : [];
