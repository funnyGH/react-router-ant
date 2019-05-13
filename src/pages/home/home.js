import React, { Component } from 'react';
import { Link } from "react-router-dom";

import {
	PageHeader,
	List,
	Avatar
} from 'antd';
import { navList } from '../../config/nav.config';

import './home.css';

class Home extends Component {
	superData = null; 

	constructor(props) {
		super(props)
		this.superData = null;
	}

	// 组件装载之后调用
	componentDidMount() {

	}
	//渲染
	render() {
		const data = navList;
		return (
			<div className='home-wrap'>
				<PageHeader 
					onBack={() => alert('where you want go to?')}
					title='FE业务组'
					subTitle='插件集'>
				</PageHeader>

			  <div className='home-box'>
					<List
						itemLayout='horizontal'
						dataSource={data}
						renderItem={item => (
							<List.Item>
								<List.Item.Meta
									avatar={<Avatar src={item.icon} />}
                  title={<Link to={`${item.toUrl}`}>{item.labelName}</Link>}
									description={item.description}
								/>
							</List.Item>
						)}
					/>
				</div>
			</div>);
	}

	// 组件被卸载
	componentWillUnmount() {

	}
}

export default Home;
