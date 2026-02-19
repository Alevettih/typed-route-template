import { type ExtractRouteParams } from '../types/extract-route-params.type';
import { type MergeIntersection } from '../types/merge-intersection.type';
import { type SplitAndJoin } from '../types/split-and-join.type';

export class RouteTemplate<T extends string> {
  readonly #template: T;
  readonly #paramNames: string[];

  constructor(template: T) {
    this.#template = template;
    this.#paramNames =
      template
        .match(/:(\w+)/g)
        ?.map((param: string): string => param.slice(1)) ?? [];
  }

  public get<From extends number = 0, To extends number = 0>(
    fromIndex?: From,
    toIndex?: To,
  ): SplitAndJoin<T, From, To> {
    return (
      fromIndex
        ? this.#template.split('/').slice(fromIndex, toIndex).join('/')
        : this.#template
    ) as SplitAndJoin<T, From, To>;
  }

  public interpolate(params: MergeIntersection<ExtractRouteParams<T>>): string {
    let result: string = this.#template as string;

    for (const paramName of this.#paramNames) {
      const param: MergeIntersection<
        ExtractRouteParams<T>
      >[keyof typeof params] = params[paramName as keyof typeof params];

      if (!param) {
        throw new Error(`Param ${paramName} is not defined`);
      }

      result = result.replace(
        new RegExp(`:${paramName}(?=\\/|$)`, 'g'),
        encodeURIComponent(param as string),
      );
    }
    return result;
  }
}
