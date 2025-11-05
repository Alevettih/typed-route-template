import { type Join } from './join.type';
import { type Slice } from './slice.type';
import { type Split } from './split.type';

export type SplitAndJoin<S extends string, Index extends number> = Join<
  Slice<Split<S, '/'>, Index>,
  '/'
>;
