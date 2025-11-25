# @alevettih/typed-route-template

A tiny, type-safe helper for building and reusing parameterised URL/route templates in TypeScript. It keeps your runtime API simple while leveraging modern template literal types to prevent mismatched parameters at compile time.

## Features

- Runtime API centred on a single `RouteTemplate` class.
- Compile-time inference of required route parameters from `:param` placeholders.
- Type-safe `interpolate` that rejects missing params before code runs.
- Ability to slice a route from any segment with a typed `get` helper.
- Zero runtime dependencies, tree-shakeable, written in TypeScript 5.9.

## Installation

```bash
npm i @alevettih/typed-route-template
```

The package ships precompiled JavaScript (`dist/public-api.js`) and corresponding `.d.ts` types, so it works out of the box in both TS and modern JS toolchains.

## Quick Start

```ts
import { RouteTemplate } from '@alevettih/typed-route-template';

const postRoute = new RouteTemplate('/users/:userId/posts/:postId');

// ✅ Type-safe params inference: { userId: string; postId: string }
const href = postRoute.interpolate({ userId: '42', postId: '99' });
// -> '/users/42/posts/99'

// ✅ Typed slicing: inferred literal 'posts/:postId'
const detailSegment = postRoute.get(3);
```

If you omit a required parameter, TypeScript catches it immediately:

```ts
postRoute.interpolate({ userId: '42' }); // TS error: postId is missing
```

At runtime, `interpolate` also throws when a required value is `null`, `undefined`, or an empty string, helping you surface issues early.

## API

### `class RouteTemplate<T extends string>`

Creates a reusable, typed representation of a colon-delimited route template.

#### Constructor

```ts
new RouteTemplate('/path/:segment');
```

Stores the template string and automatically records parameter names for later interpolation.

#### `get(segmentIndex?: number): string`

- `segmentIndex` (optional, default `0`): zero-based index of the segment to start from.
- Returns either the entire template (when omitted or `0`) or the remaining path starting at the provided segment.
- A conditional type `SplitAndJoin` ensures literal return types when the `segmentIndex` is known at compile time.

#### `interpolate(params: Record<string, string>): string`

- `params`: object containing all named parameters discovered in the template.
- Returns the template with every `:param` replaced by a URI-encoded value.
- Throws when a required value is missing or falsy.

### Type Utilities

While you typically interact only with `RouteTemplate`, the package also exposes advanced literal types that power its inference:

- `ExtractRouteParams<T>` converts a template string into an object type containing all parameter names.
- `Split`, `Slice`, and `Join` are internal building blocks that let `get` return precise literal slices.
- `MergeIntersection<T>` is a helper that normalises intersections of inferred types.

These types are surfaced through the public API so you can compose them in more advanced scenarios if needed.

## Error Handling

Calling `interpolate` with missing values throws a descriptive error (`Param <name> is not defined`). You can catch this and respond with a 400/422 HTTP status, log telemetry, or fallback to a default route.

## Usage Tips

- Keep template strings literal (e.g. `const route = new RouteTemplate('/foo/:bar')`) so TypeScript can infer parameter objects accurately.
- When working with frameworks like Express, Remix, or Angular, store your route templates centrally and let handlers extract both the typed params and human-friendly URLs from a single source of truth.
- Because values are URI-encoded automatically, you can safely interpolate query-like strings or values containing spaces.

## Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/Alevettih/typed-route-template.git
cd typed-route-template
npm install
```

Available scripts:

- `npm run build:dev` – Type-check and emit the development build.
- `npm run build:prod` – Produce the production build.
- `npm test` – Run the Vitest test suite.
- `npm run lint` – Lint the project with ESLint.
- `npm run format` – Format sources with Prettier.

## Contributing

Bug reports and pull requests are welcome on GitHub. Please include tests when fixing bugs or adding features, and run the lint and test suites before submitting a PR.

## License

MIT © Alexandr Tikhonenko

# @alevettih/typed-route-template
