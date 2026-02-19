type _Slice<
  Arr extends unknown[],
  Start extends number,
  End extends number,
  Index extends unknown[] = [],
  Started extends boolean = false,
  Result extends unknown[] = [],
> = Index['length'] extends End
  ? Result
  : Arr extends [infer First, ...infer Rest]
    ? Started extends true
      ? _Slice<Rest, Start, End, [...Index, unknown], true, [...Result, First]>
      : Index['length'] extends Start
        ? _Slice<
            Rest,
            Start,
            End,
            [...Index, unknown],
            true,
            [...Result, First]
          >
        : _Slice<Rest, Start, End, [...Index, unknown], false, Result>
    : Result;

export type Slice<
  Arr extends unknown[],
  Start extends number,
  End extends number = Arr['length'],
> = _Slice<Arr, Start, End>;
