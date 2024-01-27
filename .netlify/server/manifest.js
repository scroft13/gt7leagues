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
		client: {"start":"_app/immutable/entry/start.200b573b.js","app":"_app/immutable/entry/app.38dc6657.js","imports":["_app/immutable/entry/start.200b573b.js","_app/immutable/chunks/index.8487e16c.js","_app/immutable/chunks/singletons.1d1838b1.js","_app/immutable/chunks/index.cd608d38.js","_app/immutable/entry/app.38dc6657.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/index.8487e16c.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js'))
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
				endpoint: __memo(() => import('./entries/endpoints/confirm-signup/_server.js'))
			},
			{
				id: "/league/[league_name]",
				pattern: /^\/league\/([^/]+?)\/?$/,
				params: [{"name":"league_name","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/user/[user_id]",
				pattern: /^\/user\/([^/]+?)\/?$/,
				params: [{"name":"user_id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
