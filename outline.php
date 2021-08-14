<?php
/*
Plugin Name: Editor Block Outline
Description: Add outline around Gutenberg blocks while editing
Version: 1.1.2
Author: Kalimah Apps
Author URI: https://github.com/kalimah-apps
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
	private $user_meta = array();

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
		/*
		Create array of user meta.
		This array will also be used when plugin is deleted to
		remove all meta
		*/
		$this->user_meta = array(
			'_enable_block_outline' => array(
				'type'          => 'string',
				'default'       => 'hover'
			),
			'_lock_block_outline' => array(
				'type'          => 'boolean',
				'default'       => true
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
			'_block_outline_padding' => array(
				'type'          => 'number',
				'default'       => 3,
			),
		);

		$default_options = array(
			'single'        => true,
			'show_in_rest'  => true,
			'auth_callback' => function () {
				return current_user_can( 'edit_posts' );
			},
		);

		// Merge default meta options and register meta
		foreach ( $this->user_meta as $meta_key => $meta_value ) {
			register_meta(
				'user',
				$meta_key,
				array_merge( $meta_value, $default_options )
			);
		}
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
				'file_path' => 'controls/line-padding-option.js',
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

		// Loop through scripts, prepeare enqueue arguments and add
		foreach ( $scripts as $script_details ) {
			$find = array( '.js', '/' );
			$replace = array( '', '-' );
			$handle = str_replace( $find, $replace, $script_details['file_path'] );

			$src = plugins_url( $script_details['file_path'], __FILE__ );
			$deps = $script_details['deps'];
			$version = filemtime( dirname( __FILE__ ) . '/' . $script_details['file_path'] );

			wp_enqueue_script( $handle, $src, $deps, $version );
		}

		wp_enqueue_style(
			'gird-style',
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

		$curent_user     = get_current_user_id();
		$show_block_name = get_user_meta( $curent_user, '_show_block_name', true );
		$show_class_name = get_user_meta( $curent_user, '_show_class_name', true );
		$lock_outline = get_user_meta( $curent_user, '_lock_block_outline', true );
		$block_data_position = get_user_meta( $curent_user, '_block_data_position', true );
		$outline_options  = array(
			'show_outline'    => get_user_meta( $curent_user, '_enable_block_outline', true ),
			'show_block_name' => ( $show_block_name ) ? 'true' : 'false',
			'show_class_name' => ( $show_class_name ) ? 'true' : 'false',
			'lock_block_outline' => ( $lock_outline ) ? 'true' : 'false',
			'block_data_position' => ( $block_data_position ) ? $block_data_position : 'outside',
			'outline_color'   => get_user_meta( $curent_user, '_block_outline_color', true ),
			'outline_style'   => get_user_meta( $curent_user, '_block_outline_style', true ),
			'outline_opacity' => get_user_meta( $curent_user, '_block_outline_opacity', true ),
			'outline_padding' => get_user_meta( $curent_user, '_block_outline_padding', true ),
		);
		wp_localize_script( 'outlines-init', 'outlineUserOptions', $outline_options );
	}
}

new EditorOutline();