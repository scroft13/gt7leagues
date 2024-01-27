import * as universal from '../entries/pages/confirm-signup/_page.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/confirm-signup/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/confirm-signup/+page.ts";
export const imports = ["_app/immutable/nodes/3.8d32df96.js","_app/immutable/chunks/index.8487e16c.js"];
export const stylesheets = [];
export const fonts = [];
