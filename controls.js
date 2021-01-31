/**
 * Provide common functions to controls to use.
 * Controls file can only provide UI function to render control
 */
class Controls {
	el = wp.element.createElement;
	components = wp.components;
	data = wp.data;
	i18n = wp.i18n;
	timeout = null;

	/**
	 * Build control UI. Control function provide UI options
	 * and optionally a state object to stop UI flickering with
	 * every API update
	 *
	 * @param {function} buildUI
	 * @param {object} state
	 */
	constructor(buildUI, state = {}) {
		let compose = wp.compose;
		const { withState } = compose;
		const { withSelect, withDispatch } = wp.data;

		return compose.compose(
			withDispatch(this.dispatchMeta.bind(this)),
			withSelect(this.updateSelect.bind(this)),
			withState(state)
		)(buildUI.bind(this));
	}

	/**
	 * Update user meta data on selection
	 */
	dispatchMeta(dispatch, props) {
		return {
			setMetaValue: (metaValue) => {
				const userData = this.data.select('core').getCurrentUser();
				const user = this.data.select('core').getEntityRecord('root', 'user', userData.id);

				let meta = {
					[props.metaKey]: metaValue,
				};

				dispatch('core').saveUser({
					id: user.id,
					meta: { ...user.meta, ...meta },
				});
			},
		};
	}

	/**
	 * Debounce function
	 *
	 * @param {function} func Callback function
	 * @param {int} wait Timeout time. Default to 1 second
	 */
	debounce(func, wait = 1000) {
		return (...args) => {
			const later = () => {
				clearTimeout(this.timeout);
				func(...args);
			};
			clearTimeout(this.timeout);
			this.timeout = setTimeout(later, wait);
		};
	}

	/**
	 * Update user selection
	 *
	 * @param {object} select WP object
	 * @param {object} props WP object
	 */
	updateSelect(select, props) {
		const userData = this.data.select('core').getCurrentUser();
		if (Object.keys(userData).length == 0) return {};

		const user = select('core').getEntityRecord('root', 'user', userData.id);
		return {
			metaValue: user == undefined ? true : user.meta[props.metaKey],
		};
	}
}
