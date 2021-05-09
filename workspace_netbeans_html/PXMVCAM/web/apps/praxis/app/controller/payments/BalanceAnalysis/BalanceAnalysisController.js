/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.BalanceAnalysis.BalanceAnalysisController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BalanceAnalysisController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    gridActual: '',
    panelActual: '',
    fileName: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    dataObtain: {},
    init: function(view) {
        me = this;
        prototype.id = 'BalanceAnalysisForm';
        prototype.url = CONTEXTPATH + '/BalanceAnalysis';
//        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
//        me.panelActual = '-panelGridData';
//        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.obtainData();

        this.control({
//            //   -------------------Eventos Genericos --------------------
//            '#BalanceAnalysisForm-xpanel': {
//                afterrender: this.xpanel_afterrender            
//            },
            '#BalanceAnalysisForm-btnSearch': {
                click: this.btnSearch_click
            },
//            '#BalanceAnalysisForm-btnClear': {
//                click: this.btnClear_click
//            },
//            '#BalanceAnalysisForm-btnExcel': {
//                click: this.btnExcel_click
//            },
            '#BalanceAnalysisForm-btnFilter': {
                click: this.btnFilter_click
            },
//            '#BalanceAnalysisForm-btnAdd': {
//                click: this.btnAdd_click
//            },
//            '#BalanceAnalysisForm-btnBack': {
//                click: this.btnBack_click
//            },
//            '#BalanceAnalysisForm-btn-pag-first': {
//                click: this.pagFirst
//            },
//            '#BalanceAnalysisForm-btn-pag-previous': {
//                click: this.pagPrevious
//            },
//            '#BalanceAnalysisForm-btn-pag-next': {
//                click: this.pagNext
//            },
//            '#BalanceAnalysisForm-btn-pag-last': {
//                click: this.pagLast
//            }
//            //-----------------Eventos Especificos -------------------    
//
//
        });
    },
    
    eventKey: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
//    onChangeCmbType: function(obj, value) {
//
//        Ext.getCmp(prototype.id + '-panelFilter1').hide();
//        Ext.getCmp(prototype.id + '-panelFilter2').hide();
//        Ext.getCmp(prototype.id + '-panelFilter3').hide();
//        Ext.getCmp(prototype.id + '-panelFilter4').hide();
//        Ext.getCmp(prototype.id + '-panelFilter5').hide();
//        Ext.getCmp(prototype.id + '-panelFilter6').hide();
//        Ext.getCmp(prototype.id + '-panelFilter7').hide();
//        Ext.getCmp(prototype.id + '-panelFilter8').hide();
//
//        if (value !== '') {
//            Ext.getCmp(prototype.id + '-panelFilter' + value).show();
//        }
//
//    },

    obtainData: function() {
        
        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);
        var storeComboDataDay = win.getStoreDays(true);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);
        
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');
        
        
        
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);
        
         Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');
        
        
        var cmbFTE = Ext.getCmp(prototype.id + '-cmbFTE');
        cmbFTE.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["B", "BSP"],
                ["A", "ARC"],
                ["S", "ASR"],
                ["T", "TCN"]
                
            ]
        }));
        cmbFTE.setValue("");
        
        
        this.dataObtain.COUNTRY = 2;
        this.dataObtain.CARD = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(this.dataObtain)},
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    me.lstCountry = res.lstCountry;
                    Ext.getCmp(prototype.id + '-cmbCountry').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCountry, autoLoad: true})
                            );
                    Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
                    
                    Ext.getCmp(prototype.id + '-cmbCARDC').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCard, autoLoad: true})
                            );
                    Ext.getCmp(prototype.id + '-cmbCARDC').setValue('');
//                    me.btnSearch_click();
                    
                } else
                    global.Msg({msg: res.sesion});
            }
        });               
    },
    
    setFormatParameter: function() {

        me.bean = {};
      
        
        var selectedValue = Ext.getCmp(prototype.id + '-rbgType').getValue();
        
        switch(selectedValue){
            case 'Sales':
                    me.bean.IN_TDOC = 'S';
                    break;
            case 'Refund':
                    me.bean.IN_TDOC = 'R';
                    break;
	}
        
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + 
                                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() +
                                Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();
                        
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                              Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() +
                              Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
                      
                      
        me.bean.IN_FTE = Ext.getCmp(prototype.id + '-cmbFTE').getValue();
        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        me.bean.IN_TICKET = Ext.getCmp(prototype.id + '-txtTKT').getValue();
        me.bean.IN_CARDN = Ext.getCmp(prototype.id + '-txtCARD').getValue();
        me.bean.IN_CARDC = Ext.getCmp(prototype.id + '-cmbCARDC').getValue();
        me.bean.IN_FECHA = Ext.getCmp(prototype.id + '-cmbFECHA').getValue();
        
        var check = Ext.getCmp(prototype.id + '-chkOAL').getValue();
        
        
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };
        console.log(searchParams);
    },
    
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        
        var chkDetail = Ext.getCmp(prototype.id + '-chkDetail').getValue();;
        
        if(chkDetail){
		imgSearch_clickHandler();
	} else{
		imgSearchTOTAL_clickHandler();
	}
        
//        this.setGridData();
    },
    
    imgSearch_clickHandler: function(obj, e) {
        this.setFormatParameter();
        
        if(rbPAY){
	
                
                Ext.getCmp(prototype.id + '-colPrin').setText('Payments');
                Ext.getCmp(prototype.id + '-colPRINcurr').setText('Payments');
                
                
                
	   	imgSearchFiltro_clickHandler(bean);
	   	Reiniciar_Pag(bean);
	   	if(rbCURR.selected){
	  	 	roBalance.search_1(bean);
	  	}else if(rbCOUN.selected){
	  	 	roBalance.search_2(bean);
	  	}else if(rbTARJ.selected){
	  	 	roBalance.search_3(bean);
	  	}
		//roBalance.search(bean);
		
	}else if(rbACCB){
		
	   	colPrin.headerText     = 'Payments';
	   	colPRINcurr.headerText = 'Payments';
	    imgSearchFiltro_clickHandler(beanACCB);
	   	Reiniciar_Pag(beanACCB);
		roBalance.search_ACCB(beanACCB);
		
	}else if(rbSETT){
	   	imgSearchFiltro_clickHandler(beanSETT);
	   	Reiniciar_Pag(beanSETT);
		roBalance.search_SETT(beanSETT);
		
	}
    
    },
    
    imgSearchTOTAL_clickHandler: function(obj, e) {
        this.setFormatParameter();
        
        
            
    },
    
    // <editor-fold defaultstate="collapsed" desc="setGridData">

    setGridData: function() {
        win.lblUser_toolTip("Estructura: A2280");
        me.panelActual = '-panelGridData';
        console.log('Set');
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {

            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/search'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function(obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                    }
                }
            });

            console.log(storeGridDatas);
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataAirport').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>


    validateFields: function() {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },
    btnAdd_click: function() {
        this.winDataEntry('I');
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.BalanceAnalysisForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                lstCountry: me.lstCountry
            }
        }).show();
    },
    btnBack_click: function(obj, e) {

        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            me.setWidthPie();

            this.getPaggin();
            if (me.pagginActual !== '') {
                var pag = Ext.getCmp(prototype.id + me.pagginActual);
                var pagData = pag.getPageData();
                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
            }
        } else {
            global.showMenu();
        }
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-cmbCARDC').setValue('');
        Ext.getCmp(prototype.id + '-cmbCurrency').setValue('');
        Ext.getCmp(prototype.id + '-cmbCountry').setValue('');

    },
    btnExcel_click: function(obj, e) {

        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Download Excel ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'ok') {
                        this.exportExcel();
                    }
                }
            });
        }
    },
    exportExcel: function() {

        this.setFormatParameter();
        console.log(me.panelActual);
        switch (me.panelActual) {
            case  '-panelGridData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
                break;
            default:
                global.Msg(
                        {msg: 'Under Construction'
                        });
        }

    },
    onDownloadFile: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        me.fileName = rowData.data.A2536NAMEF;
        Ext.Ajax.request({
            url: prototype.url + '/download',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridData').mask('Loading...'),
            params: me.paramsDetail,
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-gridData').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);

                var resultByte = res.bytes;
                var bytes = new Uint8Array(resultByte); // pass your byte response to this constructor
                var blob = new Blob([bytes], {type: "application/png"});// change resultByte to bytes

                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = me.fileName;
                link.click();
            }
        });

    },
    btnFilter_click: function(obj) {
        console.log('btnFilter_click');
        var option = Ext.getCmp(prototype.id + '-boxSearchFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function() {
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
    },
    getPaggin: function() {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
                break;
        }
    },
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },
    getInt: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000');
    },
    getDouble: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getText: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:left';
        return value;
    },
    getDoubleColor1: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#F2FAFC';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor2: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#DFF0ED';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor3: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#FCF5F2';
        return Ext.util.Format.number(value, '0,000.00');
    }


}
);
