import * as universal from '../entries/pages/user/_user_id_/_page.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/user/_user_id_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/user/[user_id]/+page.ts";
export const imports = ["_app/immutable/nodes/5.6cd17d9d.js","_app/immutable/chunks/index.c4ca6160.js","_app/immutable/chunks/index.8487e16c.js"];
export const stylesheets = [];
export const fonts = [];
