Ext.define('Ext.Praxis.controller.payments.ReconciliationPayment.DataGridMsiTrackingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataGridMsiTrackingController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meGrid: '',
    bean: {},
    beanMsi: {},
    paramsMsiTracking: {},
    AREFNBR_1: '',
    TDOC_1: '',
    AREFNBR_2: '',
    TDOC_2: '',
    init: function (view) {
        prototype.id = 'ReconciliationPaymentForm';
        prototype.url = CONTEXTPATH + '/ReconciliationPayment';
        meGrid = this;
        this.p = this.view.params;
        this.bean = this.p.rec;
    },
    afterRender: function () {
        this.getData();
    },
    getData: function () {
        meGrid.paramsMsiTracking.beanString = JSON.stringify(this.bean);

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchMsiTracking'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-gridMsiTracking').mask('Loading...');
                    obj.proxy.extraParams = meGrid.paramsMsiTracking;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-gridMsiTracking').unmask();

                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridMsiTracking').bindStore(storeGridDatas);
    },
    onMsiUpdateClick: function (btn) {
        var beanMsiTemp = {};

        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to update?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            meGrid.llenarData(beanMsiTemp);
                        }
                    }
                });
    },
    llenarData: function (beanMsiTemp) {
//        beanMsiTemp.lstSendManual = [];
//        var store_gridMsi = Ext.getCmp(prototype.id + '-gridMsiTracking').getStore();
//
//        for (var i = 0; i < store_gridMsi.data.length; i++) {
//            beanMsiTemp.lstSendManual.push(store_gridMsi.data.items[i].data);
//        }
//        
//        console.log(beanMsiTemp);
//        this.MaintenanceMsi(beanMsiTemp);
        beanMsiTemp.AREFNBR_1 = this.AREFNBR_1;
        beanMsiTemp.AREFNBR_2 = this.AREFNBR_2;

        this.MaintenanceMsi(beanMsiTemp);
    },
    MaintenanceMsi: function (beanMsiTemp) {
//        console.log(beanMsiTemp);
        var beanString = JSON.stringify(beanMsiTemp);
//        console.log(beanString);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceMsi',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: beanString},
            beforerequest: Ext.getCmp(prototype.id + '-gridMsiTracking').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-gridMsiTracking').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);

                if (res.success) {
                    //global.Msg({msg: res.msjOption});
                    global.Msg({msg: 'Successfully updated'});
                    Ext.getCmp(prototype.id + '-gridMsiTracking').unmask();
                    Ext.getCmp(prototype.id + '-msiTrackingGrid').close();
                } else {
                    global.Msg({msg: res.msjOption});
                    //global.Msg({msg: 'Failed to Update Transaction'});
                }

            }
        });
    },
    onMsiCancelClick: function(){
        Ext.getCmp(prototype.id + '-msiTrackingGrid').close();
    },
    checkPP: function (rowIndex, metaData, value, record, colIndex, store, view) {
        if (value) {
            if (this.AREFNBR_1 === '') {
                this.AREFNBR_1 = record.data.AREFNBR;
                this.TDOC_1 = record.data.TDOC;
            } else if (this.AREFNBR_2 === '') {
                this.AREFNBR_2 = record.data.AREFNBR;
                this.TDOC_2 = record.data.TDOC;
            }
        } else {
            if (this.AREFNBR_1 === record.data.AREFNBR) {
                this.AREFNBR_1 = '';
                this.TDOC_1 = '';
            } else if (this.AREFNBR_2 === record.data.AREFNBR) {
                this.AREFNBR_2 = '';
                this.TDOC_2 = '';
            }
        }
    },
    onMsiManualUpdateClick: function () {
        var status_match = ['1', '5', '6', '7'];

        var cond1 = false; //Debe haber un registro "match" del tipo Sales y con cuotas
        var cond2 = false; //Debe haber un registro pendiente (No match) del tipo Sales y sin cuotas
        var cond3 = false; //Debe haber un registro pendiente (No match) del tipo Refund y sin cuotas
        var cond4 = false; //la grilla debe tener 3 registros

        var AREFNBR1 = "";
        var TDOC1 = "";
        var AREFNBR2 = "";
        var TDOC2 = "";
        var AREFNBR3 = "";
        var TDOC3 = "";
        
        var beanMsiTemp = {};

        var gridMsiTracking = Ext.getCmp(prototype.id + '-gridMsiTracking').getStore();

        if (gridMsiTracking.data.length == 3) {
            cond4 = true;

            for (var i = 0; i < gridMsiTracking.data.length; i++) {
                if (gridMsiTracking.data.items[i].data.NBRINSTA > 0 && gridMsiTracking.data.items[i].data.STVAL === "1" && gridMsiTracking.data.items[i].data.TDOC === "S") {
                    AREFNBR1 = gridMsiTracking.data.items[i].data.AREFNBR;
                    TDOC1 = gridMsiTracking.data.items[i].data.TDOC;
                    cond1 = true;
                    break;
                }
            }

            for (var i = 0; i < gridMsiTracking.data.length; i++) {
                if (gridMsiTracking.data.items[i].data.NBRINSTA == 0 && status_match.indexOf(gridMsiTracking.data.items[i].data.STVAL) == -1 && gridMsiTracking.data.items[i].data.TDOC === "S") {
                    AREFNBR2 = gridMsiTracking.data.items[i].data.AREFNBR;
                    TDOC2 = gridMsiTracking.data.items[i].data.TDOC;
                    cond2 = true;
                    break;
                }
            }

            for (var i = 0; i < gridMsiTracking.data.length; i++) {
                if (gridMsiTracking.data.items[i].data.NBRINSTA == 0 && status_match.indexOf(gridMsiTracking.data.items[i].data.STVAL) == -1 && gridMsiTracking.data.items[i].data.TDOC === "R") {
                    AREFNBR3 = gridMsiTracking.data.items[i].data.AREFNBR;
                    TDOC3 = gridMsiTracking.data.items[i].data.TDOC;
                    cond3 = true;
                    break;
                }
            }
        }

        if (cond1 && cond2 && cond3 && cond4) {
            beanMsiTemp.AREFNBR1 = AREFNBR1;
            beanMsiTemp.TDOC1 = TDOC1;
            
            beanMsiTemp.AREFNBR2 = AREFNBR2;
            beanMsiTemp.TDOC2 = TDOC2;
            
            beanMsiTemp.AREFNBR3 = AREFNBR3;
            beanMsiTemp.TDOC3 = TDOC3;
            
            this.MaintenanceManualMsi(beanMsiTemp);
            
            //global.Msg({msg: "Done!"});
        } else {
            global.Msg({msg: "Does not match the MSI condition!"});
        }
    },
    MaintenanceManualMsi: function (beanMsiTemp) {
//        console.log(beanMsiTemp);
        var beanString = JSON.stringify(beanMsiTemp);
//        console.log(beanString);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceManualMsi',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: beanString},
            beforerequest: Ext.getCmp(prototype.id + '-gridMsiTracking').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-gridMsiTracking').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);

                if (res.success) {
                    //global.Msg({msg: res.msjOption});
                    global.Msg({msg: 'Successfully updated'});
                    Ext.getCmp(prototype.id + '-gridMsiTracking').unmask();
                    Ext.getCmp(prototype.id + '-msiTrackingGrid').close();
                } else {
                    global.Msg({msg: res.msjOption});
                    //global.Msg({msg: 'Failed to Update Transaction'});
                }

            }
        });
    },
});