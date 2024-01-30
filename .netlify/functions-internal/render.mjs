import { init } from '../serverless.js';

export const handler = init((() => {
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
		client: {"start":"_app/immutable/entry/start.9d325272.js","app":"_app/immutable/entry/app.4e71157c.js","imports":["_app/immutable/entry/start.9d325272.js","_app/immutable/chunks/index.a9595408.js","_app/immutable/chunks/singletons.fdad3d4c.js","_app/immutable/chunks/index.f5d5407f.js","_app/immutable/chunks/paths.d767b3ac.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/entry/app.4e71157c.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/index.a9595408.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js')),
			__memo(() => import('../server/nodes/3.js')),
			__memo(() => import('../server/nodes/4.js')),
			__memo(() => import('../server/nodes/5.js')),
			__memo(() => import('../server/nodes/6.js')),
			__memo(() => import('../server/nodes/7.js'))
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
				id: "/user/[user_id]",
				pattern: /^\/user\/([^/]+?)\/?$/,
				params: [{"name":"user_id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})());
