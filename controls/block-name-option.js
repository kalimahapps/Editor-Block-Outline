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

			// Update Editor UI
			const body = getDocumentBody();
			body.attr('show-block-name', value);

			// update meta
			this.debounce(() => {
				props.setMetaValue(value);
			})();
		},
	});
}
