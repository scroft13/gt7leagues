

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.ecb89dfe.js","_app/immutable/chunks/index.704f3127.js","_app/immutable/chunks/singletons.739f471f.js","_app/immutable/chunks/index.24360f55.js","_app/immutable/chunks/ExclamationCircle.4708cda5.js"];
export const stylesheets = [];
export const fonts = [];
