

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.260d7f9c.js","_app/immutable/chunks/index.a9595408.js","_app/immutable/chunks/singletons.fdad3d4c.js","_app/immutable/chunks/index.f5d5407f.js","_app/immutable/chunks/paths.d767b3ac.js","_app/immutable/chunks/ExclamationCircle.55b3f94e.js"];
export const stylesheets = [];
export const fonts = [];
