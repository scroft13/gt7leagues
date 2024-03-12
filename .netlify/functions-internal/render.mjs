import { init } from '../serverless.js';

export const handler = init((() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","GT7L.png","GT7L_Alt.png","favicon.png","faviconALT.png","gt7/carImages/1069.jpeg"]),
	mimeTypes: {".png":"image/png",".jpeg":"image/jpeg"},
	_: {
		client: {"start":"_app/immutable/entry/start.d7d24135.js","app":"_app/immutable/entry/app.e3f83034.js","imports":["_app/immutable/entry/start.d7d24135.js","_app/immutable/chunks/index.6262c145.js","_app/immutable/chunks/singletons.4631b15a.js","_app/immutable/chunks/index.b92c32a5.js","_app/immutable/chunks/control.c2cf8273.js","_app/immutable/entry/app.e3f83034.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/index.6262c145.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js')),
			__memo(() => import('../server/nodes/3.js')),
			__memo(() => import('../server/nodes/4.js')),
			__memo(() => import('../server/nodes/5.js')),
			__memo(() => import('../server/nodes/6.js')),
			__memo(() => import('../server/nodes/7.js')),
			__memo(() => import('../server/nodes/8.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/confirm-signup",
				pattern: /^\/confirm-signup\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/league/[league_name]",
				pattern: /^\/league\/([^/]+?)\/?$/,
				params: [{"name":"league_name","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/league/[league_name]/noLeague",
				pattern: /^\/league\/([^/]+?)\/noLeague\/?$/,
				params: [{"name":"league_name","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/league/[league_name]/[series]",
				pattern: /^\/league\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"league_name","optional":false,"rest":false,"chained":false},{"name":"series","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/password-reset",
				pattern: /^\/password-reset\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/user/[username]",
				pattern: /^\/user\/([^/]+?)\/?$/,
				params: [{"name":"username","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})());
