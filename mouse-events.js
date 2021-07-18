(function ($) {
	$(document).ready(() => {
		// Create floating element and append it to body
		const floatingEl = jQuery("<div class='outline-floating-block-data'></div>");
		jQuery('body').append(floatingEl);

		// Handle moust events for enter, out and over for each block
		jQuery('body')
			.on(
				'mouseover',
				'.block-editor-block-list__layout .wp-block:not(.block-list-appender):not(.block-editor-default-block-appender)',
				function (event) {
					event.stopPropagation();

					const el = jQuery(this);

					// Get block data
					const title = el.attr('data-title');
					const type = el.attr('data-type');
					const classes = el.attr('class').split(' ');

					const classesWrappers = classes.map((className) => `<li>${className}</li>`).join(' ');

					// Get plugin settings
					const body = jQuery('body');
					const showTitle = body.attr('show-block-name');
					const showClasses = body.attr('show-class-name');

					// Show title if user enabled it
					if (showTitle === 'true') {
						floatingEl.append(`<div class='floating-row-title'>${title}</div>`);
						floatingEl.append(`<div class='floating-row'>Type: ${type}</div>`);
					}

					// show classes list if user enabled it
					if (showClasses === 'true') {
						floatingEl.append(`<div class='floating-row'>Classes: <ul>${classesWrappers}</ul></div>`);
					}

					// Don't show the box if showtitle and showclasses are false
					if (showTitle !== 'true' && showClasses !== 'true') {
						return;
					}
					floatingEl.css({ opacity: 1 });
				}
			)
			.on('mouseout', '.block-editor-block-list__layout .wp-block', () => {
				floatingEl.css({ opacity: 0 }).html('');
			})
			.on('mousemove', '.block-editor-block-list__layout .wp-block', (event) => {
				floatingEl.css({
					left: event.pageX,
					top: event.pageY,
				});
			});
	});
})(jQuery);
