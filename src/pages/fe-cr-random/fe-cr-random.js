import React, {Component} from 'react';
import {
	Button,
	message,
	Drawer,
	Select,
	InputNumber
} from 'antd';
import './fe-cr-random.css';
import { members } from '../../config/fe-cr-config/fe-cr-random.config';
const Option = Select.Option;

class FeCrRandom extends Component {
	timer = null; // 定时器
	ocj = {}; // 每次选择的id存储

	allMembers = []; // 所有用户生成的数组
	allMembersObj = []; // 所有用户生成的链表，用来实现姓名获取

	/**
	 * 可配置项
	*/
	oPersons = 5; // 总共挑选人数，不变
	n = 5; // 剩余选择次数，递减
	aSeconds = 200; // 总时长，默认500ms
	aCircles = 5; // 总圈数，默认是成员数组长度

	specialSelect = []; // 特殊原因不能参加的用户下拉选项
	necessarySelect = []; // 必须参加用户下拉选项
	luckySelect = []; // 手动确定要被选中的用户下拉选项

	aSpecialMember = {}; // 特殊原因不参加用户
	aNecessaryMember = {}; // 必须参加用户
	aLuckyMembers = {}; // 手动确定要被选中的用户

	aSureMember = []; // 最终会被抽中的幸运用户 数组

	constructor(props) {
		super(props)
		this.allMembers = members;

		members.forEach(ele => {
			this.allMembersObj[ele.id] = ele.name;
			this.specialSelect.push(<Option key={ele.id}>{ele.name}</Option>);
			this.necessarySelect.push(<Option key={ele.id}>{ele.name}</Option>);
			this.luckySelect.push(<Option key={ele.id}>{ele.name}</Option>);
		});

		this.state = {
			loading: false, // 按钮loading
			currentIndex: null, // 当前选中
			choosedMember: null, // 选中用户
			visible: false, // 抽屉展示
		};

		// 手动绑定this
		this.handleChangeNo = this.handleChangeNo.bind(this);
		this.handleChangeNess = this.handleChangeNess.bind(this);
		this.handleChangeLucky = this.handleChangeLucky.bind(this);

		this.onChangeN = this.onChangeN.bind(this);
		this.onChangeCircles = this.onChangeCircles.bind(this);
		this.onChangeSeconds = this.onChangeSeconds.bind(this);
	}


	// 组件装载之后调用, 在 render 之后执行
	componentDidMount() {
    // console.log(members)
  }

	// 渲染
	render() {
		const _this = this;

		return (
			<div className="fe-cr-wrap">
				<ul className="lottery_all">
				  {_this.allMembers.map((item, index) => {
						return <li key={index}>
							<div 
							  className={`lottery_box ${item.id * 1 === this.state.currentIndex? 'lottery_yeah' : ''}`}>
							  <img src={item.avator} alt="" />
								<span className="dialog"></span>
							</div>
							<p>{item.name}</p>
						</li>
					})}
				</ul>
        <div className="self-set">
				  <div className="self-set-div">
						<span className="self-set-left" onClick={this.showDrawer}>
							自定义选项
						</span>
						<span onClick={this.clickLoading}>
							再来一次
						</span>
					</div>
					<Drawer
						title="自定义选项"
						placement="bottom" 
						height={455} 
						closable={false}
						onClose={this.onClose}
						visible={this.state.visible}>
						<div className="set-list">
							<span>不需参加人员：</span>
							<Select
								mode="multiple"
								style={{ width: '100%' }} 
								onChange={this.handleChangeNo}
							>
								{this.specialSelect}
							</Select>
						</div>
						<div className="set-list">
							<span>必须参加人员：</span>
							<Select
								mode="multiple"
								style={{ width: '100%' }} 
								onChange={this.handleChangeNess}
							>
								{this.necessarySelect}
							</Select>
						</div>
						<div className="set-list">
							<span>幸运用户：</span>
							<Select
								mode="multiple"
								style={{ width: '100%' }} 
								onChange={this.handleChangeLucky}
							>
								{this.luckySelect}
							</Select>
						</div>
						<div className="set-list">
							<span>总挑选次数：</span>
							<InputNumber min={1} max={10} defaultValue={5} onChange={_this.onChangeN} />
						</div>
						<div className="set-list">
							<span>抽中一人的圈数：</span>
							<InputNumber min={1} max={20} defaultValue={5} onChange={_this.onChangeCircles} />
						</div>
						<div className="set-list">
							<span>一圈时长：</span>
							<InputNumber min={1} max={1000} defaultValue={200} onChange={_this.onChangeSeconds} />
						</div>
					</Drawer>
				</div>
				<div className="choose-result-wrap">
					<Button type="primary" loading={this.state.loading} onClick={this.enterLoading}>走你～</Button>
					<p className="choose-result-name">{this.state.choosedMember}</p>
				</div>
			</div>);
	}

	/**
	 * 点击校验自定义选项是否符合条件 并 开始
	 */
  enterLoading = () => {
		let necessArray = Object.keys(this.aNecessaryMember),
				luckyArray = Object.keys(this.aLuckyMembers);
				
		// 如果必须参加人员和幸运用户相加 大于 总人数，则return
    if (necessArray.length + luckyArray.length > this.oPersons) {
			message.warning('必须参加人员与幸运用户之和不能大于总挑选人数');
			this.aSureMember = [];
			return false;
		}

		// 如果必须参加人员和幸运用户相加 等于 总人数，则将两者相加等于需要挑选用户，返回Array[string]
		if (necessArray.length + luckyArray.length === this.oPersons) {
			this.aSureMember = necessArray.concat(luckyArray);
		}

		// 如果必须参加人员和幸运用户相加 小于 总人数，则将两者相加 再从总用户中挑选剩下的，返回Array[string]
		if (this.aSureMember.length < this.oPersons && (necessArray.length + luckyArray.length < this.oPersons)) {
			const lastNo = this.oPersons - necessArray.length - luckyArray.length;
			this.aSureMember = necessArray.concat(luckyArray);
			this.mathRandom(lastNo);
		}

    this.setState({
			loading: true
		});
		this.goBegin();
	};

	/**
	 * 随机获取剩余用户
	 * 1. 除去 不参加的
	 * 2. 除去 必须参加用户
	 * 3. 除去 幸运用户
	 * 4. 对剩余的用户做随机 组合
	 * 5. 对剩余用户数组 做随机选择
	 */
	mathRandom(lastNo) {
		let needMembers = JSON.parse(JSON.stringify(this.allMembers));
		let theLast = [];
		
		// 除去 1 2 条件
		needMembers.forEach((ele) => {
			if (this.aSpecialMember[ele.id] || this.aNecessaryMember[ele.id] || this.aLuckyMembers[ele.id]) {
        return;
			} else {
        if (Math.random() < 0.5) {
					theLast.push(ele.id.toString());
				} else {
					theLast.unshift(ele.id.toString());
				}
			}
		});

		// 随机获取剩余用户数组下标 lastNo
		for(let i = 0; i < lastNo; i++) {
			let oindex = Math.floor(Math.random() * (theLast.length));
			this.aSureMember.push(theLast[oindex]);
			theLast.splice(oindex, 1);
		}
	}

	/**
	 * 事件封装
	 * @param {*} {Number} 开始
	 * @method click begin~
	 */
	goBegin() {
		this.oCj = {};
		if (this.n) {
			this.timer = null;
			this.oCj = {
				rewardId: this.aSureMember[this.n - 1]
			};
			this.n--;

			this.tigerMac(1, () => {
				// TODO: 在这里添加 选中后的姓名代码
				this.setState({
					loading: false,
					choosedMember: (this.state.choosedMember ? (this.state.choosedMember + '，') : '') + this.allMembersObj[this.oCj['rewardId']]
				});
			});
		} else {
			setTimeout(() => {
				this.setState({
					loading: false
				});
			}, 0);
			message.warning(this.oPersons + '次机会已经用完');
		}
	}

	/**
	 * 有多少成员就循环多少次
	 * @param {*} iStep 步数
	 * @param {*} callback 执行事件
	 */
	tigerMac(iStep, callback) {
		let speed = this.aSeconds / iStep, // 时间间隔
			len = this.allMembers.length,
			index = 0, // 索引值
			_this = this;

			this.setState({
				currentIndex: index + 1
			});
	
		this.timer = setInterval(() => {
			// 如果超过就从第一个开始，进行下一轮循环
			if (index + 1 > len) {
				index = 0;
				iStep++;
				clearInterval(_this.timer);
				_this.tigerMac(iStep, callback);
			} else {
				if (iStep >= _this.aCircles) {
					if (_this.oCj['rewardId'] && (index + 1) === _this.oCj['rewardId'] * 1) {
						_this.setState({
							currentIndex: index + 1
						});
						clearInterval(_this.timer);

						if (callback && typeof callback === 'function') {
							callback.call(_this.aSureMember[index]);
						}
						return false;
					}
				}
				index++;
			}
			
			_this.setState({
				currentIndex: index + 1
			});
		}, speed)
	};

	/**
	 * 显示 抽屉
	 */
	showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

	/**
	 * 收起 抽屉
	 */
  onClose = () => {
    this.setState({
      visible: false,
    });
	};
	
	/**
	 * select 事件触发
	 */
	handleChangeNo(value) {
		const ostr = `${value}`;
		this.aSpecialMember = {};
		if (!ostr || ostr === ' ') {
			return;
		}
		if (ostr.indexOf(',') > -1) {
      ostr.split(',').forEach((ele) => {
				this.aSpecialMember[ele * 1] = true;
			});
		} else {
			this.aSpecialMember[ostr] = true;
		}

		this.allMembers.forEach((ele, index)=> {
			if (this.aSpecialMember[ele.id]) {
				this.necessarySelect[index] = <Option key={ele.id} disabled>{ele.name}</Option>;
				this.luckySelect[index] = <Option key={ele.id} disabled>{ele.name}</Option>;
			}
		});
	}
	handleChangeNess(value) {
		const ostr = `${value}`;
		this.aNecessaryMember = {};
		if (!ostr || ostr === ' ') {
			return;
		}
		if (ostr.indexOf(',') > -1) {
      ostr.split(',').forEach((ele) => {
				this.aNecessaryMember[ele * 1] = true;
			});
		} else {
			this.aNecessaryMember[ostr] = true;
		}

		this.allMembers.forEach((ele, index)=> {
			if (this.aNecessaryMember[ele.id]) {
				this.specialSelect[index] = <Option key={ele.id} disabled>{ele.name}</Option>;
				this.luckySelect[index] = <Option key={ele.id} disabled>{ele.name}</Option>;
			}
		});
	}
	handleChangeLucky(value) {
		const ostr = `${value}`;
		this.aLuckyMembers = {};
		if (!ostr || ostr === ' ') {
			return;
		}
		if (ostr.indexOf(',') > -1) {
      ostr.split(',').forEach((ele) => {
				this.aLuckyMembers[ele * 1] = true;
			});
		} else {
			this.aLuckyMembers[ostr] = true;
		}

		this.allMembers.forEach((ele, index)=> {
			if (this.aLuckyMembers[ele.id]) {
				this.specialSelect[index] = <Option key={ele.id} disabled>{ele.name}</Option>;
				this.necessarySelect[index] = <Option key={ele.id} disabled>{ele.name}</Option>;
			}
		});
	}

	/**
	 * 输入框 事件触发
	 */
	onChangeN(val) {
		this.n = val * 1;
		this.oPersons = val * 1;
	}
	onChangeCircles(val) {
		this.aCircles = val * 1;
	}
	onChangeSeconds(val) {
		this.aSeconds = val * 1;
	}

	/**
	 * 点击再来一次
	 */
	clickLoading() {
		window.location.reload();
	}

	// 组件被卸载
	componentWillUnmount() {

	}
}

export default FeCrRandom;
