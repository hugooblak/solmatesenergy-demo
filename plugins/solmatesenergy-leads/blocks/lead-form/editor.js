/**
 * Editor side of the Offertformulär block. No build step: plain JavaScript using WordPress's globals.
 * The preview is rendered by the same PHP as the live site, so what you see is what visitors get.
 */
( function ( wp ) {
	var el = wp.element.createElement;
	var __ = wp.i18n.__;
	var InspectorControls = wp.blockEditor.InspectorControls;
	var useBlockProps = wp.blockEditor.useBlockProps;
	var PanelBody = wp.components.PanelBody;
	var SelectControl = wp.components.SelectControl;
	var TextControl = wp.components.TextControl;
	var Disabled = wp.components.Disabled;
	var ServerSideRender = wp.serverSideRender;

	wp.blocks.registerBlockType( 'solmatesenergy/lead-form', {
		edit: function ( props ) {
			var a = props.attributes;
			return el(
				'div',
				useBlockProps(),
				el(
					InspectorControls,
					null,
					el(
						PanelBody,
						{ title: __( 'Formulärinställningar', 'solmatesenergy-leads' ) },
						el( SelectControl, {
							label: __( 'Formulärtyp', 'solmatesenergy-leads' ),
							value: a.variant,
							options: [
								{ label: __( 'Start (Postnummer only, for heroes and page ends)', 'solmatesenergy-leads' ), value: 'start' },
								{ label: __( 'Fullt (alla fyra steg, för offertsidan)', 'solmatesenergy-leads' ), value: 'full' },
							],
							onChange: function ( v ) { props.setAttributes( { variant: v } ); },
						} ),
						a.variant === 'start' && el( TextControl, {
							label: __( 'Knapptext', 'solmatesenergy-leads' ),
							help: __( 'Leave empty for "Räkna på mitt tak".', 'solmatesenergy-leads' ),
							value: a.buttonText,
							onChange: function ( v ) { props.setAttributes( { buttonText: v } ); },
						} ),
						el( 'p', { style: { color: '#555' } }, __( 'Questions and answer choices are set in the Solmates Energy Leads plugin (includes/fields.php). Leads appear under Leads in the admin menu.', 'solmatesenergy-leads' ) )
					)
				),
				el( Disabled, null, el( ServerSideRender, { block: 'solmatesenergy/lead-form', attributes: a } ) )
			);
		},
		save: function () { return null; },
	} );
} )( window.wp );
