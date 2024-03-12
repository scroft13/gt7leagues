import * as universal from '../entries/pages/user/_username_/_page.ts.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/user/_username_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/user/[username]/+page.ts";
export const imports = ["_app/immutable/nodes/8.cf59b00e.js","_app/immutable/chunks/db.5884f543.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/index.b92c32a5.js","_app/immutable/chunks/index.6262c145.js","_app/immutable/chunks/validation.cefacf6f.js","_app/immutable/chunks/index.8f2ca6db.js","_app/immutable/chunks/control.c2cf8273.js","_app/immutable/chunks/SubmitButton.51288d19.js","_app/immutable/chunks/LabeledTextarea.222fad89.js","_app/immutable/chunks/ConfirmationModal.409de6db.js","_app/immutable/chunks/navigation.eb3a25a9.js","_app/immutable/chunks/singletons.4631b15a.js"];
export const stylesheets = ["_app/immutable/assets/8.32503cb2.css"];
export const fonts = [];
