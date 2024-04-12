function outlineBlockClassOption(props) {
	const { ToggleControl } = this.components;

	let currentValue = props.metaValue;
	const classNameValue = props.classNameState;

	if (currentValue === undefined) {
		currentValue = false;
	}

	// if state value is set then use it. This will disable UI flickering
	if (classNameValue !== undefined && classNameValue !== '') {
		currentValue = classNameValue;
	}

	return this.el(ToggleControl, {
		label: 'Show class name',
		checked: currentValue,
		onChange: (value) => {
			// update state to update control ui
			props.setState({
				classNameState: value,
			});

			// update editor ui
			jQuery('body').attr('show-class-name', value);

			// Update editor UI for WP6.2+ (Iframe Editor) 
			jQuery('iframe.editor-canvas__iframe').contents().find('body').attr('show-class-name', value);
			
			// update meta
			this.debounce(() => {
				props.setMetaValue(value);
			})();
		},
	});
}
