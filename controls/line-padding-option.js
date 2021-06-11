function outlinePaddingOption(props) {
	const { RangeControl } = this.components;

	let currentValue = props.metaValue;
	const paddingValue = props.outlinePaddingState;

	if (currentValue === undefined) {
		currentValue = 1;
	}

	if (paddingValue !== undefined && paddingValue !== '') {
		currentValue = paddingValue;
	}

	return this.el(RangeControl, {
		value: currentValue,
		onChange: (value) => {
			const metaValueWithPx = `${value}px`;

			// update editor ui
			const root = document.documentElement;
			root.style.setProperty('--outline-padding', metaValueWithPx);

			// upadte state to update control ui
			props.setState({
				outlinePaddingState: value,
			});

			// Debounce so value is only updated in meta once user stops dragging
			this.debounce(() => {
				props.setMetaValue(value);
			})();
		},
		min: 0,
		max: 25,
	});
}
