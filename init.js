(function ($) {
    $(document).ready(function () {
        const body = $('body');
        body.attr('show-outline', outlineUserOptions.show_outline);
        body.attr('show-block-name', outlineUserOptions.show_block_name);

        // update outline color
        document.documentElement.style.setProperty('--outline-color', outlineUserOptions.outline_color);

        // update text color
        const c = jQuery.Color(outlineUserOptions.outline_color);
        const lightness = c.lightness();
        let color = '#000000';
        if (lightness < 0.5) color = '#ffffff';

        document.documentElement.style.setProperty('--outline-text-color', color);

        // Set line style
        document.documentElement.style.setProperty('--outline-style', outlineUserOptions.outline_style);
    });
})(jQuery);
