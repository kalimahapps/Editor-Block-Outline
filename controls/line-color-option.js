function outlineColorOption(props) {
	const { ColorPalette } = this.components;

	/**
	 * Enclosure function to update UI color for text and border
	 *
	 * @param {string} metaValue Color value
	 */
	function updateInterface(metaValue) {
		const c = jQuery.Color(metaValue);
		c.toHslaString();

		// Form HSLA color
		const saturation = Math.round(c._hsla[1] * 100);
		const lightness = Math.round(c._hsla[2] * 100);

		const hsla = `hsla(${c._hsla[0]}deg, ${saturation}%, ${lightness}%, var(--outline-opacity))`;
		const root = document.documentElement;
		root.style.setProperty('--outline-color', hsla);

		// update text color
		const colorLightness = c.lightness();
		let color = '#000000';
		if (colorLightness < 0.5) {
			color = '#ffffff';
		}
		document.documentElement.style.setProperty('--outline-text-color', color);
	}

	// Get current color value and state vlue
	let currentValue = props.metaValue;
	const outlineColorValue = props.outlineColorState;

	if (currentValue === undefined) {
		currentValue = '#bdc3c7';
	}

	// if state value is set then use it. This will disaable UI flickering
	if (outlineColorValue !== undefined && outlineColorValue !== '') {
		currentValue = outlineColorValue;
	}

	// Set available colors
	const colors = [
		{ name: 'Green Sea', color: '#16a085' },
		{ name: 'Belize Hole', color: '#2980b9' },
		{ name: 'Midenight Blue', color: '#2c3e50' },
		{ name: 'Sunflower', color: '#f1c40f' },
		{ name: 'Alizarin', color: '#e74c3c' },
		{ name: 'Silver', color: '#bdc3c7' },
	];

	// Render palette controls
	return this.el(ColorPalette, {
		label: 'Select outline color',
		colors: colors,
		value: currentValue,
		disableCustomColors: true,
		clearable: false,
		onChange: (value) => {
			updateInterface(value);

			props.setState({
				outlineColorState: value,
			});

			this.debounce(() => {
				props.setMetaValue(value);
			})();
		},
	});
}
