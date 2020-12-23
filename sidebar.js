(function (plugins, editPost, element, components, data, compose) {
    const el = element.createElement;
    const { __ } = wp.i18n;
    const { Fragment } = element;
    const { registerPlugin } = plugins;
    const { PluginSidebar, PluginSidebarMoreMenuItem } = editPost;
    const { PanelBody } = components;
    const outlineShow = outlineShowOptions(element, components, data, compose);
    const outlineBlockNameShow = outlineBlockNameOption(element, components, data, compose);
    const outlineStyle = outlineStyleOption(element, components, data, compose);
    const linesColorOption = outlineColorOption(element, components, data, compose);
    registerPlugin('gutenberg-outline', {
        render: function () {
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
                        el('h2', {}, 'Line style'),
                        el(outlineStyle, {
                            metaKey: '_block_outline_style',
                        })
                    )
                )
            );
        },
    });
})(wp.plugins, wp.editPost, wp.element, wp.components, wp.data, wp.compose);
