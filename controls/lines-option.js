function outlineShowOptions(props) {
	const { Button, ButtonGroup } = this.components;
	const { __ } = wp.i18n;

	let currentValue = props.metaValue;
	const outlineShowValue = props.outlineShowState;

	if (currentValue === undefined) {
		currentValue = 'hover';
	}

	// if state value is set then use it. This will disaable control UI flickering
	if (outlineShowValue !== undefined && outlineShowValue !== '') {
		currentValue = outlineShowValue;
	}

	const outlinShowOptionList = [
		{ key: 'hover', name: __('Hover') },
		{ key: 'always', name: __('Always') },
		{ key: 'never', name: __('Disable') },
	];

	return this.el(
		ButtonGroup,
		null,
		outlinShowOptionList.map(({ name, key }) => {
			const elProprites = {
				key: key,
				isDefault: true,
				isTertiary: currentValue !== key,
				isPrimary: currentValue === key,
				isPressed: currentValue === key,
				onClick: () => {
					// upadte state to update control ui
					props.setState({
						outlineShowState: key,
					});

					// update editor ui
					jQuery('body').attr('show-outline', key);

					// update meta
					this.debounce(() => {
						props.setMetaValue(key);
					})();
				},
			};

			return this.el(Button, elProprites, name);
		})
	);
}
