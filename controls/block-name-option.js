function outlineBlockNameOption(props) {
	const { ToggleControl } = this.components;

	let currentValue = props.metaValue;
	const outlineNameValue = props.outlineNameState;

	if (currentValue === undefined) {
		currentValue = true;
	}

	// if state value is set then use it. This will disable UI flickering
	if (outlineNameValue !== undefined && outlineNameValue !== '') {
		currentValue = outlineNameValue;
	}

	return this.el(ToggleControl, {
		label: 'Show block name',
		checked: currentValue,
		onChange: (value) => {
			// update state to update control ui
			props.setState({
				outlineNameState: value,
			});

			// update editor ui
			jQuery('body').attr('show-block-name', value);

			// Update editor UI for WP6.2+ (Iframe Editor) 
			jQuery('iframe.editor-canvas__iframe').contents().find('body').attr('show-block-name', value);

			// update meta
			this.debounce(() => {
				props.setMetaValue(value);
			})();
		},
	});
}
