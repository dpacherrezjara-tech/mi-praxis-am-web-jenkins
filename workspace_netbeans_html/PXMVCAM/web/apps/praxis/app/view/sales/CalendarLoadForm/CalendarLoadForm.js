// <editor-fold defaultstate="collapsed" desc="prototype">
prototype.id = 'CalendarLoadForm';
// prototype.url = CONTEXTPATH + '/CalendarLoadForm';
prototype.widthContenedor = 1800;
// </editor-fold>

Ext.define('Ext.Praxis.view.sales.CalendarLoadForm.CalendarLoadForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.CalendarLoadForm',
	requires: [
		'Ext.Praxis.controller.sales.CalendarLoadForm.CalendarLoadFormController',
		'Ext.Praxis.view.sales.CalendarLoadForm.Options',
		'Ext.Praxis.view.sales.CalendarLoadForm.Filters',
		'Ext.Praxis.view.sales.CalendarLoadForm.Info'
	],
	controller: 'CalendarLoadFormController',
	layout: {
		type: 'fit'
	},
	padding: '0 0 0 0',
	border: false,
	defaults: {
		border: false
	},
	items: [
		{
			id: prototype.id + '-xpanel',
			border: false,
			autoScroll: false,
			layout: 'fit',
			items: [
				{
					id: prototype.id + '-form',
					border: false,
					bodyCls: 'colorFondo',
					layout: 'fit',
					items: [
						{
							xtype: 'panel',
							region: 'center',
							width: prototype.width,
							layout: 'border',
							items: [
								{
									region: 'center',
									id: prototype.id + '-centerC',
									layout: {
										type: 'vbox',
										align: 'center'
									},
									border: true,
									autoScroll: true,
									defaults: {
										width: prototype.widthContenedor,
										align: 'center'
									},
									items: [
										{
											xtype: prototype.id + '-options'
										},
										{
											xtype: prototype.id + '-filters',
											id: prototype.id + '-contentFilter'
										},
										{
											xtype: 'panel',
											id: prototype.id + '-mainContent',
											bodyStyle: 'background-color: #E3EAF9;',
											height: 630,
											layout: {
												type: 'vbox',
												align: 'center'
											},
											items: []
										}
									]
								}
							]
						}
					]
				}
			]
		}
	]
});