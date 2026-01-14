Ext.define('Ext.Praxis.controller.sales.CalendarLoadForm.DataEntryCalendarLoadFormController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.DataEntryCalendarLoadFormController',
	url: CONTEXTPATH + '/DataEntryCalendarLoadForm',

	init: function (view) {
	},

	OnBeforeShow: function () {
		prototype.user = CONTEXTPATH + '/BwrBSPLINKRFND';

	},
	afterRender: function (obj, e) {
		console.log('afeter data entry')
		let me = this;
		me.setUser();
	},


	setUser: function () {
		let me = this;
		Ext.Ajax.request({
			url: prototype.user + '/getUser',
			timeout: 60000000,
			method: 'POST',
			//params: this.beanTMP,
			success: function (response, options) {
				let res = Ext.JSON.decode(response.responseText);
				me.user = res.user.USR;
				console.log('userrr', me.user)
				// Ext.getCmp(prototype.id + '-txtUser').setValue(Ext.String.trim(res.user.USR));  //;
				// me.onSearchClick();

			}
		});
	},

	onbtnClick_upload_file: function () {
		let notifier = new AWN();
		const field = Ext.getCmp(prototype.idDE + '-file');
		const comboTipo = Ext.getCmp(prototype.idDE + '-comboTipo');

		const file = field.fileInputEl.dom.files[0];
		const tipoSeleccionado = comboTipo.getValue();

		if (!tipoSeleccionado) {
			notifier.alert('Please select the process type (FOB, CONSORTIA)');
			return;
		}

		if (file) {
			let onOk = async () => {
				let loadingAlert = null;
				try {
					loadingAlert = notifier.info('Loading file...', {
						durations: { info: 0 }
					});

					const resultado = await this.readExcel(file, tipoSeleccionado);

					if (loadingAlert && loadingAlert.remove) {
						loadingAlert.remove();
					}

					if (resultado.success) {
						notifier.success(
							`Process completed successfully! ${resultado.registrosProcesados} record(s) processed.`
						);
					} else if (resultado.registrosConError > 0) {
						notifier.warning(
							`Process completed with ${resultado.registrosConError} error(s). Please review the details.`
						);
					}

				} catch (error) {
					if (loadingAlert && loadingAlert.remove) {
						loadingAlert.remove();
					}
					notifier.alert('Error processing file: ' + error.message);
				}
			};
			notifier.confirm('Load file?', onOk, true);
		} else {
			notifier.alert('Please select a file');
		}
	},

	readExcel: async function (file, tipoCombo) {
		const me = this;

		return new Promise((resolve, reject) => {
			global.readExcelFile(file, async function (data) {

				const panelErrores = Ext.getCmp(prototype.idDE + '-PanelErrores');
				const campoErrores = Ext.getCmp(prototype.idDE + '-Errores');
				const gridError = Ext.getCmp(prototype.idDE + '-gridErrors');
				const panelText = Ext.getCmp(prototype.idDE + '-Text');
				const dataEntryPanel = Ext.getCmp(prototype.idDE + '-DataEntry-center');

				campoErrores?.setValue('');
				panelErrores?.hide();
				gridError?.hide();
				panelText?.hide();

				const fileLayout = [
					'Año',
					'Mes',
					'Fecha ejecución',
					'Fecha Inicio Periodo',
					'Fecha Fin Periodo'
				];

				let layoutErrors = 0;

				data.forEach(row => {
					const keys = Object.keys(row);
					if (!fileLayout.every(col => keys.includes(col))) {
						layoutErrors++;
					}
				});

				if (layoutErrors > 0) {
					const error = 'Invalid layout. Total errors: ' + layoutErrors;
					reject(new Error(error));
					return;
				}
				let registrosProcesados = 0;
				let registrosConError = 0;
				let erroresDetalle = [];
				let mensajesError = [];

				if (dataEntryPanel) {
					dataEntryPanel.setLoading({
						msg: 'Processing records...'
					});
				}

				try {
					for (let i = 0; i < data.length; i++) {
						const fila = data[i];

						// console.log('user', me.user);

						const usuario = document.getElementById('menuUser').innerText;
						try {
							let params = {
								P_TIPO: tipoCombo,
								P_ANIO: fila.Año || fila.ANIO || '',
								P_MES: fila.Mes || fila.MES || '',
								P_FECHA_EJECUCION: fila['Fecha ejecución'] || '',
								P_PERIODO_INICIO: fila['Fecha Inicio Periodo'] || '',
								P_PERIODO_FIN: fila['Fecha Fin Periodo'] || '',
								P_USUARIO: usuario || 'JYAURI' || 'FBACA',
								P_FILA_EXCEL: i + 1,
								IN_FILA_DATA: JSON.stringify(fila)
							};

							const res = await global.callStorePost('PRAXIS', 'SQP05896', params);

							const success = res?.data?.lstVals?.STATUS === '1';
							const mensaje = res?.data?.lstVals?.P_MENSAJE || 'Unknown error';

							if (!success) {
								registrosConError++;
								mensajesError.push(`${mensaje}`);

								erroresDetalle.push({
									fila: i + 1,
									mensaje,
									datos: fila
								});
							} else {
								registrosProcesados++;
							}

						} catch (err) {
							registrosConError++;

							const msg = err.message || err;

							mensajesError.push(`ERROR - ${msg}`);

							erroresDetalle.push({
								fila: i + 1,
								mensaje: msg,
								datos: fila
							});
						}
					}

					dataEntryPanel?.setLoading(false);

					if (registrosConError > 0) {

						campoErrores?.setValue(mensajesError.join('\n'));
						panelErrores?.show();
						panelErrores?.setHeight(350); // Ajustar altura

						if (gridError && erroresDetalle.length > 0) {
							gridError.setStore(
								Ext.create('Ext.data.Store', {
									fields: ['fila', 'mensaje', 'datos'],
									data: erroresDetalle
								})
							);
							gridError.show();
						}

						panelText?.update(`
                    <div style="
                        font-family: monospace;
                        font-size: 12px;
                        color: #8B0000;
                    ">
                        ${registrosConError} record(s) with errors found.
                        Please review the details.
                    </div>
                `);
						panelText?.show();
					}
					console.log('=== SUMMARY ===');
					console.log('Total:', data.length);
					console.log('OK:', registrosProcesados);
					console.log('Errors:', registrosConError);

					resolve({
						success: registrosConError === 0,
						registrosProcesados,
						registrosConError,
						erroresDetalle
					});

				} catch (error) {
					dataEntryPanel?.setLoading(false);
					reject(error);
				}
			});
		});
	},

	onCancelClick01: function () {
		this.view.close();
	}
});


