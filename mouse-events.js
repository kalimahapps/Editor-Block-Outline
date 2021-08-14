(function ($) {
	$(document).ready(() => {
		// Create floating element and append it to body
		const floatingEl = jQuery("<div class='outline-floating-block-data'></div>");
		jQuery('body').append(floatingEl);

		let isFloating = false;

		// Handle moust events for enter, out and over for each block
		jQuery('body')
			.on(
				'mouseover',
				'.block-editor-block-list__layout .wp-block:not(.block-list-appender):not(.block-editor-default-block-appender)',
				function (event) {
					event.stopPropagation();

					const el = jQuery(this);
					el.addClass('outline-block-hovered');

					// Get block data
					const title = el.attr('data-title');
					const type = el.attr('data-type');
					const classes = el.attr('class').split(' ');

					const classesWrappers = classes.map((className) => `<li>${className}</li>`).join(' ');

					// Get plugin settings
					const body = jQuery('body');
					const showTitle = body.attr('show-block-name');
					const showClasses = body.attr('show-class-name');
					const dataPosition = body.attr('block-data-position');

					// Don't show if position is not floating
					if (dataPosition !== 'floating') {
						isFloating = false;
						return;
					}

					isFloating = true;

					// Don't show the box if showtitle and showclasses are false
					if (showTitle !== 'true' && showClasses !== 'true') {
						return;
					}

					// Show title if user enabled it
					if (showTitle === 'true') {
						floatingEl.append(`<div class='floating-row-title'>${title}</div>`);
						floatingEl.append(`<div class='floating-row'>Type: ${type}</div>`);
					}

					// show classes list if user enabled it
					if (showClasses === 'true') {
						floatingEl.append(`<div class='floating-row'>Classes: <ul>${classesWrappers}</ul></div>`);
					}

					floatingEl.css({ opacity: 1 });
				}
			)
			.on('mouseout', '.block-editor-block-list__layout .wp-block', function (event) {
				floatingEl.css({ opacity: 0 }).html('');

				const el = jQuery(this);
				el.removeClass('outline-block-hovered');
			})
			.on('mousemove', '.block-editor-block-list__layout .wp-block', (event) => {
				// Change position only for floating setting
				if (isFloating === false) {
					return;
				}

				floatingEl.css({
					left: event.pageX,
					top: event.pageY,
				});
			});
	});
})(jQuery);
