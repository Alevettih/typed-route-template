type EncodeChar<C extends string> = C extends '%'
  ? '%25'
  : C extends ' '
    ? '%20'
    : C extends '/'
      ? '%2F'
      : C extends ':'
        ? '%3A'
        : C extends '?'
          ? '%3F'
          : C extends '#'
            ? '%23'
            : C extends '&'
              ? '%26'
              : C extends '='
                ? '%3D'
                : C extends '+'
                  ? '%2B'
                  : C extends '@'
                    ? '%40'
                    : C extends '['
                      ? '%5B'
                      : C extends ']'
                        ? '%5D'
                        : C extends '"'
                          ? '%22'
                          : C extends "'"
                            ? '%27'
                            : C extends '<'
                              ? '%3C'
                              : C extends '>'
                                ? '%3E'
                                : C;

export type EncodeURIComponent<S extends string> = string extends S
  ? string
  : S extends `${infer First}${infer Rest}`
    ? `${EncodeChar<First>}${EncodeURIComponent<Rest>}`
    : S;
