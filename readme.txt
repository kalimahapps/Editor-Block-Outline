=== Editor Block Outline ===
Contributors: khr2003,tfrommen,sephsekla
Tags: gutenberg,outline,editor,blocks,layout
Requires at least: 5.0
Tested up to: 6.5
Stable tag: 1.4.2
Requires PHP: 7.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Add outline around Gutenberg blocks while editing

== Description ==

This a Gutenberg plugin that adds an outline around each block. Outline settings are based on user meta. Each user can
change the settings according to their needs and it will applied only to their account.

Users can change:

- When to show outline. On hover or always displayed.
- Lock outline for a single block.
- Disable outline completely.
- Show data (name and class) outside block, inside or floating when hovering over block
- Change outline color.
- Change outline style to solid, dashed or dotted line
- Change padding size
- Show/hide block name

== Screenshots ==

1. Outline around each block when set to always visible
2. Editor outline settings

== Filters ==
- editor_outline_default_user_meta
You can override the default user meta by using this filter. The filter will receive the default user meta as an array and
you can return a modified array.
Check github repo for more information. https://github.com/kalimahapps/Editor-Block-Outline#filters

== Changelog ==

= 1.4.1 =
- Update inconsistent documentation

= 1.4.0 =
- Remove editor scripts from the frontend of the site

= 1.3.2 =
- Updated and fixed compatibility issues with WordPress 6.5

= 1.3.1 =
- Tested with version 6.5

= 1.3.0 =
- Add default meta filter

= 1.2.1 =
- Fixed colorpalette issue with WordPress 6.0+

= 1.2 =
- Added toggle for enabling/disabling outline padding
**Please note that this is a breaking behavioral change. Users who set
padding previously will need to enable this option for padding to take
effect.**

= 1.1.2 =
- Fixed block title for cover block

= 1.1.1 =
- Fixed floating box bug
- Set initial show class name to false

= 1.1 =
- Added data position setting (outside, inside or floating)
- Added show class name option
- Fixed hover setting for nested blocks
- Removed twitter admin notice
- Code formatting and optimization

= 1.0.4 =
- Fixed bugs

= 1.0.3 =

- Added lock outline per single block
- Added outline padding
- Fixed drag and drop issue with WP 5.7 where dragging line is not showing
- Removed outline for add block box
- New icon and banner design
- Fixed block name for spacer block

= 1.0.2 =

- Code formatting and optimization

= 1.0.1 =

- Added opacity option

= 1.0 =

- First version
