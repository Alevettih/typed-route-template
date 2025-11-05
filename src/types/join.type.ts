export type Join<Arr extends unknown[], Sep extends string> = Arr extends []
  ? ''
  : Arr extends [infer First]
    ? `${First & string}`
    : Arr extends [infer First, ...infer Rest]
      ? `${First & string}${Sep}${Join<Rest, Sep>}`
      : '';
