import { type ExtractRouteParams } from '../types/extract-route-params.type';
import { type InterpolatedRoute } from '../types/interpolated-route.type';
import { type MergeIntersection } from '../types/merge-intersection.type';
import { type SplitAndJoin } from '../types/split-and-join.type';
import { type Split } from '../types/split.type';

export class RouteTemplate<const T extends string> {
  readonly #template: T;
  readonly #paramNames: string[];

  constructor(template: T) {
    this.#template = template;
    this.#paramNames =
      template
        .match(/:(\w+)/g)
        ?.map((param: string): string => param.slice(1)) ?? [];
  }

  public get<
    From extends number = 0,
    To extends number = Split<T, '/'>['length'],
  >(fromIndex?: From, toIndex?: To): SplitAndJoin<T, From, To> {
    return (
      typeof fromIndex === 'number'
        ? this.#template.split('/').slice(fromIndex, toIndex).join('/')
        : this.#template
    ) as SplitAndJoin<T, From, To>;
  }

  public interpolate<
    const P extends MergeIntersection<ExtractRouteParams<T>> &
      Record<string, string>,
  >(params: P): InterpolatedRoute<T, P> {
    let result: string = this.#template as string;

    for (const paramName of this.#paramNames) {
      const param = params[paramName as keyof P];

      if (!param) {
        throw new Error(`Param ${paramName} is not defined`);
      }

      result = result.replace(
        new RegExp(`:${paramName}(?=\\/|$)`, 'g'),
        encodeURIComponent(String(param)),
      );
    }

    return result as InterpolatedRoute<T, P>;
  }
}
