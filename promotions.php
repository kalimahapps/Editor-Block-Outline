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
		add_action( 'admin_notices', array( $this, 'twitter_admin_notice' ) );
		add_filter( 'plugin_action_links', array( $this, 'add_plugin_links' ), 10, 4 );
		add_filter( 'network_admin_plugin_action_links', array( $this, 'add_plugin_links' ), 10, 2 );
		add_action( 'admin_init', array( $this, 'check_notice_dismissed' ) );
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

	/**
	 * Display twitter admin notice to user if it has not been dismissed
	 *
	 * @return void
	 */
	public function twitter_admin_notice() {
		 $user_id = get_current_user_id();
		if ( get_user_meta( $user_id, 'editor_outline_dismiss_twitter_notice' ) ) {
			return;
		}

		$dismiss_url = add_query_arg( 'editor-outline-dismiss-twitter-notice', '' );

		$notice = '<div class="notice notice-success">';
		$notice .= '<p><strong>Editor Block Outline: </strong>';
		$notice .= 'Follow <a target="_blank" href="https://twitter.com/intent/follow?screen_name=kalimahapps&tw_p=followbutton">Kalimah Apps</a> twitter account for updates and other useful plugins. ';
		$notice .= "<a href='{$dismiss_url}'>Dismiss</a>";
		$notice .= '</p></div>';
		echo $notice;
	}

	/**
	 * Check fo user dismiss action for admin notice. Add user meta if action occured
	 *
	 * @return void
	 */
	public function check_notice_dismissed() {
		$user_id = get_current_user_id();
		if ( isset( $_GET['editor-outline-dismiss-twitter-notice'] ) ) {
			update_user_meta( $user_id, 'editor_outline_dismiss_twitter_notice', 'true', true );
		}
	}
}

new EditorOutlinePromoptions();