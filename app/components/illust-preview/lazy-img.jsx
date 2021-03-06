// @flow
import React, {Component} from 'react';
import css from 'react-css-modules';
import {findDOMNode} from 'react-dom';
import {CloseButton} from '../button';
import styles from './lazy-img.css';

type Size = {
	width: number | 'auto',
	height: number | 'auto'
};

function calcSize(width: number, height: number): Size {
	const {innerWidth, innerHeight} = window;
	if (height > innerHeight && width > innerWidth) {
		return (width * innerHeight < height * innerWidth) ?
			{width: 'auto', height: innerHeight} :
			{
				width: innerWidth,
				height: 'auto'
			};
	}
	if (height > innerHeight) {
		return {width: 'auto', height: innerHeight};
	}
	if (width > innerWidth) {
		return {width: innerWidth, height: 'auto'};
	}

	return {width, height};
}

type Props = {
	from: string,
	to: string,
	width: number,
	height: number,
	isLoaded: bool,
	onLoad: () => void,
	onClose: () => void
};

type State = {
	isClicked: bool,
	fromMarginTop: number,
	toMarginTop: number
};

@css(styles)
export default class LazyImg extends Component {
	props: Props;
	state: State;
	to: Component<*, *, *>
	from: Component<*, *, *>

	constructor(props: Props) {
		super(props);
		this.state = {
			isClicked: false,
			fromMarginTop: 0,
			toMarginTop: 0
		};
	}

	componentDidMount() {
		const to = this.calcMarginTop(findDOMNode(this.to));
		const from = this.calcMarginTop(findDOMNode(this.from));
		this.setState({
			toMarginTop: to,
			fromMarginTop: from
		});
	}

	componentWillUpdate(nextProps: Props, nextState: State) {
		const to = this.calcMarginTop(findDOMNode(this.to));
		const from = this.calcMarginTop(findDOMNode(this.from));
		if (
			this.props.isLoaded !== nextProps.isLoaded ||
			nextState.isClicked !== this.state.isClicked ||
			nextState.fromMarginTop !== from ||
			nextState.toMarginTop !== to
		) {
			this.setState({
				toMarginTop: to,
				fromMarginTop: from
			});
		}
	}

	handleLoad = () => {
		const img = new Image();
		img.onload = () => {
			this.props.onLoad();
		};
		img.src = this.props.to;
	}

	calcMarginTop(node: HTMLElement): number {
		if (node) {
			const height = node && node.clientHeight;
			if (window.innerHeight > height) {
				const top = (window.innerHeight - height) / 2;
				return top;
			}
		}
		return 0;
	}

	selectStyle(isLoaded: bool, isClick: bool): string {
		if (isLoaded && isClick) {
			return 'isClick';
		}
		if (isLoaded) {
			return 'loaded';
		}
		return 'loading';
	}

	handleClick = (event: SyntheticEvent) => { // eslint-disable-line no-undef
		event.stopPropagation();
		this.setState({isClicked: !this.state.isClicked});
	}

	render() {
		const {width, height, isLoaded} = this.props;
		const style = this.selectStyle(isLoaded, this.state.isClicked);
		const toStyle = {marginTop: `${this.state.toMarginTop}px`};
		const fromStyle = Object.assign(
			{},
			calcSize(width, height),
			{marginTop: `${this.state.fromMarginTop}px`}
		);

		if (this.props.isLoaded) {
			return (
				<div styleName="wrap">
					<CloseButton
						style={{color: '#676767', top: '10px', right: '10px'}}
						iconStyle={{fill: 'white'}}
						onClick={this.props.onClose}
						/>
					<img
						src={this.props.to}
						width={width}
						height={height}
						style={toStyle}
						styleName={style}
						onClick={this.handleClick}
						ref={c => { // eslint-disable-line react/jsx-no-bind
							this.to = c;
						}}
						/>
				</div>
			);
		}

		return (
			<div styleName="wrap">
				<CloseButton onClick={this.props.onClose} iconStyle={{fill: 'white'}}/>
				<img
					src={this.props.from}
					styleName="from"
					style={fromStyle}
					onLoad={this.handleLoad}
					ref={(c: Component<*, *, *>) => { // eslint-disable-line react/jsx-no-bind
						this.from = c;
					}}
					/>
			</div>
		);
	}
}
