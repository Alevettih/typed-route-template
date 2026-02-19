import { type Join } from './join.type';
import { type Slice } from './slice.type';
import { type Split } from './split.type';

export type SplitAndJoin<
  S extends string,
  From extends number,
  To extends number,
> = Join<Slice<Split<S, '/'>, From, To>, '/'>;
