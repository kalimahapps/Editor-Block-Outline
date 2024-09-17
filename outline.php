<?php
/*
Plugin Name: Editor Block Outline
Description: Add outline around Gutenberg blocks while editing
Version: 1.4.2
Author: Kalimah Apps
Author URI: https://github.com/kalimahapps
License: GPLv2 or later
Text Domain: editor-outline
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once( 'promotions.php' );
/**
 * Editor outline class to wrap plugin functions and actions
 */
class EditorOutline {

	/**
	 * Constructor function.
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'register_user_meta' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'add_editor_assets' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'add_init_scripts' ) );
	}


	/**
	 * Register user meta to save settings for each user separately
	 *
	 * @return void
	 */
	public function register_user_meta() {

		/**
		 * Create default user meta options
		 */
		$default_user_meta = array(
			'_enable_block_outline' => array(
				'type'          => 'string',
				'default'       => 'hover',
			),
			'_lock_block_outline' => array(
				'type'          => 'boolean',
				'default'       => true,
			),
			'_show_block_name' => array(
				'type'          => 'boolean',
				'default'       => true,
			),
			'_show_class_name' => array(
				'type'          => 'boolean',
				'default'       => false,
			),
			'_block_outline_color' => array(
				'type'          => 'string',
				'default'       => '#bdc3c7',
			),
			'_block_data_position' => array(
				'type'          => 'string',
				'default'       => 'outside',
			),
			'_block_outline_style' => array(
				'type'          => 'string',
				'default'       => 'solid',
			),
			'_block_outline_opacity' => array(
				'type'          => 'number',
				'default'       => 50,
			),
			'_enable_block_outline_padding' => array(
				'type'          => 'boolean',
				'default'       => false,
			),
			'_block_outline_padding' => array(
				'type'          => 'number',
				'default'       => 3,
			),
		);

		$default_user_meta = $this->process_meta_filter($default_user_meta);

		$standard_options = array(
			'single'        => true,
			'show_in_rest'  => true,
			'auth_callback' => function () {
				return current_user_can( 'edit_posts' );
			},
		);

		// Merge default meta options and register meta
		foreach ( $default_user_meta as $meta_key => $meta_value ) {

			register_meta(
				'user',
				$meta_key,
				array_merge( $meta_value, $standard_options )
			);
		}
	}

	/**
	 * Custom version of wp_die() to show error messages
	 *
	 * @param {string|array} $message Message to show
	 *
	 * @return void
	 */
	private function wp_die($message) {
		$message = is_array($message) ? $message : array($message);

		$heading = "<h2>Editor Block Outline</h2>";
		$heading .= "<h4>Filter: editor_outline_default_user_meta</h4>";
		array_unshift($message, $heading);

		error_log(print_r($message,1));
		wp_die(implode('<br>', $message));
	}


	private function process_meta_filter(array $default_user_meta): array {
		// Create an associative array of default user meta options
		$user_meta_associative = array_map( function( $item ) {
			return $item['default'];
		}, $default_user_meta );

		/**
		 * Add filter to allow modifying user meta options
		 * @since 1.3.0
		 */
		$filtered_user_meta = apply_filters( 'editor_outline_default_user_meta', $user_meta_associative );

		// Make sure filtered user meta is an array
		if ( !is_array( $filtered_user_meta ) ) {
			$this->wp_die(
				"Default user meta options must be an <strong>array</strong>. You passed <strong>" . gettype( $filtered_user_meta ) . "</strong>.",
			);
		}

		foreach ( $filtered_user_meta as $meta_key => $meta_value ) {
			// Check that key exists in default user meta
			if ( !array_key_exists( $meta_key, $default_user_meta ) ) {
				$available_options = array_keys( $default_user_meta );
				$formatted_options = array_map( function( $item ) {
					return "<li>{$item}</li>";
				}, $available_options );

				$joined_options = implode( '', $formatted_options );
				$this->wp_die([
					"User meta option <strong>{$meta_key}</strong> does not exist in default user meta.",
					"Available options are: <ul>{$joined_options}</ul>"
				]);
			}

			// Check that value type matches default user meta
			$default_key_type =  $default_user_meta[ $meta_key ]['type'];
			$filtered_meta_type = gettype( $meta_value );

			if( $filtered_meta_type === 'integer' ) {
				$filtered_meta_type = 'number';
			}

			if ( $filtered_meta_type !== $default_key_type ) {
				$this->wp_die([
					"User meta option <strong>{$meta_key}</strong> must be of type <strong>$default_key_type</strong>.",
					"You passed <strong>" . gettype( $meta_value ) . "</strong>."
				]);
			}

			// Boolean values are passed as strings, so we need to convert them back to booleans
			if ( $default_key_type === 'boolean' ) {
				$meta_value = filter_var($meta_value, FILTER_VALIDATE_BOOLEAN);
			}

			// Override default user meta with filtered user meta
			$default_user_meta[ $meta_key ]['default'] = $meta_value;
		}

		return $default_user_meta;
	}

	/**
	 * Add js/css file to Gutenberg editor
	 *
	 * @return void
	 */
	public function add_editor_assets() {
		wp_enqueue_script( 'jquery-color' );

		// Enqueue scripts
		$scripts = array(
			array(
				'file_path' => 'utils.js',
				'deps' => array( 'jquery' ),
			),
			array(
				'file_path' => 'controls.js',
				'deps' => array(
					'wp-element',
					'wp-components',
					'wp-data'
				),
			),
			array(
				'file_path' => 'controls/lines-option.js',
				'deps' => array( 'wp-data' ),
			),
			array(
				'file_path' => 'controls/block-name-option.js',
				'deps' => array( 'wp-data' ),
			),
			array(
				'file_path' => 'controls/block-class-option.js',
				'deps' => array( 'wp-data' ),
			),
			array(
				'file_path' => 'controls/lock-block-outline.js',
				'deps' => array( 'wp-data' ),
			),
			array(
				'file_path' => 'controls/line-color-option.js',
				'deps' => array( 'wp-data' ),
			),
			array(
				'file_path' => 'controls/line-style-option.js',
				'deps' => array( 'wp-data' ),
			),
			array(
				'file_path' => 'controls/block-data-position.js',
				'deps' => array( 'wp-data' ),
			),
			array(
				'file_path' => 'controls/line-opacity-option.js',
				'deps' => array( 'wp-data' ),
			),
			array(
				'file_path' => 'controls/enable-block-padding-option.js',
				'deps' => array( 'wp-data' ),
			),
			array(
				'file_path' => 'controls/block-padding-option.js',
				'deps' => array( 'wp-data' ),
			),
			array(
				'file_path' => 'sidebar.js',
				'deps' => array(
					'wp-i18n',
					'wp-blocks',
					'wp-edit-post',
					'wp-element',
					'wp-editor',
					'wp-plugins'
				),
			),
			array(
				'file_path' => 'icon.js',
				'deps' => array( 'wp-element' ),
			),
			array(
				'file_path' => 'mouse-events.js',
				'deps' => array( 'jquery' ),
			)
		);

		// Loop through scripts, prepare enqueue arguments and add
		foreach ( $scripts as $script_details ) {
			$find = array( '.js', '/' );
			$replace = array( '', '-' );
			$file_name = str_replace( $find, $replace, $script_details['file_path'] );
			$handle = "editor-{$file_name}";

			$src = plugins_url( $script_details['file_path'], __FILE__ );
			$deps = $script_details['deps'];
			$version = filemtime( dirname( __FILE__ ) . '/' . $script_details['file_path'] );

			wp_enqueue_script( $handle, $src, $deps, $version );
		}

		wp_enqueue_style(
			'block-editor-outline',
			plugin_dir_url( __FILE__ ) . '/block-editor.css',
			false,
			filemtime( dirname( __FILE__ ) . '/block-editor.css' ),
			'all'
		);
	}

	/**
	 * Add init script to initialize data
	 *
	 * @return void
	 */
	public function add_init_scripts() {
		wp_enqueue_script(
			'outlines-init',
			plugins_url( 'init.js', __FILE__ ),
			array( 'jquery' ),
			filemtime( dirname( __FILE__ ) . '/init.js' )
		);

		$current_user     = get_current_user_id();
		$show_block_name = get_user_meta( $current_user, '_show_block_name', true );
		$show_class_name = get_user_meta( $current_user, '_show_class_name', true );
		$lock_outline = get_user_meta( $current_user, '_lock_block_outline', true );
		$block_data_position = get_user_meta( $current_user, '_block_data_position', true );
		$enable_outline_padding = get_user_meta( $current_user, '_enable_block_outline_padding', true );
		$outline_options  = array(
			'show_outline'    => get_user_meta( $current_user, '_enable_block_outline', true ),
			'show_block_name' => ( $show_block_name ) ? 'true' : 'false',
			'show_class_name' => ( $show_class_name ) ? 'true' : 'false',
			'lock_block_outline' => ( $lock_outline ) ? 'true' : 'false',
			'block_data_position' => ( $block_data_position ) ? $block_data_position : 'outside',
			'outline_color'   => get_user_meta( $current_user, '_block_outline_color', true ),
			'outline_style'   => get_user_meta( $current_user, '_block_outline_style', true ),
			'outline_opacity' => get_user_meta( $current_user, '_block_outline_opacity', true ),
			'enable_outline_padding' => ( $enable_outline_padding ) ? 'true' : 'false',
			'outline_padding' => get_user_meta( $current_user, '_block_outline_padding', true ),
		);
		wp_localize_script( 'outlines-init', 'outlineUserOptions', $outline_options );
	}
}

new EditorOutline();