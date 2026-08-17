Ext.define('Ext.Praxis.controller.payments.SalesComplement.PnrDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PnrDataEntryController',
    init: function (view) {
        prototype.id = 'SalesComplementForm';
        prototype.url = CONTEXTPATH + '/SalesComplement';
    },
    afterRender: function () {
        let me = this;
        const {pnr} = me.view.params;
        //console.log(pnr);
        const txtPNR = Ext.getCmp(prototype.id + '-1-txtPNR');
        txtPNR.setValue(pnr);
        let params = {
            IN_TEXT: pnr,
            IN_TFILTER: '3'
        };
        me.searchPNR(params);

    },
    searchPNR: function (parameters) {
        const me = this;
        let pnrStore = Ext.create('Ext.data.Store', {
            storeId: prototype.id + `-plusgrade-store`,
            loadMask: true,
            proxy: {
                type: 'ajax',
                enablePaging: true,
                url: prototype.url + '/searchPNR',
                extraParams: parameters,
                timeout: 600000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            autoLoad: true,
            listeners: {
                load: function (store, records, successful, operation) {
                    if (!successful) {
                        global.Msg({msg: 'Data not Found'});
                    } else {
                        if (records.length === 0) {
                            global.Msg({msg: 'Data not Found'});
                            me.view.close();
                        }
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-1-gridDataPNR').bindStore(pnrStore);
        Ext.getCmp(prototype.id + '-1-pagginPNR').bindStore(pnrStore);
    },
    onClickSearchTicketDE: function (grid, html, rowIndex, colIndex, obj) {
        // console.log(obj);
        let data = obj.record.data;
        let strTkt = data.TICKET;
        if (!strTkt){
            return;
        }
        prototypeProgram.view = 'payments-sales-complement-form';
        prototypeProgram.nprog = 'PX00000627'
        prototypeProgram.title = 'Sales Complement';
        prototypeProgram.modulo = '';

        let beanProMasterTicket = {};

        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(7, 6);
        beanProMasterTicket.IN_SEQ = win.stringPad(data.A720SEQ, '0', 2);

        console.log(beanProMasterTicket);

        win.displayProMasterTicket(this, 'ViewFlightConciliation', beanProMasterTicket);
//        Ext.getCmp(prototype.id + '-dataEntry').hide();
        this.view.close();
    },
    onCancelClick:function(obj){
        this.view.close();
    }
});