function outlineColorOption(element, components, data, compose) {
    const el = element.createElement;
    const { withSelect, withDispatch } = data;
    const { ColorPalette } = components;
    const { __ } = wp.i18n;

    /**
     * Update user meta data on selection
     */
    const dispatchMeta = function (dispatch, props) {
        return {
            setMetaValue: function (metaValue) {
                const userData = data.select('core').getCurrentUser();
                const user = data.select('core').getEntityRecord('root', 'user', userData.id);

                let outlineColorsMeta = {};
                outlineColorsMeta[props.metaKey] = metaValue;

                const completeDispatch = dispatch('core').saveUser({
                    id: user.id,
                    meta: { ...user.meta, ...outlineColorsMeta },
                });

                completeDispatch.then(() => {
                    let root = document.documentElement;
                    root.style.setProperty('--outline-color', metaValue);

                    // update text color
                    const c = jQuery.Color(metaValue);
                    const lightness = c.lightness();
                    let color = '#000000';
                    if (lightness < 0.5) color = '#ffffff';
                    document.documentElement.style.setProperty('--outline-text-color', color);
                });
            },
        };
    };

    /**
     * Build and show button group to user
     * @param {object} props
     */
    const buildColorPicker = function (props) {
        let currentValue = props.metaValue;

        if (currentValue == undefined) currentValue = '#bdc3c7';

        const colors = [
            { name: 'Green Sea', color: '#16a085' },
            { name: 'Belize Hole', color: '#2980b9' },
            { name: 'Midenight Blue', color: '#2c3e50' },
            { name: 'Sunflower', color: '#f1c40f' },
            { name: 'Alizarin', color: '#e74c3c' },
            { name: 'Silver', color: '#bdc3c7' },
        ];

        return el(ColorPalette, {
            label: 'Select outline color',
            colors: colors,
            value: currentValue,
            disableCustomColors: true,
            clearable: false,
            onChange: (value) => {
                props.setMetaValue(value);
            },
        });
    };

    /**
     * Update user selection
     *
     * @param {object} select WP object
     * @param {object} props WP object
     */

    const updateSelect = function (select, props) {
        const userData = data.select('core').getCurrentUser();
        if (Object.keys(userData).length == 0) return {};

        const user = select('core').getEntityRecord('root', 'user', userData.id);
        return {
            metaValue: user == undefined ? true : user.meta[props.metaKey],
        };
    };

    //   const dispatchMeta = function (dispatch, props) {};
    // const updateSelect = function (select, props) {};
    // const buildUI = function (props) {};

    return compose.compose(withDispatch(dispatchMeta), withSelect(updateSelect))(buildColorPicker);
}
