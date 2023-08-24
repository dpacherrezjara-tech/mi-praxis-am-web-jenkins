Ext.define('Ext.Praxis.controller.payments.ChargebackSabreStatus.PNRDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PNRDataEntryController',
    init: function (view) {
    },
    afterRender: function (obj, e) {
        const view = this.view;
        this.fillData(view.searchParams);
        this.getData();
    },
    fillData:function(params){
        Ext.getCmp(prototype.idDE + '-txtPNR').setValue(params.pnr);
    },
    getData: function () {
        const view = this.view;
        const grid = Ext.getCmp(prototype.idDE + '-PNRGrid');
        let params = this.formatParameters();
        const store = Ext.create('Ext.data.Store', {
            loadMask: true,
            //pageSize: 20,
            proxy: {
                type: 'ajax',
                //enablePaging: true,
                url: `${view.url}/loadPNRInformation`,
                extraParams: params,
                timeout: 600000,
                reader: {
                    type: 'json',
                    rootProperty: 'response',
                    //totalProperty: 'total'
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
        grid.setStore(store);
    },
    formatParameters:function(){
        //const view = this.view;
        const filtersParams = Ext.getCmp(prototype.idDE + '-pnrDataEntryForm').getValues();
        let params = {
            IN_CCUST:'139',
                    ...filtersParams
        };
        console.log(params);
        return params;
    },
    onCancelClick:function(){
        this.view.close();
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
        this.view.close();
    }
});


