((plugins, editPost, element, components) => {
	const el = element.createElement;
	const { __ } = wp.i18n;
	const { Fragment } = element;
	const { registerPlugin } = plugins;
	const { PluginSidebar, PluginSidebarMoreMenuItem } = editPost;
	const { PanelBody } = components;

	const outlineShow = new Controls(outlineShowOptions, { outlineShowState: '' });
	const outlineBlockNameShow = new Controls(outlineBlockNameOption, { outlineNameState: '' });
	const outlineStyle = new Controls(outlineStyleOption, { outlineStyleState: '' });
	const linesColorOption = new Controls(outlineColorOption, { outlineColorState: '' });
	const linesOpacityOption = new Controls(outlineOpacityOption, { outlineOpcityState: '' });

	registerPlugin('gutenberg-outline', {
		render() {
			return el(
				Fragment,
				{},
				el(
					PluginSidebarMoreMenuItem,
					{
						target: 'gutenberg-outline',
						icon: smileIcon,
					},
					'Gutenberg Lines'
				),

				el(
					PluginSidebar,
					{
						name: 'gutenberg-outline',
						icon: smileIcon,
						title: 'Gutenberg block outline',
					},
					el(
						PanelBody,
						{},
						el('h2', {}, 'When to show block outline?'),
						el(outlineShow, {
							metaKey: '_enable_block_outline',
						}),
						el('h2', {}, ''),
						el(outlineBlockNameShow, {
							metaKey: '_show_block_name',
						}),
						el('h2', {}, 'Outline color'),
						el(linesColorOption, {
							metaKey: '_block_outline_color',
						}),
						el('h2', {}, 'Outline style'),
						el(outlineStyle, {
							metaKey: '_block_outline_style',
						}),
						el('h2', {}, 'Outline opacity'),
						el(linesOpacityOption, {
							metaKey: '_block_outline_opacity',
						})
					)
				)
			);
		},
	});
})(wp.plugins, wp.editPost, wp.element, wp.components);
