Ext.define('Ext.Praxis.view.sales.CalendarLoadForm.Filters', {
	extend: 'Ext.form.Panel',
	alias: 'widget.' + prototype.id + '-filters',
	border: true,
	bodyStyle: 'background-color: #E3EAF9;',
	padding: '2px 0px 1px 0px',
	layout: 'column',
	items: [
		{
			xtype: 'panel',
			border: false,
			bodyStyle: 'background: transparent',
			height: 'auto',
			margin: '0 0 0 0',
			layout: {
				type: 'hbox',
				align: 'center'
			},
			items: [
				{
					xtype: 'form',
					border: false,
					id: prototype.id + '-panelFilters',
					bodyStyle: 'background: transparent',
					padding: '2px 5px 1px 5px',
					layout: 'vbox',
					defaults: {
						xtype: 'panel',
						border: false,
						bodyStyle: 'background: transparent',
						padding: '2px 5px 1px 5px',
						layout: 'hbox',
						defaults: {
							fieldStyle: 'text-align: center;',
							padding: '5px 1px 5px 1px',
							anchor: '100%',
							hiddenLabel: false,
							labelAlign: 'right',
							hidden: false
						}
					},
					items: [
						{
							items: [
								{
									xtype: 'combobox',
									id: prototype.id + '-comboTipo',
									fieldLabel: 'Process Type',
									name: 'P_TCOMI',
									labelWidth: 80,
									width: 200,
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
									xtype: 'combo',
									id: prototype.id + '-cmbDateToYear',
									name: 'P_ANIO',
									fieldLabel: 'Date',
									labelAlign: 'right',
									queryMode: 'local',
									triggerAction: 'all',
									editable: false,
									autoSelect: false,
									enableKeyEvents: true,
									caseSensitive: true,
									valueField: 'code',
									displayField: 'name',
									emptyText: 'All',
									labelWidth: 40,
									width: 130,
									anchor: '100%'
								},
								{
									xtype: 'combo',
									id: prototype.id + '-cmbDateToMonth',
									name: 'P_MES',
									labelAlign: 'right',
									queryMode: 'local',
									triggerAction: 'all',
									editable: false,
									autoSelect: false,
									enableKeyEvents: true,
									caseSensitive: true,
									valueField: 'code',
									displayField: 'name',
									emptyText: 'All',
									labelWidth: 0,
									width: 70,
									anchor: '100%'
								}
							]
						}
					]
				}
			]
		}
	]
});