import { Effect } from 'effect';
import { describe, expect, vi } from 'vitest';

import { it } from '../extend/it-effect.extend';

describe('yolo bro', () => {
  it.effect('should effect', () =>
    Effect.gen(function* (_) {
      return yield* _(Effect.fail({ _tag: 'Yolo', error: 'Oh no' }));
    }),
  );

  it('should not effect', () => {
    expect(true).toBe(true);
  });
});
