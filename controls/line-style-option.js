function outlineStyleOption(props) {
	const { Button, ButtonGroup } = this.components;
	const { __ } = this.i18n;

	let currentValue = props.metaValue;
	const outlineStyleValue = props.outlineStyleState;

	if (currentValue === undefined) {
		currentValue = 'hover';
	}

	// if state value is set then use it. This will disaable control UI flickering
	if (outlineStyleValue !== undefined && outlineStyleValue !== '') {
		currentValue = outlineStyleValue;
	}

	const outlineStyleTypesOptions = [
		{ key: 'solid', name: __('Solid') },
		{ key: 'dashed', name: __('Dashed') },
		{ key: 'dotted', name: __('Dotted') },
	];

	return this.el(
		ButtonGroup,
		null,
		outlineStyleTypesOptions.map(({ name, key }) => {
			const elProperties = {
				key: key,
				isDefault: true,
				isTertiary: currentValue !== key,
				isPrimary: currentValue === key,
				isPressed: currentValue === key,
				onClick: () => {
					// upadte state to update control ui
					props.setState({
						outlineStyleState: key,
					});

					// update editor ui
					const root = document.documentElement;
					root.style.setProperty('--outline-style', key);

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
