

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/league/_league_name_/noLeague/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.a4ae46c4.js","_app/immutable/chunks/index.a9595408.js","_app/immutable/chunks/ExclamationCircle.55b3f94e.js"];
export const stylesheets = [];
export const fonts = [];
