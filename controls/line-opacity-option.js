function outlineOpacityOption(props) {
	const { RangeControl } = this.components;

	let currentValue = props.metaValue;
	const opacityValue = props.outlineOpcityState;

	if (currentValue === undefined) {
		currentValue = 1;
	}
	if (opacityValue !== undefined && opacityValue !== '') {
		currentValue = opacityValue;
	}

	return this.el(RangeControl, {
		value: currentValue,
		onChange: (value) => {
			// Convert value to decimal
			const metaValueDeci = value / 100;

			// update editor ui
			const root = document.documentElement;
			root.style.setProperty('--outline-opacity', metaValueDeci);

			// upadte state to update control ui
			props.setState({
				outlineOpcityState: value,
			});

			// Debounce so value is only updated in meta once user stops dragging
			this.debounce(() => {
				props.setMetaValue(value);
			})();
		},
		min: 10,
		max: 100,
	});
}
