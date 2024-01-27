import * as universal from '../entries/pages/league/_league_name_/_page.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/league/_league_name_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/league/[league_name]/+page.ts";
export const imports = ["_app/immutable/nodes/4.e41e7de4.js","_app/immutable/chunks/index.c4ca6160.js","_app/immutable/chunks/index.8487e16c.js","_app/immutable/chunks/TransitionChildWrapper.25d2c24d.js","_app/immutable/chunks/index.cd608d38.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/validation.2dbfc607.js","_app/immutable/chunks/index.347f6277.js"];
export const stylesheets = ["_app/immutable/assets/4.35bb711e.css"];
export const fonts = [];
