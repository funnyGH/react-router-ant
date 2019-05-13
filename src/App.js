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
