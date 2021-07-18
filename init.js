(function ($) {
	$(document).ready(() => {
		const body = $('body');
		body.attr('show-outline', outlineUserOptions.show_outline);
		body.attr('show-block-name', outlineUserOptions.show_block_name);
		body.attr('show-class-name', outlineUserOptions.show_class_name);
		body.attr('lock-block-outline', outlineUserOptions.lock_block_outline);
		body.attr('block-data-position', outlineUserOptions.block_data_position);

		// update outline color
		const c = jQuery.Color(outlineUserOptions.outline_color);
		c.toHslaString();

		// Form HSLA color
		const saturation = Math.round(c._hsla[1] * 100);
		const lightness = Math.round(c._hsla[2] * 100);

		const hsla = `hsla(${c._hsla[0]}deg, ${saturation}%, ${lightness}%, var(--outline-opacity))`;
		document.documentElement.style.setProperty('--outline-color', hsla);

		// update text color
		const colorLightness = c.lightness();
		let color = '#000000';
		if (colorLightness < 0.5) {
			color = '#ffffff';
		}
		document.documentElement.style.setProperty('--outline-text-color', color);

		// Set line style
		document.documentElement.style.setProperty('--outline-style', outlineUserOptions.outline_style);

		// Set outline opacity
		const opacity = outlineUserOptions.outline_opacity / 100;
		document.documentElement.style.setProperty('--outline-opacity', opacity);

		// Set outline padding
		const padding = outlineUserOptions.outline_padding;
		document.documentElement.style.setProperty('--outline-padding', `${padding}px`);
	});
})(jQuery);
