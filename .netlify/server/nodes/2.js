

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.b564822b.js","_app/immutable/chunks/index.8487e16c.js","_app/immutable/chunks/index.cd608d38.js","_app/immutable/chunks/TransitionChildWrapper.25d2c24d.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/validation.2dbfc607.js"];
export const stylesheets = ["_app/immutable/assets/2.964cc1aa.css"];
export const fonts = [];
