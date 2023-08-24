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
                        //console.log(records);
                        if (records.length === 0) {
                            global.Msg({msg: 'Data not Found'});
                        }
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
        if(record.data.ticket.trim()===''){
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
    downloadExcel:function(){
      alert('Function in Construction');  
    }
});


