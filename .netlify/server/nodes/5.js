

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/gt7/allCars/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.84a99400.js","_app/immutable/chunks/index.97164529.js","_app/immutable/chunks/CarCard.8ad91509.js","_app/immutable/chunks/stores.d55e1904.js","_app/immutable/chunks/index.91f9b936.js","_app/immutable/chunks/preload-helper.a4192956.js"];
export const stylesheets = [];
export const fonts = [];
