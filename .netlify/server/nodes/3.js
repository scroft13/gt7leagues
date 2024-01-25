

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.c625737c.js","_app/immutable/chunks/index.97164529.js"];
export const stylesheets = ["_app/immutable/assets/3.32503cb2.css"];
export const fonts = [];
