

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/league/_league_name_/noLeague/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.1534babe.js","_app/immutable/chunks/index.704f3127.js","_app/immutable/chunks/ExclamationCircle.4708cda5.js"];
export const stylesheets = [];
export const fonts = [];
