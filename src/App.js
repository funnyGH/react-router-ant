import React, {Component} from 'react';
import {
	Route,
	Switch,
	NavLink,
	Redirect
} from 'react-router-dom';
import {
	Carousel,
	Button
} from 'antd';

import './css/App.css';
import router from './router/router';

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

          {
            router.map((route, key) => {
              if (route.exact) {//如果有严格模式
                return <Route exact 
									key={ key } 
									path={ route.path } 
									render={ props => (
										//主要是为了传递嵌套路由到子组件 
										//类似于 <User {...props} routes={route.routes} />
										<route.component {...props} routes={route.children || []} />
									)}
								/>
              } else {
                return <Route  
									key={ key }
									path={ route.path } 
									render={ props => (
										//主要是为了传递嵌套路由到子组件 
										//类似于 <User {...props} routes={route.routes} />
										<route.component {...props} routes={route.children || []} />
									)}
								/>
              }
            })
          }

					<Redirect to={{
						pathname: '/',
						search: '?unlegal-url'
					}}/>
				</Switch>
			</div>
		);
	}
}

// export default withRouter(App);
export default App;
