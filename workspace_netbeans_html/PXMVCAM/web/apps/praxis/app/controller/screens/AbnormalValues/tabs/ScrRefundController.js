Ext.define('Ext.Praxis.controller.screens.AbnormalValues.tabs.ScrRefundController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ScrRefundController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    columns2: {},
    bean: {},
    beanDet: {},
    meScrRefund: '',
    dw_excel: false,
    boxActual: '-boxMainDataScrRefund',
    drillDown: [],
    _path: '',
    // </editor-fold>
    init: function(view) {
        meScrRefund = this;
        console.log('ScrRefundController - initt');
//        meScrRefund.drillDown.push(meScrRefund.boxActual);
        console.log(meScrRefund.drillDown);
    },
    afterRender: function() {

        console.log('ScrRefundController - after');

    },
    btnSearch_click: function(bean) {
        console.log(' ScrRefundController - btnSearch_click');
        
        this.bean = bean;
        console.log(this.bean);
        meScrRefund.drillDown = [];
        console.log('**********************='+meScrRefund.drillDown);
        this.btnSearchSrcRefund_click();
    },
    btnSearchSrcRefund_click: function() {

        console.log(' ScrRefundController - btnSearchSrcRefund_click');

        this.setFormatParameter();
        win.lblUser_toolTip("Estructura: A2790");
        
        this.showGrid('-boxMainDataScrRefund');
        this.hidePagination_clickHandler();
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.screens.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = {beanString: meScrRefund.searchParams, dw_excel: false};
                },
                load: function(obj) {
                    console.log(obj.data);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
//                        me.setTotalRowGridData(bean);
                        Ext.getCmp(prototype.id + 'hdError1').setText(bean.dscError1);
                        Ext.getCmp(prototype.id + 'hdError2').setText(bean.dscError2);
                        Ext.getCmp(prototype.id + 'hdError3').setText(bean.dscError3);
                        Ext.getCmp(prototype.id + 'hdError4').setText(bean.dscError4);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataScrRefund').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataScrRefund').setStore(storeGridDatas);
        
//        Ext.Ajax.request({
//            url: prototype.url + '/search',
//            method: 'POST',
//            timeout: 60000000,
//            beforerequest: Ext.getBody().mask('Loading...'),
//            params: {beanString: this.searchParams, dw_excel: false},
//            success: function(response, options) {
//                Ext.getBody().unmask('Loading...');
//                console.log(response);
//
//                var res = Ext.JSON.decode(response.responseText);
//                console.log('if');
//                var lstData = res.lstData;
////                console.log(lstData);
//                var storeData = Ext.create('Ext.data.Store', {
//                    data: lstData,
//                    autoLoad: true
//                });
//                Ext.getCmp(prototype.id + '-gridDataScrRefund').bindStore(storeData);
//                Ext.getCmp(prototype.id + '-gridDataScrRefund').setStore(storeData);
//            }
//        });

//        meScrRefund.dw_excel = false;

    },
    setFormatParameter: function() {
//        meScrRefund.bean = {};
        var beanString = JSON.stringify(meScrRefund.bean);
        this.searchParams = beanString;
//        console.log(meScrRefund.bean);
    },
    GridByWeek_colHandler: function(param,column, e, row, column, x, rowData) {
        meScrRefund.beanDet = x.record.data;
        meScrRefund.beanDet.IN_CERROR = param;
        this.showGrid('-boxByWeek');
        this.showPagination_clickHandler();
        
        console.log(meScrRefund.beanDet);
        this.viewGridByWeek_colHandler();
    },
    viewGridByWeek_colHandler: function() {

        win.lblUser_toolTip("Estructura: A2789");
        var storeGridDatas = Ext.create('Ext.Praxis.store.screens.GridData', {
            proxy: {url: prototype.url + '/searchByWeek'
            },
            listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id +  meScrRefund.boxActual).mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(meScrRefund.beanDet),dw_excel:false};
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    Ext.getCmp(prototype.id + meScrRefund.boxActual).unmask();
                    win.lblUser_toolTip("Estructura: IMF110");

                    if (obj.data.length > 0) {
                        var Objtemp = obj.data.items[0].data;
                        var nomFecha='' ;
                        var strCERROR='' ;
                        
                        var pag = Ext.getCmp(prototype.id + '-pagginRefundCC');
                        var pagData = pag.getPageData();
//                        console.log(pagData);
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                        
                        if(meScrRefund.beanDet.IN_TIPOFECHA==='FPRDA'){
                            nomFecha= 'Processing Date';	
                        }else{
                            nomFecha= 'Accounting Date';		
                        }
                        if(Objtemp.IN_CERROR==='06'){
                            strCERROR= 'Refund < Sales';		
                        }else if(Objtemp.IN_CERROR==='08'){
                            strCERROR= 'Different Card';		
                        }else{
                            strCERROR=Objtemp.IN_CERROR;	
                        }
                        strCERROR=(Objtemp.IN_CERROR!=='')?'- Error Type : '+strCERROR:'';
                        Ext.getCmp(prototype.id + '-lblTit_Week').setText(nomFecha + ' : ' + Objtemp.strFormatDate1 + strCERROR);


                    } else {
                        global.Msg({msg: 'Data not found'});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataWeek').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-pagginRefundCC').bindStore(storeGridDatas);
        
        
//        Ext.Ajax.request({
//            url: prototype.url + '/searchByWeek',
//            method: 'POST',
//            timeout: 60000000,
//            beforerequest: Ext.getBody().mask('Loading...'),
//            params: {beanString: JSON.stringify(meScrRefund.beanDet), dw_excel: false},
//            success: function(response, options) {
//                Ext.getBody().unmask('Loading...');
//                console.log(response);
//                var nomFecha='' ;
//                var strCERROR='' ;
//                var res = Ext.JSON.decode(response.responseText);
//                if(meScrRefund.beanDet.IN_TIPOFECHA==='FPRDA'){
//                    nomFecha= 'Processing Date';	
//                }else{
//                    nomFecha= 'Accounting Date';		
//                }
//                var lstData = res.lstData;
//                console.log(lstData);
//                var  Objtemp= lstData[0];
//                if(Objtemp.IN_CERROR==='06'){
//                    strCERROR= 'Refund < Sales';		
//                }else if(Objtemp.IN_CERROR==='08'){
//                    strCERROR= 'Different Card';		
//                }else{
//                    strCERROR=Objtemp.IN_CERROR;	
//                }
//                strCERROR=(Objtemp.IN_CERROR!=='')?'- Error Type : '+strCERROR:'';
//                Ext.getCmp(prototype.id + '-lblTit_Week').setText(nomFecha + ' : ' + Objtemp.strFormatDate1 + strCERROR);
//
//                var storeData = Ext.create('Ext.data.Store', {
//                    data: lstData,
//                    autoLoad: true
//                });
//                Ext.getCmp(prototype.id + '-gridDataWeek').bindStore(storeData);
//                Ext.getCmp(prototype.id + '-gridDataWeek').setStore(storeData);
//                Ext.getCmp(prototype.id + '-gridDataWeek').getStore().reload();
//            }
//        });
    },
    showGrid: function(nameGrid) {

        me.panelActual = nameGrid;//PARA PAGINACION
        
        Ext.getCmp(prototype.id + meScrRefund.boxActual).hide();

        meScrRefund.boxActual = nameGrid;
        meScrRefund.drillDown.push(meScrRefund.boxActual);

        Ext.getCmp(prototype.id + meScrRefund.boxActual).show();

//        console.log('showGrid == ' + meScrRefund.drillDown);


    },
    imgBack_clickHandler: function() {
        
        if (meScrRefund.drillDown.length > 0) {
            Ext.getCmp(prototype.id + meScrRefund.boxActual).hide();
            
            
             
           if(meScrRefund.boxActual === '-boxMainDataScrRefund'){
                meScrRefund.hidePagination_clickHandler();
            }else if(meScrRefund.boxActual === '-boxByTkt'){
                meScrRefund.showPagination_clickHandler();
            }
            /*************/
            
            meScrRefund.drillDown.pop();
            meScrRefund.boxActual = meScrRefund.drillDown[meScrRefund.drillDown.length - 1];
            Ext.getCmp(prototype.id + meScrRefund.boxActual).show();
        }
//        console.log('imgBack_clickHandler == ' + meScrRefund.drillDown);

    },
    showPagination_clickHandler: function () {
        Ext.getCmp(prototype.id + '-boxPaginacion').show();
        Ext.getCmp(prototype.id + '-lblPagination').show();
    },
    hidePagination_clickHandler: function () {
        Ext.getCmp(prototype.id + '-boxPaginacion').hide();
        Ext.getCmp(prototype.id + '-lblPagination').hide();
    }
});