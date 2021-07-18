function outlineBlockClassOption(props) {
	const { ToggleControl } = this.components;

	let currentValue = props.metaValue;
	const classNameValue = props.classNameState;

	if (currentValue === undefined) {
		currentValue = false;
	}

	// if state value is set then use it. This will disaable UI flickering
	if (classNameValue !== undefined && classNameValue !== '') {
		currentValue = classNameValue;
	}

	return this.el(ToggleControl, {
		label: 'Show class name',
		checked: currentValue,
		onChange: (value) => {
			// upadte state to update control ui
			props.setState({
				classNameState: value,
			});

			// update editor ui
			jQuery('body').attr('show-class-name', value);

			// update meta
			this.debounce(() => {
				props.setMetaValue(value);
			})();
		},
	});
}
