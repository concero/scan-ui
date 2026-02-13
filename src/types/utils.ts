export type OmitTyped<Obj extends object, Keys extends keyof Obj> = Omit<Obj, Keys>

/**
 * Enables autocomplete for known values while allowing custom strings matching a template.
 * Improves DX: IDE suggests `KnownValues`, but accepts any `AllowedTemplate` string.
 *
 * @example
 * ```ts
 * type Gap = HintedString<'space_1' | 'space_2', `${number}px`>;
 * const gap: Gap = 'space_1';   // ✅ suggested
 * const gap: Gap = '12px';      // ✅ allowed
 * const gap: Gap = 'invalid';   // ❌ not assignable
 * ```
 */
export type HintedString<KnownValues extends string, AllowedTemplate extends string = string> =
	| (AllowedTemplate & {})
	| KnownValues
