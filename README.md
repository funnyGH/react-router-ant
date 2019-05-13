在 react 上配置使用 vw 适配方案

该 demo 为 vw 适配方案 react 16 && react-router-dom 4+ 搭配使用，一个多页面路由项目.
## router-component 分支上 用另外一种方法 加载组件
app.js
```
import React, {Component} from 'react';
import {Route, Switch, NavLink, Redirect, withRouter} from 'react-router-dom';
import Loadable from 'react-loadable';
import {
	Carousel,
	Button
} from 'antd';

import './css/App.css';
import router from './router/router';
import Home from './pages/home/home';

/**  */
const HomeComponent = Loadable({
	loader: () => import('./pages/home/home'),
	loading: Home,
});

const IndexComponent = () => {
	return (<div>
	  <Carousel autoplay>
			<div className='img-list'><img src={require('./images/index/one.png')} alt=''/></div>
			<div className='img-list'><img src={require('./images/index/groups.jpeg')} alt=''/></div>
			<div className='img-list'><img src={require('./images/index/group.png')} alt=''/></div>
		</Carousel>
		<div className='bottom-btn'>
		  <Button type='primary'>
			  <NavLink to='/home'>进入瞅瞅</NavLink>
			</Button>
		</div>
	</div>);
}

class App extends Component {
	render() {
		return (
			<div className='index-wrap'>
				<Switch>
					<Route path='/' exact component={IndexComponent}></Route>
					<Route path='/home' component={HomeComponent}></Route>
					<Redirect to={{
						pathname: '/',
						search: '?utm=your+face'
					}}/>
				</Switch>
			</div>
		);
	}
}

export default withRouter(App);

```


## 路由配置
```
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
		exact: true //是否为严格模式
	},
	{
		path: '/fe-cr-random',
		component: FeCrRandom
	},
	{ // 拓展二级路由
		path: '/user',
		component: Home,
		routes: [
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
```

项目中有遇到的坑：

```html
1、cssnano 如果你的版本为：4+ 以上，请在配置中如下方案配置：

cssnano({
   "cssnano-preset-advanced": {
       zindex: false,
       autoprefixer: false
   },
})

我遇到了始终把你定位的z-index值重新计算为：1，巨坑，不然你会一口老血喷出来的。

和cssnano 3+版本配置不一样。


2、ios 系统下img不显示问题，解决方案如下：

/*兼容ios不显示图片问题*/
img {
	content: normal !important
}


3、1px 问题，解决方案

/*1px 解决方案*/

@svg square {
	@rect {
		fill: var(--color, white);
		width: 100%;
		height: 50%;
	}
}

.example-line {
	width: 100%;
	background: white svg(square param(--color #E6E6E6));
	background-size: 100% 1px;
	background-repeat: no-repeat;
	background-position: bottom left;
}

/*1px 解决方案*/

/*伪元素1px*/

.row-cell:before {
	content: " ";
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	height: 1px;
	border-top: 1px solid #e5e5e5;
	color: #e5e5e5;
	transform-origin: 0 0;
	transform: scaleY(0.5);
	z-index: 2;
}
```

如果你不使用 react 也不使用 vue ，在项目中只使用 html 页面 vw 实现移动端适配，请点这 <a href="https://github.com/caoxiaoke/html-vw-layout">《如何在 html 项目中使用 vw 实现移动端适配》</a>

<br/>
<br/>
