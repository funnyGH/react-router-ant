import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import {
	Button
} from 'antd';
import './fe-cr-random.css';

class FeCrRandom extends Component {
	constructor(props) {
		super(props)
		console.log(props)
	}

	// 组件装载之后调用
	componentDidMount() {

  }

	//渲染
	render() {
		return (
			<div>
				<ul id="la" className="lottery_all">
					<li><span eid="0" className="lottery_all">1</span></li>
				</ul>
				<div className="choose-result-wrap">
					<span className="choose-result-name"></span>
					<Button type='primary'>
						<NavLink to='/home'>走你～</NavLink>
					</Button>
				</div>
			</div>);
	}

	// 组件被卸载
	componentWillUnmount() {

	}
}

export default FeCrRandom;
