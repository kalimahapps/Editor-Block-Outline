<?php
/*
Plugin Name: Editor Block Outline
Description: Add outline around Gutenberg blocks while editing
Version: 1.0.1
Author: Kalimah Apps
Author URI: https://github.com/kalimah-apps
License: GPLv2 or later
Text Domain: guten-outline
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('init', function () {
    wp_enqueue_script('jquery-color');
    register_meta('user', '_enable_block_outline', array(
        'type'          => 'string',
        'single'        => true,
        'default'       => 'hover',
        'show_in_rest'  => true,
        'auth_callback' => function () {
            return current_user_can('edit_posts');
        },
    ));

    register_meta('user', '_show_block_name', array(
        'type'          => 'boolean',
        'single'        => true,
        'default'       => true,
        'show_in_rest'  => true,
        'auth_callback' => function () {
            return current_user_can('edit_posts');
        },
    ));

    register_meta('user', '_block_outline_color', array(
        'type'          => 'string',
        'single'        => true,
        'default'       => '#bdc3c7',
        'show_in_rest'  => true,
        'auth_callback' => function () {
            return current_user_can('edit_posts');
        },
    ));

    register_meta('user', '_block_outline_style', array(
        'type'          => 'string',
        'single'        => true,
        'default'       => 'solid',
        'show_in_rest'  => true,
        'auth_callback' => function () {
            return current_user_can('edit_posts');
        },
    ));

    register_meta('user', '_block_outline_opacity', array(
        'type'          => 'number',
        'single'        => true,
        'default'       => 1,
        'show_in_rest'  => true,
        'auth_callback' => function () {
            return current_user_can('edit_posts');
        },
    ));
});

add_action('enqueue_block_editor_assets', function () {
    wp_enqueue_script(
        'outline-lines-option',
        plugins_url('controls/lines-option.js', __FILE__),
        array('wp-data'),
        filemtime(dirname(__FILE__) . '/controls/lines-option.js')
    );

    wp_enqueue_script(
        'outline-blockname-option',
        plugins_url('controls/block-name-option.js', __FILE__),
        array('wp-data'),
        filemtime(dirname(__FILE__) . '/controls/block-name-option.js')
    );

    wp_enqueue_script(
        'outline-line-color-option',
        plugins_url('controls/line-color-option.js', __FILE__),
        array('wp-data'),
        filemtime(dirname(__FILE__) . '/controls/line-color-option.js')
    );

    wp_enqueue_script(
        'outline-line-style-option',
        plugins_url('controls/line-style-option.js', __FILE__),
        array('wp-data'),
        filemtime(dirname(__FILE__) . '/controls/line-style-option.js')
    );

    wp_enqueue_script(
        'outline-line-opacity-option',
        plugins_url('controls/line-opacity-option.js', __FILE__),
        array('wp-data'),
        filemtime(dirname(__FILE__) . '/controls/line-opacity-option.js')
    );

    wp_enqueue_script(
        'outline-sidebar',
        plugins_url('sidebar.js', __FILE__),
        array('outline-lines-option', 'outline-blockname-option', 'outline-line-color-option', 'outline-line-opacity-option', 'wp-i18n', 'wp-blocks', 'wp-edit-post', 'wp-element', 'wp-editor', 'wp-components', 'wp-data', 'wp-plugins'),
        filemtime(dirname(__FILE__) . '/sidebar.js')
    );

    wp_enqueue_script(
        'outline-lines-icon',
        plugins_url('icon.js', __FILE__),
        array('wp-element'),
        filemtime(dirname(__FILE__) . '/icon.js')
    );
});

add_action('enqueue_block_editor_assets', function () {
    wp_enqueue_style('gird-style', plugin_dir_url(__FILE__) . "/block-editor.css", false, '1.0', 'all');
});

add_action('admin_enqueue_scripts', function () {
    wp_enqueue_script(
        'outlines-init',
        plugins_url('init.js', __FILE__),
        array('jquery'),
        filemtime(dirname(__FILE__) . '/init.js')
    );

    $curent_user     = get_current_user_id();
    $show_block_name = get_user_meta($curent_user, '_show_block_name', true);
    $outlineOptions  = array(
        'show_outline'    => get_user_meta($curent_user, '_enable_block_outline', true),
        'show_block_name' => ($show_block_name) ? 'true' : 'false',
        'outline_color'   => get_user_meta($curent_user, '_block_outline_color', true),
        'outline_style'   => get_user_meta($curent_user, '_block_outline_style', true),
        'outline_opacity' => get_user_meta($curent_user, '_block_outline_opacity', true),
    );
    wp_localize_script('outlines-init', 'outlineUserOptions', $outlineOptions);
});