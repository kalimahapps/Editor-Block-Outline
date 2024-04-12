function enableOutlinePaddingOption(props) {
	const { ToggleControl } = this.components;

	let currentValue = props.metaValue;
	const enableOutlinePaddingValue = props.outlinePaddingEnableState;

	if (currentValue === undefined) {
		currentValue = true;
	}

	// if state value is set then use it. This will disable UI flickering
	if (enableOutlinePaddingValue !== undefined && enableOutlinePaddingValue !== '') {
		currentValue = enableOutlinePaddingValue;
	}

	return this.el(ToggleControl, {
		label: 'Enable outline padding',
		checked: currentValue,
		onChange: (value) => {
			// update state to update control ui
			props.setState({
				outlinePaddingEnableState: value,
			});

			// update editor ui
			jQuery('body').attr('enable-outline-padding', value);

			// Update editor UI for WP6.2+ (Iframe Editor) 
			jQuery('iframe.editor-canvas__iframe').contents().find('body').attr('enable-outline-padding', value);

			// update meta
			this.debounce(() => {
				props.setMetaValue(value);
			})();
		},
	});
}
