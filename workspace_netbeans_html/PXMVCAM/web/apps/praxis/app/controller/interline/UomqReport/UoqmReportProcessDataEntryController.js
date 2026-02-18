Ext.define('Ext.Praxis.controller.interline.UomqReport.UoqmReportProcessDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.UoqmReportProcessDataEntryController',
    notifier: new AWN(),
    afterRender: function () {
    },
    onProcessClick: function () {
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to Process?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            this.process();
                        }
                    }
                });
    },
    process: async function () {
        const me = this;
        const params = Ext.getCmp(prototype.idDE2 + '-processForm').getForm().getValues();

        const excelSchema = ['GRUPO'];

        if (params.IN_TIPO === 'E') {
            try {
                let excelFile = Ext.getCmp(prototype.idDE2 + '-excelFiles').fileInputEl.dom.files[0];
                global.readExcelFile(excelFile, async (json) => {
                    //valida si tiene el campo correcto
                    const isValid = json.every(obj => excelSchema.every(prop => obj.hasOwnProperty(prop)));
                    if (isValid) {
                        try {
                            const tmp = await global.loadRecordsOnTable('PRAXIS', 'XTEMPO', json);
                            params.IN_CUUID = tmp.cuuid;
                            params.IN_FUUID = tmp.fuuid;
                            await global.callStorePostAsync('PRAXIS','SQP06003',params);
                            me.notifier.info('Executed');
                            me.view.close();
                        } catch (e) {
                            me.notifier.alert('Error on load Excel');
                        }
                    } else {
                        me.notifier.alert('Invalid Format');
                    }
                });

            } catch (e) {
                me.notifier.alert('Error on read Excel');
            }
        } else {
            params.IN_CUUID = '';
            params.IN_FUUID = '';
            
            if(params.IN_GRUPOF ==='' && params.IN_GRUPOT===''){
                me.notifier.alert('Invalid Parameters');
                return;
            }
            
            try {
                await global.callStorePostAsync('PRAXIS','SQP06003',params);
                me.notifier.info('Executed');
                me.view.close();
            } catch (e) {
                me.notifier.alert('Error on Execute');
            }

            
        }
    },
    onChangeType: function (field, newValue, oldValue, eOpts) {
        const panelGr = Ext.getCmp(prototype.idDE2 + '-panelRangeGroups');
        const panelEx = Ext.getCmp(prototype.idDE2 + '-panelUploadExcel');
        if (newValue === 'E') {
            panelGr.hide();
            panelEx.show();
        } else {
            panelGr.show();
            panelEx.hide();
        }
    }
});
