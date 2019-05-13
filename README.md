在react 上配置使用vw 适配方案

该demo 为vw 适配方案 react 16 && react-router-dom 4+ 搭配使用，一个多页面路由项目.

```
import Home from '../../components/Home';
import ProductDetail from '../../components/ProductDetail';
import User from '../../components/User';
import Main from '../../components/User/Main';
import Info from '../../components/User/Info';

let router = [
    {
        path: '/',//首页默认加载的页面
        component: Home,
        exact: true //是否为严格模式
    },
    {
        path: '/productdetail/:id',//后面是传递的参数id
        component: ProductDetail
    },
    {
        path: '/user',
        component: User,
        routes: [  /** 嵌套路由  User下面又有两个子页面*/
            {
                path: '/user/',
                component: Main,
                exact: true
            },
            {
                path: '/user/info',
                component: Info
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

如果你不使用react 也不使用vue ，在项目中只使用html页面 vw实现移动端适配，请点这 <a href="https://github.com/caoxiaoke/html-vw-layout">《如何在html项目中使用vw实现移动端适配》</a>

<br/>
<br/>
