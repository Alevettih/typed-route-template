import { type EncodeURIComponent } from './encode-uri-component.type';

export type InterpolatedRoute<
  Template extends string,
  Params extends Record<string, string>,
> = Template extends `${infer Start}:${infer Param}/${infer Rest}`
  ? `${Start}${EncodeURIComponent<
      Params[Param & keyof Params]
    >}/${InterpolatedRoute<Rest, Params>}`
  : Template extends `${infer Start}:${infer Param}`
    ? `${Start}${EncodeURIComponent<Params[Param & keyof Params]>}`
    : Template;
