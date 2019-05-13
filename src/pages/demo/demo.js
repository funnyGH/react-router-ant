import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'

class Demo extends Component {
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
				<div className="list">
					<div className="list-row">
						<NavLink to="/home">Link-To-Home</NavLink>
					</div>
				</div>
				<div className="test">
					React Page Demo
				</div>
			</div>);
	}

	// 组件被卸载
	componentWillUnmount() {

	}
}

export default Demo;
