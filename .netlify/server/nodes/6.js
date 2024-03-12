

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/league/_league_name_/noLeague/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.77857f64.js","_app/immutable/chunks/index.6262c145.js","_app/immutable/chunks/ExclamationCircle.369a0c0f.js"];
export const stylesheets = [];
export const fonts = [];
