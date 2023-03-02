Ext.define('Ext.Praxis.controller.program.ProMasterTicket.DataEntryRFTXProMasterTicketController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryRFTXProMasterTicketController',
    //beanA2289: {},
    //beanA4168: {},
    beanA4373: {},
    actionCode: '',
    gridDataAC: new Array(),
    lstA2289FilterAC: new Array(),
    lstA4168FilterAC: new Array(),
    init: function () {
    },
    afterRender: function() {
        this.search(this.beanA4373);
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    
    initDate: function() {
        Ext.getCmp(prototype.id+'-2-cmbDateFromYear').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id+'-2-cmbDateToYear').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id+'-2-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id+'-2-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id+'-2-cmbDateFromDay').setValue('');
        Ext.getCmp(prototype.id+'-2-cmbDateToDay').setValue('');
    },
    cbxDateFromYear_changeHandler: function() {
        Ext.getCmp(prototype.id+'-2-cmbDateToYear').setValue(Ext.getCmp(prototype.id+'-2-cmbDateFromYear').getValue());
    },
    cbxDateFromMonth_changeHandler: function() {
        Ext.getCmp(prototype.id+'-2-cmbDateToMonth').setValue(Ext.getCmp(prototype.id+'-2-cmbDateFromMonth').getValue());
    },
    cbxDateFromDay_changeHandler: function() {
        Ext.getCmp(prototype.id+'-2-cmbDateToDay').setValue(Ext.getCmp(prototype.id+'-2-cmbDateFromDay').getValue());
    },
    // </editor-fold>
    
    btn_LogCompare: function () {
        if(Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue()!==''){
            Ext.getCmp(prototype.id+'-2-btn').enable(true);
	    this.beanA2289.IN_CIA = Ext.getCmp(prototype.id+'-2-txtTicketCia').getValue();
            this.beanA2289.IN_FORMA = (Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue().trim().length >= 4) ? Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue().substr(0, 4) : '';
            this.beanA2289.IN_SERIA = (Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue().trim().length >= 10) ? Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue().substr(4, 6) : '';
            this.searchCompleteDetail(this.beanA2289);
        }else{
            Ext.getCmp(prototype.id+'-2-btn').disable(true);
        }
    },
    
    //<editor-fold defaultstate="collapsed" desc="button">
    
    imgSearch_clickHandler: function () {
        this.execSearch();
	if(Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue()!==''){
            Ext.getCmp(prototype.id+'-2-btn').enable(true);
	    this.beanA2289.IN_CIA = Ext.getCmp(prototype.id+'-2-txtTicketCia').getValue();
            this.beanA2289.IN_FORMA = (Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue().trim().length >= 4) ? Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue().substr(0, 4) : '';
            this.beanA2289.IN_SERIA = (Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue().trim().length >= 10) ? Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue().substr(4, 6) : '';
            this.searchCompleteDetail(this.beanA2289);
        }else{
            Ext.getCmp(prototype.id+'-2-btn').disable(true);
        }
    },
    
    gridData_act1_clickHandler: function (column, e, row, column, x) {
        var data = x.record.data;
        console.log('gridData_act1_clickHandler');
        console.log(data);
        var me01 = this;
        
        
        //if(data.STAT === 'RFTX' || data.STAT === 'RFTX-VOID'){
            var rec = {
                data:{
                    A4373AIRLI: '139',
                    A4373CIA:data.A4373CIA,
                    DOCUMENTO:data.A4373FORMA + data.A4373SERIE,
                    A4373SEQ:data.A4373SEQ
                }
            };
            
            var recRFTX = {
                
                    A1530TCAMB: data.A1530TCAMB,
                    A1530MDA:data.A1530MDA,
                    A1530FUENT:data.A1530FUENT,
                    A1530PSVTA:data.A1530PSVTA,
                    A1530IDFIL:data.A1530IDFIL,
                    A1530GRUPO:data.A4373GRUPO
                
            };
            
            prototype.idRftx = 'SalesReportFormRftx';
            var viewRftx = Ext.create('Ext.Praxis.view.sales.SalesReportForm.DataEntryRftx', {
                id: prototype.idRftx + '-dataEntryRftx',
               params: {
                    rec: rec,
                    groupData: recRFTX,
                    exchrate: Ext.getCmp(prototype.id+'-lblExchangeLocalRate').value,
                    locCurr: Ext.getCmp(prototype.id+'-lblCurrency').value
                }
            });
            viewRftx.show();
	//}
	
    },
    //</editor-fold>
    /*
    execSearch: function () {
        this.beanA2289.IN_DATE_FROM = Ext.getCmp(prototype.id+'-2-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id+'-2-cmbDateFromMonth').getValue()+ Ext.getCmp(prototype.id+'-2-cmbDateFromDay').getValue();
        this.beanA2289.IN_DATE_TO = Ext.getCmp(prototype.id+'-2-cmbDateToYear').getValue() + Ext.getCmp(prototype.id+'-2-cmbDateToMonth').getValue()+ Ext.getCmp(prototype.id+'-2-cmbDateToDay').getValue();

        this.beanA2289.IN_CIA = Ext.getCmp(prototype.id+'-2-txtTicketCia').getValue();
        this.beanA2289.IN_FORMA = (Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue().trim().length >= 4) ? Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue().substr(0, 4) : '';
        this.beanA2289.IN_SERIA = (Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue().trim().length >= 10) ? Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue().substr(4, 6) : '';

        this.search(this.beanA2289);
    },*/
    
    //<editor-fold defaultstate="collapsed" desc="buttonNewLog">
        /*
    imgSearchNewLog_clickHandler: function () {
        this.execSearchNewLog();
	if(Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue()!==''){
            Ext.getCmp(prototype.id+'-2-btn').enable(true);
	    
        }else{
            Ext.getCmp(prototype.id+'-2-btn').disable(true);
        }
    },*/
    
    //</editor-fold>
        /*
    execSearchNewLog: function () {
        this.beanA4168.IN_DATE_FROM = Ext.getCmp(prototype.id+'-2-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id+'-2-cmbDateFromMonth').getValue()+ Ext.getCmp(prototype.id+'-2-cmbDateFromDay').getValue();
        this.beanA4168.IN_DATE_TO = Ext.getCmp(prototype.id+'-2-cmbDateToYear').getValue() + Ext.getCmp(prototype.id+'-2-cmbDateToMonth').getValue()+ Ext.getCmp(prototype.id+'-2-cmbDateToDay').getValue();

        this.beanA4168.IN_CIA = Ext.getCmp(prototype.id+'-2-txtTicketCia').getValue();
        this.beanA4168.IN_FORMA = (Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue().trim().length >= 4) ? Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue().substr(0, 4) : '';
        this.beanA4168.IN_SERIA = (Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue().trim().length >= 10) ? Ext.getCmp(prototype.id+'-2-txtTicketForSer').getValue().substr(4, 6) : '';

        this.searchNewLog(this.beanA4168);
    },*/
    
    //<editor-fold defaultstate="collapsed" desc="search">
    search: function (beanA4373) {
        var me01 = this;
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: CONTEXTPATH+'/BwrLog/searchRFTX'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanA4373)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    win.lblUser_toolTip("Estructura: A720");
                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res);
                    if (res.success) {
                        me01.gridDataAC = res.data;
                        if(me01.gridDataAC.length > 0) {
                            me01.beanA4373 = me01.gridDataAC[0];
                            Ext.getCmp(prototype.id+'-2-lblPagActual').setText(win.formatLngNumber(me01.beanA4373.page.PAGNUM));
                            Ext.getCmp(prototype.id+'-2-lblPagTotal').setText(win.formatLngNumber(me01.beanA4373.page.TOTPAG));
                            Ext.getCmp(prototype.id+'-2-lblRowsTotal').setText(win.formatLngNumber(me01.beanA4373.page.TOTROW));
                            Ext.getCmp(prototype.id+'-2-boxPaginacion').show();
                        } else {
                            global.Msg({msg: 'Data not found'});
                            Ext.getCmp(prototype.id+'-2-lblPagActual').setText('0');
                            Ext.getCmp(prototype.id+'-2-lblPagTotal').setText('0');
                            Ext.getCmp(prototype.id+'-2-lblRowsTotal').setText('0');
                            Ext.getCmp(prototype.id+'-2-boxPaginacion').hide();
                        }
                    } else {
                        global.Msg({msg: res.sesion});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-2-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-2-paggin').bindStore(storeGridDatas);
                 
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchCompleteDetail">
    /*
    searchCompleteDetail: function (beanA2289) {
        var me02 = this;
        Ext.Ajax.request({
            url: CONTEXTPATH+'/BwrLog/searchCompleteDetail',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(beanA2289)},
            beforerequest: Ext.getCmp('DataEntryRFTXProMasterTicketForm').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp('DataEntryRFTXProMasterTicketForm').unmask();
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    me02.lstA2289FilterAC = res.listaCompleteDetail;
                    if(me02.lstA2289FilterAC.length > 0) {
                        me02.bean = me02.lstA2289FilterAC[0];
                        console.log(me02.beanA2289.AVFOP!== me02.bean.A1531VFOP);                        
                    } else {
                        global.Msg({msg: 'Data not found'});
                    }
                } else global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                Ext.getCmp('DataEntryRFTXProMasterTicketForm').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },*/
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="searchNewLog">
    
    searchNewLog: function (beanA4168) {
        var me01 = this;
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: CONTEXTPATH + '/BwrLog/searchNewLog'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanA4168)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    win.lblUser_toolTip("Estructura: A720");
                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res);
                    if (res.success) {
                        me01.gridDataAC = res.data;
                        if (me01.gridDataAC.length > 0) {
                            me01.beanA4168 = me01.gridDataAC[0];
                            Ext.getCmp(prototype.id + '-2-lblPagActual').setText(win.formatLngNumber(me01.beanA4168.page.PAGNUM));
                            Ext.getCmp(prototype.id + '-2-lblPagTotal').setText(win.formatLngNumber(me01.beanA4168.page.TOTPAG));
                            Ext.getCmp(prototype.id + '-2-lblRowsTotal').setText(win.formatLngNumber(me01.beanA4168.page.TOTROW));
                            Ext.getCmp(prototype.id + '-2-boxPaginacion').show();
                            Ext.getCmp(prototype.id + '-2-columnFOP').setText('FOP Reconciliation');
                        } else {
                            global.Msg({msg: 'Data not found'});
                            Ext.getCmp(prototype.id + '-2-lblPagActual').setText('0');
                            Ext.getCmp(prototype.id + '-2-lblPagTotal').setText('0');
                            Ext.getCmp(prototype.id + '-2-lblRowsTotal').setText('0');
                            Ext.getCmp(prototype.id + '-2-boxPaginacion').hide();
                        }
                    } else {
                        global.Msg({msg: res.sesion});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-2-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-2-paggin').bindStore(storeGridDatas);     
    },
    //</editor-fold>

    pagFirst: function(obj, e) {
        Ext.getCmp(prototype.id+'-2-paggin').moveFirst();
    },
    pagPrevious: function(obj, e) {
        Ext.getCmp(prototype.id+'-2-paggin').movePrevious();
    },
    pagNext: function(obj, e) {
        Ext.getCmp(prototype.id+'-2-paggin').moveNext();
    },
    pagLast: function(obj, e) {
        Ext.getCmp(prototype.id+'-2-paggin').moveLast();
    },
    
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }
    }
});