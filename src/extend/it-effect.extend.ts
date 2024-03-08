import { Effect, Layer, Logger, TestServices, pipe } from 'effect';
import * as TestEnvironment from 'effect/TestContext';
import { it as vitestIt } from 'vitest';
import type { TestOptions } from 'vitest';

// Need to export from node_modules/@vitest/runner/dist/tasks-_kyNRBhz.d.ts
// - TestCollectorCallable
// - TestEachFunction
// - ExtendedAPI

const TestEnv = TestEnvironment.TestContext.pipe(
  Layer.provide(Logger.remove(Logger.defaultLogger)),
);

const effect = (() => {
  const f = <E, A>(
    name: string,
    self: () => Effect.Effect<A, E, TestServices.TestServices>,
    timeout: number | TestOptions = 5_000,
  ) =>
    vitestIt(
      name,
      () =>
        pipe(Effect.suspend(self), Effect.provide(TestEnv), Effect.runPromise),
      timeout,
    );

  return Object.assign(f, {
    skip: <E, A>(
      name: string,
      self: () => Effect.Effect<A, E, TestServices.TestServices>,
      timeout = 5_000,
    ) =>
      vitestIt.skip(
        name,
        () =>
          pipe(
            Effect.suspend(self),
            Effect.provide(TestEnv),
            Effect.runPromise,
          ),
        timeout,
      ),
    only: <E, A>(
      name: string,
      self: () => Effect.Effect<A, E, TestServices.TestServices>,
      timeout = 5_000,
    ) =>
      vitestIt.only(
        name,
        () =>
          pipe(
            Effect.suspend(self),
            Effect.provide(TestEnv),
            Effect.runPromise,
          ),
        timeout,
      ),
  });
})();

const extendedIt = Object.assign(vitestIt, { effect });

export { extendedIt as it };
