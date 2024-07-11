Ext.define('Ext.Praxis.controller.payments.ChargebackSabreStatus.SabreGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SabreGridController',
    init: function (view) {
    },
    afterRender: function (obj, e) {
        this.getData();
    },
    getData: function () {
        const view = this.view;
        const store = Ext.create('Ext.data.Store', {
            loadMask: true,
            pageSize: 20,
            proxy: {
                type: 'ajax',
                enablePaging: true,
                url: `${view.url}/loadChargebackSabreStatus`,
                extraParams: view.searchParams,
                timeout: 600000,
                reader: {
                    type: 'json',
                    rootProperty: 'response',
                    totalProperty: 'total'
                }
            },
            autoLoad: true,
            listeners: {
                load: function (store, records, successful, operation) {
                    if (!successful) {
                        global.Msg({msg: 'Data not Found'});
                    } else {
                        const responseData = JSON.parse(operation.getResponse().responseText);
                        if (records.length === 0) {
                            global.Msg({msg: 'Data not Found'});
                            return;
                        }
                        const btnAlert = Ext.getCmp(prototype.id + '-btnAlerts');
                        if (responseData.ou_ALERT !== 0) {
                            btnAlert.setText(`Alert! Total Refunds: ${responseData.ou_ALERT}`);
                            btnAlert.show();
                        } else {
                            btnAlert.hide();
                        }
                        //btnAlert.setPressed(false);
                    }
                }
            }
        });
        view.setStore(store);
    },
    searchPNR: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        //console.log(record.data.pnr);
        const url = this.view.url;
        const pnrWindow = Ext.create('Ext.Praxis.view.payments.ChargebackSabreStatusForm.DataEntrys.PNRDataEntry', {
            id: prototype.id + '-dataEntryPNR',
            searchParams: record.data,
            url: url
        });
        pnrWindow.show();
    },
    onViewTicket: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        if (record.data.ticket.trim() === '') {
            return;
        }
        const obj = record.data.ticket;
        prototypeProgram.view = 'payments-chargeback-sabre-status-form';
        prototypeProgram.nprog = 'PX00000635';
        prototypeProgram.title = 'Chargeback Sabre Status';
        prototypeProgram.modulo = '';

        var beanProMasterTicket = {};

        beanProMasterTicket.IN_CIA = obj.substr(0, 3);
        beanProMasterTicket.IN_FORMA = obj.substr(3, 4);
        beanProMasterTicket.IN_SERIE = obj.substr(7, 6);

        console.log(beanProMasterTicket);

        win.displayProMasterTicket(this, 'ViewFlightConciliation', beanProMasterTicket);
    },
    downloadExcel: function (btn) {
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
                            global.getFile(`${me.view.url}/downloadChargebackSabreStatus?${new URLSearchParams(params)}`);
                        }
                    }
                });
    },
    //<editor-fold defaultstate="collapsed" desc="Renders">
    renderUsosFirst: function (value, metaData, record, rowIndex, colIndex, store, view) {
        value = value.trim();
        let column = view.getHeaderAtIndex(colIndex);
        let dataIndex = column.dataIndex;
        let nroCupon = dataIndex[dataIndex.length - 1];
        let cpnIndex = nroCupon - 1;
        const cupon = record.data.indcpn.slice(cpnIndex, nroCupon);
        if (value !== '' && cupon !== 'V') {
            if (value === 'NOGO') {
                metaData.style = "background-color:#1BDE4A;font-weight:bolder;";
            } else {
                metaData.style = "background-color:#F34040;font-weight:bolder;";
            }
        }
        return value;
    },
    renderUsosLast: function (value, metaData, record, rowIndex, colIndex, store, view) {
        value = value.trim();
        let column = view.getHeaderAtIndex(colIndex);
        let dataIndex = column.dataIndex;
        let nroCupon = dataIndex[dataIndex.length - 1];
        let cpnIndex = nroCupon - 1;
        const cupon = record.data.indcpn.slice(cpnIndex, nroCupon);
        const usoFirst = record.get('usosbcp' + nroCupon).trim();
        if (value !== '' && cupon !== 'V') {
            if (value === 'RFND' && usoFirst === 'NOGO') {
                metaData.style = "background-color:#1BDE4A;font-weight:bolder;";
            } else {
                metaData.style = "background-color:#F34040;font-weight:bolder;";
            }
        }
        return value;
    }
    //</editor-fold>
});


