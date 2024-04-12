function lockBlockOutlineOption(props) {
	const { ToggleControl } = this.components;

	let currentValue = props.metaValue;
	const outlineLockValue = props.outlineLockState;

	if (currentValue === undefined) {
		currentValue = true;
	}

	// if state value is set then use it. This will disable UI flickering
	if (outlineLockValue !== undefined && outlineLockValue !== '') {
		currentValue = outlineLockValue;
	}

	return this.el(ToggleControl, {
		label: 'Lock outline when hovering away',
		checked: currentValue,
		onChange: (value) => {
			// update state to update control ui
			props.setState({
				outlineLockState: value,
			});

			// Update Editor UI
			const body = getDocumentBody();
			body.attr('lock-block-outline', value);

			// update meta
			this.debounce(() => {
				props.setMetaValue(value);
			})();
		},
	});
}
