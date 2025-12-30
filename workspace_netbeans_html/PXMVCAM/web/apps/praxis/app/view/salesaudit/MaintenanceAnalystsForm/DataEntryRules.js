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

	defaults: {
		border: false
	},
	listeners: {
		afterrender: 'afterRender'
	},

	items: [
		{
			xtype: 'form',
			id: prototype.id02 + '-form',
			defaults: {
				style: 'margin: 5px;',
				border: false
			},
			items: [

				{
					xtype: 'fieldset',
					title: 'New Rule',
					margin: 3,
					border: true,
					items: [
						{
							xtype: 'panel',
							layout: 'hbox',
							margin: '0 0 5 0',
							border: false,
							items: [
								{
									xtype: 'combo',
									id: prototype.id02 + '-cmbSource',
									fieldLabel: 'Source',
									// afterLabelTextTpl: '<b style="color: #BF6868;"> (*)</b>',
									queryMode: 'local',
									displayField: 'name',
									valueField: 'code',
									editable: false,
									forceSelection: true,
									allowBlank: false,
									labelWidth: 50,
									width: 130,
									listeners: {
										change: 'onSourceChange'
									}
								},
								{ xtype: 'tbspacer', width: 10 },
								{
									xtype: 'combo',
									id: prototype.id02 + '-cmbChannel',
									fieldLabel: 'Channel',
									labelWidth: 50,
									queryMode: 'local',
									displayField: 'name',
									valueField: 'code',
									editable: false,
									forceSelection: true,
									allowBlank: false,
									width: 140,
								},
								{ xtype: 'tbspacer', width: 10 },
								{
									xtype: 'combo',
									id: prototype.id02 + '-cmbTrans',
									fieldLabel: 'Transaction',
									labelWidth: 65,
									queryMode: 'local',
									displayField: 'name',
									valueField: 'code',
									editable: false,
									forceSelection: true,
									allowBlank: false,
									width: 150
								},
								{ xtype: 'tbspacer', width: 10 },
								{
									xtype: 'textfield',
									id: prototype.id02 + '-cmbFcmi',
									labelWidth: 50,
									name: 'A4420FCMI',
									fieldLabel: 'Fcmi',
									enforceMaxLength: true,
									maxLength: 10,
									labelWidth: 30,
									width: 150
									// flex: 1
								},

							]
						},
						{
							xtype: 'panel',
							layout: 'hbox',
							border: false,
							items: [
								{
									xtype: 'textfield',
									id: prototype.id02 + '-cmbQueq',
									name: 'A4420QUEQ',
									fieldLabel: 'Queq',
									// afterLabelTextTpl: '<b style="color: #BF6868;"> (*)</b>',
									enforceMaxLength: true,
									maxLength: 10,
									labelWidth: 40,
									width: 300,
									// flex: 2
								},
								{ xtype: 'tbspacer', width: 10 },
								{
									xtype: 'textfield',
									id: prototype.id02 + '-cmbIata',
									name: 'A4420IATA',
									fieldLabel: 'Iata',
									// afterLabelTextTpl: '<b style="color: #BF6868;"> (*)</b>',
									enforceMaxLength: true,
									maxLength: 10,
									labelWidth: 30,
									// flex: 1
									width: 300
								},

							]
						},
						{
							xtype: 'container',
							layout: {
								type: 'hbox',
								pack: 'end'
							},
							margin: '10 0 5 0',
							items: [
								{
									xtype: 'button',
									text: 'Add New Rule',
									scale: 'medium',
									iconCls: 'prx-icon-save',
									handler: 'onAddDetailClick'
								}
							]
						}

					]
				},


				{
					xtype: 'fieldset',
					title: 'All Rules',
					border: true,
					margin: 3,
					dockedItems: [
						{
							xtype: 'toolbar',
							dock: 'bottom',
							items: [
								{
									text: 'Add New Rule',
									iconCls: 'fa fa-plus',
									handler: 'onAddRulesClick'
								}
							]
						}
					],
					items: [
						{
							xtype: 'grid',
							id: prototype.id02 + '-gridDetails',
							height: 300,
							width: '100%',
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
									renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
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
									renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
										if (record.get('__isNew')) {
											metaData.style = 'background-color: #d4edda; color: #155724; font-weight: bold;';
										}
										return value;
									}
								},
								{
									text: 'Fcmi',
									dataIndex: 'A4420FCMI',
									width: 40,
									renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
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
									renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
										if (record.get('__isNew')) {
											metaData.style = 'background-color: #d4edda; color: #155724; font-weight: bold;';
										}
										return value;
									}
								},
								{
									text: 'IATA',
									dataIndex: 'A4420IATA',
									width: 150,
									renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
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
									renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
										if (record.get('__isNew')) {
											metaData.style = 'background-color: #d4edda; color: #155724; font-weight: bold;';
										}
										return value;
									}
								},
								{
									text: 'Trans',
									dataIndex: 'A4420TRAS',
									width: 100,
									renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
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
										handler: 'onDeleteDetailClick'
									}]
								}
							]
						}

					]
				},
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
					handler: 'onSaveClick'  // ← Funciona porque tiene controlador
				},
				// {
				// 	text: 'Update',
				// 	id: prototype.id02 + '-btn-update',
				// 	iconCls: 'prx-icon-update',
				// 	handler: 'onUpdateClick'  // ← Cambiado para diferenciarlo
				// },
				// {
				// 	text: 'Delete',
				// 	id: prototype.id02 + '-btn-delete',
				// 	iconCls: 'prx-icon-delete',
				// 	handler: 'onDeleClick'
				// },
				{
					text: 'Cancel',
					id: prototype.id02 + '-btn-close',
					iconCls: 'prx-icon-cancel',
					handler: 'onCloseClick'
				}
			]
		}
	]
});