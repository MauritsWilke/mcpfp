import { expect, test } from 'vitest';
import placeholder from "@scripts/placeholder";
// Edit an assertion and save to see HMR in action

test('Placeholder test', () => {
	expect(placeholder(1, 2)).toBe(3);
});