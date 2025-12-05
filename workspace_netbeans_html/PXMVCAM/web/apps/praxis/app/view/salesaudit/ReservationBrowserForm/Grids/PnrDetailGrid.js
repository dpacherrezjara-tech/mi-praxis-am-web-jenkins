Ext.define('Ext.Praxis.view.salesaudit.ReservationBrowserForm.Grids.PnrDetailGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.' + prototype.id + '-PnrDetailGrid',
	requires: [
		'Ext.Praxis.controller.salesaudit.ReservationBrowser.PnrDetailGridController'
	],
	controller: 'PnrDetailGridController',
	maxHeight: prototype.height,
	minHeight: 200,
	height: 'auto',
	width: 1252,
	viewConfig: {
		stripeRows: true,
		enableTextSelection: true,
		markDirty: false
	},
	columnLines: true,
	columns: {
		defaults: {
			align: 'center',
			menuDisabled: true,
			sortable: true
		},
		items: [
			{ text: 'ID', dataIndex: 'ID', width: 50, align: 'center' },
			{ text: 'Processing<br>Date', dataIndex: 'PRDA', width: 100, align: 'center' },
			{ text: 'PNR', dataIndex: 'PNR', width: 100, align: 'center' },
			{ text: 'PNR Sabre', dataIndex: 'PNRAA', width: 100, align: 'center' },
			{ text: 'Source', dataIndex: 'FUENTE', width: 100, align: 'center' },
			{ text: 'Sabre Code', dataIndex: 'SRCODE', width: 100, align: 'center' },
			{ text: 'Process', dataIndex: 'SRTYPE', width: 100, align: 'center' },
			{ text: 'Sequence', dataIndex: 'RPH', width: 100, align: 'center' },
			{ text: 'Type', dataIndex: 'TYPE', width: 100, align: 'center' },
			{ text: 'Description', dataIndex: 'DESCRIP', width: 398 }
		]
	},
	tbar: {
		layout: {
			pack: 'end'
		},
		defaults: {
			scale: 'medium'
		},
		items: [
			{
				xtype: 'button',
				iconCls: 'prx-icon-excel',
				scale: 'small',
				tooltip: 'Export to Excel',
				listeners: {
					click: 'downloadExcel'
				}
			},
			{
				xtype: 'button',
				hidden: true,
				id: prototype.id + '-backButton-1',
				scale: 'small',
				iconCls: 'prx-icon-back',
				width: 25,
				tooltip: 'Back',
				listeners: {
					click: 'onClickBackButton'
				}
			}
		]
	},
	bbar: {
		xtype: 'pagingtoolbar',
		displayInfo: true
	}
});


