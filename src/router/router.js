import Demo from '../pages/demo/demo';

// pages 页面
import Home from '../pages/home/home';
import FeCrRandom from '../pages/fe-cr-random/fe-cr-random';

let router = [
	{
		path: '/demo',
		component: Demo
	},
	{
		path: '/home',
		component: Home,
		exact: false //是否为严格模式
	},
	{
		path: '/fe-cr-random',
		component: FeCrRandom
	},
	{ // 拓展二级路由
		path: '/user',
		component: Home,
		children: [
			/** 嵌套路由  User下面又有两个子页面*/
			{
				path: '/user/',
				component: Home,
				exact: true
			},
			{
				path: '/user/info',
				component: Home
			},
		]
	}
];

export default router;