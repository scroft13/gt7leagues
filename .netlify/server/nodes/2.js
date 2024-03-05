import * as universal from '../entries/pages/_page.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/2.02bd4185.js","_app/immutable/chunks/db.5884f543.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/index.b92c32a5.js","_app/immutable/chunks/index.6262c145.js","_app/immutable/chunks/SetUsername.ce587102.js","_app/immutable/chunks/SubmitButton.51288d19.js","_app/immutable/chunks/validation.cefacf6f.js","_app/immutable/chunks/LabeledField.52efb70d.js","_app/immutable/chunks/LabeledPassword.f66ba50d.js","_app/immutable/chunks/LabeledTextarea.222fad89.js","_app/immutable/chunks/navigation.eb3a25a9.js","_app/immutable/chunks/singletons.4631b15a.js"];
export const stylesheets = ["_app/immutable/assets/2.84e5596b.css"];
export const fonts = [];
