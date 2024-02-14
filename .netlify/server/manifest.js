export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","favicon.png","gt7/carImages/1069.jpeg","profilePic.jpeg","resume.pdf","resume_old.pdf"]),
	mimeTypes: {".png":"image/png",".jpeg":"image/jpeg",".pdf":"application/pdf"},
	_: {
		client: {"start":"_app/immutable/entry/start.25213402.js","app":"_app/immutable/entry/app.4ef5bdb3.js","imports":["_app/immutable/entry/start.25213402.js","_app/immutable/chunks/index.704f3127.js","_app/immutable/chunks/singletons.739f471f.js","_app/immutable/chunks/index.24360f55.js","_app/immutable/chunks/control.c2cf8273.js","_app/immutable/entry/app.4ef5bdb3.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/index.704f3127.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js'))
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
})();
