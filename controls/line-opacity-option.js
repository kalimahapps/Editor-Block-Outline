function outlineOpacityOption(element, components, data, compose) {
    const el = element.createElement;
    const { withSelect, withDispatch } = data;
    const { withState } = compose;
    const { RangeControl } = components;
    const { __ } = wp.i18n;
    let timeout = null;

    /**
     * Update user meta data on selection
     */
    const dispatchMeta = function (dispatch, props) {
        return {
            setMetaValue: function (metaValue) {
                const userData = data.select('core').getCurrentUser();
                const user = data.select('core').getEntityRecord('root', 'user', userData.id);

                let outlineMeta = {};
                outlineMeta[props.metaKey] = metaValue;
                dispatch('core').saveUser({
                    id: user.id,
                    meta: { ...user.meta, ...outlineMeta },
                });
            },
        };
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
            metaValue: user == undefined ? 1 : user.meta[props.metaKey],
        };
    };

    /**
     * Build and show button group to user
     * @param {object} props
     */
    const buildUI = function (props) {
        let currentValue = props.metaValue;
        let opacityValue = props.opacityState;

        if (currentValue == undefined) currentValue = 1;
        if (opacityValue != undefined && opacityValue != '') currentValue = opacityValue;

        return el(RangeControl, {
            value: currentValue,
            onChange: function (value) {
                // Convert value to decimal
                const metaValueDeci = value / 100;
                let root = document.documentElement;
                root.style.setProperty('--outline-opacity', metaValueDeci);

                props.setState({
                    opacityState: value,
                });

                // Debounce so value is only updated in meta once user stops dragging
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    props.setMetaValue(value);
                }, 500);
            },
            min: 10,
            max: 100,
        });
    };

    return compose.compose(
        withDispatch(dispatchMeta),
        withSelect(updateSelect),
        withState({ opacityState: '' })
    )(buildUI);
}
