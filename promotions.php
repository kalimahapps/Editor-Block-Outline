<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Manage promotion links for plugin.
 */
class EditorOutlinePromoptions {
	/**
	 * Constructor function. Add hooks for filters and actions
	 */
	public function __construct() {
		add_filter( 'plugin_action_links', array( $this, 'add_plugin_links' ), 10, 4 );
		add_filter( 'network_admin_plugin_action_links', array( $this, 'add_plugin_links' ), 10, 2 );
	}

	/**
	 * Add GitHub and twitter links to plugin actions
	 *
	 * @param array  $actions Current plugin links array
	 * @param string $plugin_file Plugin file name including directory
	 * @return array Return $actions if not outline plugin, otherwise modified $actions with new links
	 */
	public function add_plugin_links( array $actions, string $plugin_file ) {
		if ( $plugin_file !== 'editor-block-outline/outline.php' ) {
			return $actions;
		}

		$links_array = array(
			'GitHub' => 'https://github.com/kalimah-apps/Editor-Block-Outline',
			'twitter' => 'https://twitter.com/KalimahApps',
		);

		$links = array();
		foreach ( $links_array as $title => $link ) {
			$links[ $title ] = "<a target='_blank' href='{$link}'>{$title}</a>";
		}

		return array_merge( $links, $actions );

	}
}

new EditorOutlinePromoptions();