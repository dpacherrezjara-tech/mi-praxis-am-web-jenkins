Ext.define('Ext.Praxis.controller.sales.CalendarLoadForm.CalendarLoadFormController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.CalendarLoadFormController',
	fecha: new Date(),
	init: function (view) {
	},
	afterRender: function () {
		console.log('after');

		var fecha = this.fecha;
		var year = fecha.getFullYear();
		var month = Ext.String.leftPad(fecha.getMonth() + 1, 2, '0');

		var cmbYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
		var cmbMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');

		var storeYear = win.getStoreYear(false);
		var storeMonth = win.getStoreMonth(true);

		cmbYear.bindStore(storeYear);
		cmbMonth.bindStore(storeMonth);

		// Esperar carga del store de AÑO
		storeYear.on('load', function () {
			cmbYear.setValue(year);
		}, this, { single: true });

		// Esperar carga del store de MES
		storeMonth.on('load', function () {
			cmbMonth.setValue(month);
		}, this, { single: true });
	},

	onClickFilterBtn: function (obj) {
		const panelFilter = Ext.getCmp(prototype.id + '-contentFilter');
		if (panelFilter.isVisible()) {
			panelFilter.hide();
		} else {
			panelFilter.show();
		}
	},
	onClickClearBtn: function (obj) {
		Ext.getCmp(prototype.id + '-panelFilters').getForm().reset();
	},


	onUploadClickBtn: function (params) {

		const dataEntry = Ext.create('Ext.Praxis.view.sales.CalendarLoadForm.DataEntrys.DataEntryCalendarLoadForm', {
			id: prototype.id + '-DataEntryCalendarLoadForm',
			searchParams: params,
			// callback: () => {
			// 	grid.getStore().load();
			// }
		});
		dataEntry.show();
	},

	onSearchClickBtn: function () {

		let cmbYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
		let cmbMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');

		let cmbType = Ext.getCmp(prototype.id + '-comboTipo');
		let year = cmbYear.getValue();
		let month = cmbMonth.getValue();
		let type = cmbType.getValue();

		// Validar ALL / vacío
		if (!year || !month) {
			Ext.Msg.alert(
				'Validation',
				'Please select a valid Year and Month.'
			);
			return;
		} else if (!type) {
			Ext.Msg.alert(
				'Validation',
				'Please select a valid Type.'
			);
			return;
		}



		this.searchData(year, month, type);

	},


	searchData: function () {

		const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
		mainPanel.removeAll();
		const filtro1 = Ext.getCmp(prototype.id + '-panelFilters');
		let params = filtro1.getForm().getValues();
		//        console.log('params',params)
		const newGrid = Ext.create('Ext.Praxis.view.sales.CalendarLoadForm.Grids.CalendarLoadGrid', {
			id: prototype.id + '-CalendarLoadFormGrid',
			searchParams: params
		});

		mainPanel.add(newGrid);


	},





});


