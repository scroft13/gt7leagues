

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.fd7b6385.js","_app/immutable/chunks/index.6262c145.js","_app/immutable/chunks/singletons.4631b15a.js","_app/immutable/chunks/index.b92c32a5.js","_app/immutable/chunks/ExclamationCircle.369a0c0f.js"];
export const stylesheets = [];
export const fonts = [];
