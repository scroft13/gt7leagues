

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.67d71553.js","_app/immutable/chunks/index.a9595408.js","_app/immutable/chunks/TransitionChildWrapper.933fd543.js","_app/immutable/chunks/index.f5d5407f.js","_app/immutable/chunks/index.1a7a1b3b.js"];
export const stylesheets = ["_app/immutable/assets/0.1cd7d17c.css"];
export const fonts = [];
