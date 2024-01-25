

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/gt7/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.5434a925.js","_app/immutable/chunks/index.97164529.js","_app/immutable/chunks/index.91f9b936.js"];
export const stylesheets = [];
export const fonts = [];
