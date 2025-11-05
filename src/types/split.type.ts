export type Split<S extends string, Sep extends string> = string extends S
  ? string[]
  : S extends ''
    ? []
    : S extends `${infer Part}${Sep}${infer Rest}`
      ? [Part, ...Split<Rest, Sep>]
      : [S];
