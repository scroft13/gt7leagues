

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.14fdca48.js","_app/immutable/chunks/index.8487e16c.js","_app/immutable/chunks/singletons.24d2cb2a.js","_app/immutable/chunks/index.cd608d38.js"];
export const stylesheets = [];
export const fonts = [];
