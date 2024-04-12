function outlineShowOptions(props) {
	const { Button, ButtonGroup } = this.components;
	const { __ } = wp.i18n;

	let currentValue = props.metaValue;
	const outlineShowValue = props.outlineShowState;

	if (currentValue === undefined) {
		currentValue = 'hover';
	}

	// if state value is set then use it. This will disable control UI flickering
	if (outlineShowValue !== undefined && outlineShowValue !== '') {
		currentValue = outlineShowValue;
	}

	const outlineShowOptionList = [
		{ key: 'hover', name: __('Hover') },
		{ key: 'always', name: __('Always') },
		{ key: 'never', name: __('Disable') },
	];

	return this.el(
		ButtonGroup,
		null,
		outlineShowOptionList.map(({ name, key }) => {
			const elProperties = {
				key: key,
				variant: 'secondary',
				isTertiary: currentValue !== key,
				isPrimary: currentValue === key,
				isPressed: currentValue === key,
				onClick: () => {
					// Update state to update control ui
					props.setState({
						outlineShowState: key,
					});

					// Update editor ui
					const body = getDocumentBody();
					body.attr('show-outline', key);

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
