

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.b7c3a63d.js","_app/immutable/chunks/index.97164529.js","_app/immutable/chunks/singletons.a1058b83.js","_app/immutable/chunks/index.91f9b936.js"];
export const stylesheets = [];
export const fonts = [];
