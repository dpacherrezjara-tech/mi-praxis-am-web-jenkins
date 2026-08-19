prototype.id02 = 'DataEntryRulesForm';

Ext.define('Ext.Praxis.view.salesaudit.MaintenanceAnalystsForm.DataEntryRules', {
	extend: 'Ext.window.Window',
	alias: 'widget.DataEntryRules',

	controller: 'DataEntryRulesController',

	requires: [
		'Ext.Praxis.controller.salesaudit.MaintenanceAnalysts.DataEntryRulesController'
	],

	id: prototype.id02 + '-winRules',
	title: 'Rules',
	header: true,
	height: 530,
	width: 700,
	border: false,
	resizable: false,
	layout: 'fit',
	modal: true,

	listeners: {
		afterrender: 'afterRender'
	},

	items: [
		{
			xtype: 'panel',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			border: false,
			bodyPadding: 5,
			scrollable: true,
			items: [
				// SECCIÓN 1: NEW RULE
				{
					xtype: 'fieldset',
					title: 'New Rule',
					margin: '0 0 5 0',
					flex: 0,
					items: [
						{
							xtype: 'container',
							layout: 'hbox',
							margin: '0 0 5 0',
							items: [
								{
									xtype: 'combo',
									id: prototype.id02 + '-cmbSource',
									fieldLabel: 'Source',
									queryMode: 'local',
									displayField: 'name',
									valueField: 'code',
									// editable: false,
									forceSelection: true,
									allowBlank: false,
									labelWidth: 50,
									width: 130,
									margin: '0 10 0 0',
									listeners: {
										change: 'onSourceChange'
									}
								},
								{
									xtype: 'combo',
									id: prototype.id02 + '-cmbChannel',
									fieldLabel: 'Channel',
									labelWidth: 50,
									queryMode: 'local',
									displayField: 'name',
									valueField: 'code',
									// editable: false,
									forceSelection: true,
									allowBlank: false,
									width: 140,
									margin: '0 10 0 0'
								},
								{
									xtype: 'combo',
									id: prototype.id02 + '-cmbTrans',
									fieldLabel: 'Transaction',
									labelWidth: 65,
									queryMode: 'local',
									displayField: 'name',
									valueField: 'code',
									// editable: false,
									forceSelection: true,
									allowBlank: false,
									width: 150,
									margin: '0 10 0 0'
								},
								{
									xtype: 'textfield',
									id: prototype.id02 + '-cmbFcmi',
									name: 'A4420FCMI',
									fieldLabel: 'Fcmi',
									enforceMaxLength: true,
									maxLength: 10,
									labelWidth: 30,
									width: 150
								}
							]
						},
						{
							xtype: 'container',
							layout: 'hbox',
							margin: '0 0 10 0',
							items: [
								{
									xtype: 'textfield',
									id: prototype.id02 + '-cmbQueq',
									name: 'A4420QUEQ',
									fieldLabel: 'Queq',
									enforceMaxLength: true,
									maxLength: 10,
									labelWidth: 40,
									width: 300,
									margin: '0 10 0 0'
								},
								{
									xtype: 'textfield',
									id: prototype.id02 + '-cmbIata',
									name: 'A4420IATA',
									fieldLabel: 'Iata',
									enforceMaxLength: true,
									maxLength: 10,
									labelWidth: 30,
									width: 300
								}
							]
						},
						{
							xtype: 'container',
							layout: {
								type: 'hbox',
								pack: 'end',
								padding: '5 10'
							},
							items: [
								{
									xtype: 'button',
									id: prototype.id02 + '-btn-addnew',
									text: 'Add New Rule',
									scale: 'medium',
									iconCls: 'prx-icon-save',
									handler: 'onAddNewRulesClick',
									listeners: {
										click: function (btn, e) {
											console.log('Click en Add New Rule button');
											e.stopPropagation();
										}
									}
								}
							]
						}
					]
				},

				// SECCIÓN 2: ALL RULES (GRID)
				{
					xtype: 'fieldset',
					title: 'All Rules',
					flex: 1,
					layout: 'fit',
					margin: 0,
					items: [
						{
							xtype: 'grid',
							id: prototype.id02 + '-gridDetails',
							border: true,
							columnLines: true,
							selModel: {
								selType: 'checkboxmodel',
								mode: 'MULTI',
								checkOnly: true
							},
							store: Ext.create('Ext.data.Store', {
								fields: [
									'A4420COD',
									'A4420FUENT',
									'A4420CANAL',
									'A4420QUEQ',
									'A4420TRAS',
									'A4420IATA',
									'A4420FCMI',
									'__isNew'
								],
								data: []
							}),
							columns: [
								{
									text: 'Code',
									dataIndex: 'A4420COD',
									width: 70,
									renderer: function (value, metaData, record) {
										if (record.get('__isNew')) {
											metaData.style = 'background-color: #d4edda; color: #155724; font-weight: bold;';
										}
										return value;
									}
								},
								{
									text: 'Channel',
									dataIndex: 'A4420CANAL',
									width: 80,
									renderer: function (value, metaData, record) {
										if (record.get('__isNew')) {
											metaData.style = 'background-color: #d4edda; color: #155724; font-weight: bold;';
										}
										return value;
									}
								},
								{
									text: 'Fcmi',
									dataIndex: 'A4420FCMI',
									width: 60,
									renderer: function (value, metaData, record) {
										if (record.get('__isNew')) {
											metaData.style = 'background-color: #d4edda; color: #155724; font-weight: bold;';
										}
										return value;
									}
								},
								{
									text: 'Source',
									dataIndex: 'A4420FUENT',
									width: 60,
									renderer: function (value, metaData, record) {
										if (record.get('__isNew')) {
											metaData.style = 'background-color: #d4edda; color: #155724; font-weight: bold;';
										}
										return value;
									}
								},
								{
									text: 'IATA',
									dataIndex: 'A4420IATA',
									width: 120,
									renderer: function (value, metaData, record) {
										if (record.get('__isNew')) {
											metaData.style = 'background-color: #d4edda; color: #155724; font-weight: bold;';
										}
										return value;
									}
								},
								{
									text: 'Queue',
									dataIndex: 'A4420QUEQ',
									flex: 1,
									renderer: function (value, metaData, record) {
										if (record.get('__isNew')) {
											metaData.style = 'background-color: #d4edda; color: #155724; font-weight: bold;';
										}
										return value;
									}
								},
								{
									text: 'Trans',
									dataIndex: 'A4420TRAS',
									width: 80,
									renderer: function (value, metaData, record) {
										if (record.get('__isNew')) {
											metaData.style = 'background-color: #d4edda; color: #155724; font-weight: bold;';
										}
										return value;
									}
								},
								{
									xtype: 'actioncolumn',
									width: 50,
									align: 'center',
									items: [{
										tooltip: 'Delete',
										getClass: function (v, metaData, record) {
											if (record.get('__isNew')) {
												metaData.style = 'background-color: #d4edda; color:green; font-size:16px; font-weight: bold;';
											} else {
												metaData.style = 'color:red; font-size:16px;';
											}
											return 'fa fa-trash';
										},
										handler: 'onDeleteRuleClick'
									}]
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
			ui: 'footer',
			defaults: {
				scale: 'medium'
			},
			layout: {
				type: 'hbox',
				pack: 'center'
			},
			style: 'background-color: #E3EAF9; padding: 5px;',
			items: [
				{
					text: 'Save',
					id: prototype.id02 + '-btn-save',
					iconCls: 'prx-icon-save',
					handler: 'onSaveClick',
					listeners: {
						click: function () {
							console.log('Click en Save button');
						}
					}
				},
				{
					text: 'Cancel',
					id: prototype.id02 + '-btn-close',
					iconCls: 'prx-icon-cancel',
					handler: 'onCloseClick',
					listeners: {
						click: function () {
							console.log('Click en Cancel button');
						}
					}
				}
			]
		}
	]
});