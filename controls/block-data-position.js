function blockDataPositionOption(props) {
	const { Button, ButtonGroup } = this.components;
	const { __ } = this.i18n;

	let currentValue = props.metaValue;
	const dataPositionValue = props.dataPositionState;

	if (currentValue === undefined) {
		currentValue = 'outside';
	}

	// if state value is set then use it. This will disable control UI flickering
	if (dataPositionValue !== undefined && dataPositionValue !== '') {
		currentValue = dataPositionValue;
	}

	const dataPositionOptions = [
		{ key: 'outside', name: __('Outside') },
		{ key: 'inside', name: __('Inside') },
		{ key: 'floating', name: __('Floating') },
	];

	return this.el(
		ButtonGroup,
		null,
		dataPositionOptions.map(({ name, key }) => {
			const elProperties = {
				key: key,
				isDefault: true,
				isTertiary: currentValue !== key,
				isPrimary: currentValue === key,
				isPressed: currentValue === key,
				onClick: () => {
					// upadte state to update control ui
					props.setState({
						dataPositionState: key,
					});

					// update editor ui
					jQuery('body').attr('block-data-position', key);

					// update meta
					this.debounce(() => {
						props.setMetaValue(key);
					})();
				},
			};

			return this.el(Button, elProperties, name);
		})
	);
}
