import * as universal from '../entries/pages/league/_league_name_/_page.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/league/_league_name_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/league/[league_name]/+page.ts";
export const imports = ["_app/immutable/nodes/4.932fe1d1.js","_app/immutable/chunks/db.c0707d40.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/index.f5d5407f.js","_app/immutable/chunks/index.a9595408.js","_app/immutable/chunks/paths.d767b3ac.js","_app/immutable/chunks/TransitionChildWrapper.933fd543.js","_app/immutable/chunks/LabeledTextarea.e06870c4.js","_app/immutable/chunks/singletons.fdad3d4c.js","_app/immutable/chunks/index.1a7a1b3b.js"];
export const stylesheets = ["_app/immutable/assets/4.35bb711e.css"];
export const fonts = [];
