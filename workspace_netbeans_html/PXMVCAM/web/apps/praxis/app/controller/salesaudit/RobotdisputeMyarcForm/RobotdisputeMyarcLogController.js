Ext.define('Ext.Praxis.controller.salesaudit.RobotdisputeMyarcForm.RobotdisputeMyarcLogController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RobotdisputeMyarcLogController',
    afterRender: function () {
        this.loadForm();
    },
    loadForm: async function () {
        const me = this;
        const gridLog = Ext.getCmp(prototype.idDE3 + '-gridRobotdisputeMyarcLog');

        try {
            gridLog.setLoading(true);

            let params = {
                IN_CCUST: '139',
                IN_OPTION: '2',
                IN_DATEFROM: me.view.obj.A4139NMEMO,
                IN_DATETO: '',
                IN_STATUS: '',
                IN_ROBOT: '3',
                IN_AREA: '',
                IN_USER: '2'
            };

            const res = await global.callStoreGet('PXSAUDIT', 'SQP04293', params);

            if (res.lstRs.length > 0) {

                let storeLog = new Ext.data.Store({
                    data: res.lstRs.at(0)
                });

                gridLog.setStore(storeLog);

            }
        } catch (e) {
            console.error(e);
        } finally {
            gridLog.setLoading(false);
        }

    },
    downloadexcelMainLog: async function () {
        const me = this;
        let notifier = new AWN();
        let params = {
            IN_CCUST: '139',
            IN_OPTION: '2',
            IN_DATEFROM: me.view.obj.A4139NMEMO,
            IN_DATETO: '',
            IN_STATUS: '',
            IN_ROBOT: '3',
            IN_AREA: '',
            IN_USER: '2'
        };
        const dwl = async () => {
            const res = await global.callStorePagginExcel('PXSAUDIT', 'SQP04293', params);
            if (res) {
                let data = res.map(x => ({
                        'RN': x.RN,
                        'Memo Number': x.A4137NMEMO,
                        'Area': x.A4137AREA,
                        'Origin': x.A4137ORIGEN,
                        'Process': x.A4137BASE,
                        'Status': x.A4137FLAG,
                        'System Date': x.A4137FREGI,
                        'Hour': x.A4137HREGI
                    }));
                global.writeExcelFromJson(data, 'Sent Debit History');
            }
        };
        notifier.async(dwl(), 'Successfully Download', 'Error on Download', 'Downloading File');
    }
});
