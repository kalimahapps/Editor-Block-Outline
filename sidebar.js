((plugins, editPost, element, components) => {
	const el = element.createElement;
	const { __ } = wp.i18n;
	const { Fragment } = element;
	const { registerPlugin } = plugins;
	const { PluginSidebar, PluginSidebarMoreMenuItem } = editPost;
	const { PanelBody } = components;

	const outlineShow = new Controls(outlineShowOptions, { outlineShowState: '' });
	const outlineBlockNameShow = new Controls(outlineBlockNameOption, { outlineNameState: '' });
	const blockClassNameShow = new Controls(outlineBlockClassOption, { classNameState: '' });
	const lockBlockOutline = new Controls(lockBlockOutlineOption, { outlineLockState: '' });
	const dataPosition = new Controls(blockDataPositionOption, { dataPositionState: '' });
	const outlineStyle = new Controls(outlineStyleOption, { outlineStyleState: '' });
	const linesColorOption = new Controls(outlineColorOption, { outlineColorState: '' });
	const linesOpacityOption = new Controls(outlineOpacityOption, { outlineOpcityState: '' });
	const linesPaddingOption = new Controls(outlinePaddingOption, { outlineOpcityState: '' });

	registerPlugin('editor-block-outline', {
		render() {
			return el(
				Fragment,
				{},
				el(
					PluginSidebarMoreMenuItem,
					{
						target: 'editor-outline',
						icon: sidebarIcon,
					},
					'Editor Block Outline'
				),

				el(
					PluginSidebar,
					{
						name: 'editor-outline',
						icon: sidebarIcon,
						title: 'Editor block outline',
					},
					el(
						PanelBody,
						{
							className: 'editor-block-outline-sidebar',
						},
						el('h2', {}, 'When to show block outline?'),
						el(outlineShow, {
							metaKey: '_enable_block_outline',
						}),
						el('h4', {}, ''),
						el(outlineBlockNameShow, {
							metaKey: '_show_block_name',
						}),
						el(blockClassNameShow, {
							metaKey: '_show_class_name',
						}),
						el(lockBlockOutline, {
							metaKey: '_lock_block_outline',
						}),
						el('hr', {}),
						el('h2', {}, 'Data Position'),
						el(dataPosition, {
							metaKey: '_block_data_position',
						}),
						el('hr', {}),
						el('h2', {}, 'Outline color'),
						el(linesColorOption, {
							metaKey: '_block_outline_color',
						}),
						el('hr', {}),
						el('h2', {}, 'Outline style'),
						el(outlineStyle, {
							metaKey: '_block_outline_style',
						}),
						el('hr', {}),
						el('h2', {}, 'Outline opacity'),
						el(linesOpacityOption, {
							metaKey: '_block_outline_opacity',
						}),
						el('hr', {}),
						el('h2', {}, 'Outline padding'),
						el(linesPaddingOption, {
							metaKey: '_block_outline_padding',
						})
					)
				)
			);
		},
	});
})(wp.plugins, wp.editPost, wp.element, wp.components);
