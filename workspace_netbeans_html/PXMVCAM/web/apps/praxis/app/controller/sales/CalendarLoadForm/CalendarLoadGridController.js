Ext.define('Ext.Praxis.controller.sales.CalendarLoadForm.CalendarLoadGridController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.CalendarLoadGridController',
	afterRender: async function (obj, e) {
		const me = this;
		me.view.setLoading(true);
		await me.getData(me.view);
		me.view.setLoading(false);
	},
	getData: async function (view) {
		console.log('view', view.searchParams);

		let response = await global.callStoreGet(
			'PRAXIS',
			'SQP05897',
			view.searchParams
		);

		console.log('response', response);

		let data = response?.lstRs?.[0] || [];

		console.log('data', data);

		if (data.length === 0) {
			global.Msg({ msg: 'Data not Found' });
			return;
		}

		this.view.getStore().loadData(data);
	},


	downloadExcelCalendarLoad: function (btn) {
		const me = this;
		let params = Object.assign({}, me.view.searchParams);
		params.excel = true;
		console.log(params);
		Ext.Msg.show(
			{
				title: '.:PRAXIS:.',
				msg: 'Download Excel?',
				buttons: Ext.MessageBox.YESNO,
				scope: this,
				animateTarget: btn,
				icon: Ext.MessageBox.QUESTION,
				modal: true,
				fn: function (btn) {
					if (btn === 'yes') {
						me.onDownloadExcel();
					}
				}
			});
	},
	onDownloadExcel: async function () {
		const me = this;
		const view = me.view;

		view.setLoading(true);
		try {
			let res = await global.callStoreGet('PRAXIS', 'SQP05897', view.searchParams);
			let data = res.lstRs.at(0);

			if (data.length === 0) {
				global.Msg({ msg: 'Data not Found' });
				view.setLoading(false);
				return;
			}

			const months = {
				'01': 'January',
				'02': 'February',
				'03': 'March',
				'04': 'April',
				'05': 'May',
				'06': 'June',
				'07': 'July',
				'08': 'August',
				'09': 'September',
				'10': 'October',
				'11': 'November',
				'12': 'December'
			};

			let excel = data.map(x => ({
				'Year': x.A1837ANIO,
				'Month': months[x.A1837MES] || x.A1837MES,
				'Type': x.A1837TCOMI,
				'Execution Date': x.A1837FEJEC,
				'Period Start Date': x.A1837FFINP,
				'Period End Date': x.A1837FINIP,
				'Record Date': x.A1837FREGI,
				'Record Time': x.A1837HREGI
			}));

			await global.writeExcelFromJson(excel, 'Calendar Load Information');
			view.setLoading(false);

		} catch (e) {
			console.log(e);
			view.setLoading(false);

		}
	},

});


