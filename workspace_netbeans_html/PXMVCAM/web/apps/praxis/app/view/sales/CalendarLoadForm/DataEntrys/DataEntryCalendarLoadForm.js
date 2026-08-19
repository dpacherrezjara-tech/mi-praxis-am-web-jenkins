prototype.idDE = prototype.id + 'DataEntryCalendarLoadForm';

Ext.define('Ext.Praxis.view.sales.CalendarLoadForm.DataEntrys.DataEntryCalendarLoadForm', {
	extend: 'Ext.window.Window',
	alias: 'widget.DataEntryCalendarLoadForm',

	requires: [
		'Ext.Praxis.controller.sales.CalendarLoadForm.DataEntryCalendarLoadFormController'
	],

	controller: 'DataEntryCalendarLoadFormController',
	title: 'Calendar Load',
	header: true,
	width: 750,
	height: 510,
	border: false,
	resizable: false,
	layout: {
		type: 'border',
		align: 'center'
	},
	modal: true,
	items: [
		{
			region: 'center',
			xtype: 'form',
			id: prototype.idDE + '-DataEntry-center',
			border: false,
			layout: 'vbox',
			items: [
				{
					xtype: 'panel',
					layout: 'vbox',
					border: false,
					margin: '3 3 3 3',
					flex: 1,
					width: '100%',
					items: [
						{
							xtype: 'panel',
							layout: 'vbox',
							border: false,
							items: [
								{
									xtype: 'form',
									id: prototype.idDE + '-form',
									layout: 'hbox',
									border: false,
									items: [
										{
											xtype: 'combobox',
											id: prototype.idDE + '-comboTipo',
											fieldLabel: 'Process Type',
											name: 'IN_TIPO_PROCESO',
											labelWidth: 80,
											width: 180,
											store: Ext.create('Ext.data.Store', {
												fields: ['value', 'text'],
												data: [
													{ value: 'FOB', text: 'FOB' },
													{ value: 'CONS', text: 'CONSORTIA' }
												]
											}),
											displayField: 'text',
											valueField: 'value',
											editable: false,
											allowBlank: false
										},
										{
											xtype: 'filefield',
											padding: '2 2 2 2',
											id: prototype.idDE + '-file',
											name: 'excelfile',
											fieldLabel: 'Upload file',
											labelAlign: 'right',
											labelStyle: 'font-weight: bold;',
											labelWidth: 80,
											allowBlank: false,
											accept: '.xlsx',
											width: 400,
											regex: /(.)+((\.xlsx)|(\.xlsx)(\w)?)$/i,
											regexText: 'Only .xlsx formats are accepted',
											buttonConfig: {
												text: 'Examine...',
												width: 90,
												glyph: 'xf3b6@Ionicons'
											}
										},
										{
											xtype: 'label',
											labelAlign: 'left',
											width: 250,
											padding: '5px 5px 2px 3px',
											html: '<strong style="color:#AC4546;font-size:12px;">* Valid file: .xlsx </strong>'
										}
									]
								},
								{
									xtype: 'toolbar',
									dock: 'bottom',
									ui: 'footer',
									margin: '1 0 1 0',
									layout: {
										pack: 'center'
									},
									fieldStyle: 'text-align:center',
									defaults: {
										scale: 'medium'
									},
									items: [
										{
											xtype: 'button',
											id: prototype.idDE + '-btn-upload',
											text: 'Upload',
											icon: 'resources/img/botones/update.png',
											listeners: {
												click: 'onbtnClick_upload_file'
											}
										}
									]
								}
							]
						},
						{
							xtype: 'panel',
							id: prototype.idDE + '-Text',
							border: false,
							layout: 'fit',
							width: '100%',
							height: 30,
							hidden: true,
							bodyPadding: 3,
							html: ''
						},
						{
							xtype: 'panel',
							id: prototype.idDE + '-PanelErrores',
							layout: 'fit',
							hidden: true,
							width: '100%',
							flex: 1,
							minHeight: 300,
							bodyPadding: 3,
							items: [
								{
									xtype: 'textarea',
									id: prototype.idDE + '-Errores',
									readOnly: true,
									scrollable: true,
									anchor: '100% 100%',
									style: {
										fontFamily: 'monospace',
										fontSize: '12px'
									}
								}
							]
						}
					]
				}
			]
		}
	],
	dockedItems: [
		{
			xtype: 'toolbar',
			dock: 'bottom',
			border: false,
			ui: 'footer',
			margin: '5 5 7 7',
			defaults: {
				scale: 'medium'
			},
			style: 'aling:center padding: 5px;',
			items: [
				{
					text: 'Close',
					id: prototype.idDE + '-btn',
					iconCls: 'prx-icon-cancel',
					listeners: {
						click: 'onCancelClick01'
					}
				}
			]
		}
	]
});