Ext.define('Ext.Praxis.controller.flown.ReportNrtmex.ReportNrtmexController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ReportNrtmexController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    beanNM: {},
    beanLog: {},
    beanNMTicket: {},
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    lstBank: [],
    gridActual: '',
    panelActual: '',
    fileName: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    paramsDetailNM: {},
    paramsDetailNMTicket: {},
    paramsDetailTicketLog: {},
    dataObtain: {},
    
    init: function (view) {
        me = this;
        prototype.id = 'ReportNrtmexForm';
        prototype.url = CONTEXTPATH + '/ReportNrtmex';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridMainData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.obtainData();

        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#ReportNrtmexForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#ReportNrtmexForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ReportNrtmexForm-btnClear': {
                click: this.btnClear_click
            },
            '#ReportNrtmexForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#ReportNrtmexForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ReportNrtmexForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#ReportNrtmexForm-btnEmail': {
                click: this.btnEmail_click
            },
            '#ReportNrtmexForm-btnBack': {
                click: this.btnBack_click
            },
            '#ReportNrtmexForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#ReportNrtmexForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ReportNrtmexForm-btn-pag-next': {
                click: this.pagNext
            },
            '#ReportNrtmexForm-btn-pag-last': {
                click: this.pagLast
            },
            '#ReportNrtmexForm-cmbDateFromYear': {
//                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#ReportNrtmexForm-cmbDateFromMonth': {
//                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#ReportNrtmexForm-cmbDateToMonth': {
//                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            },
            '#ReportNrtmexForm-cmbDateFromDay': {
//                afterrender: this.afterRenderYear,
                select: this.selectComboFromDay
            },
            '#ReportNrtmexForm-checkSettlement': {
                change: this.checkEvent
            },
        });
    },
    xpanel_afterrender: function (obj, e) {
        this.obtainData();
        this.btnSearch_click();
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    filterTicketNRT: function (e, eOpts) {
        var txtTicket = Ext.getCmp(prototype.id + '-txtTICKET').getValue();
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onChangeCmbType: function (obj, value) {

        Ext.getCmp(prototype.id + '-panelFilter1').hide();
        Ext.getCmp(prototype.id + '-panelFilter2').hide();
        Ext.getCmp(prototype.id + '-panelFilter3').hide();
        Ext.getCmp(prototype.id + '-panelFilter4').hide();
        Ext.getCmp(prototype.id + '-panelFilter5').hide();
        Ext.getCmp(prototype.id + '-panelFilter6').hide();
        Ext.getCmp(prototype.id + '-panelFilter7').hide();
        Ext.getCmp(prototype.id + '-panelFilter8').hide();

        if (value !== '') {
            Ext.getCmp(prototype.id + '-panelFilter' + value).show();
        }
    },
    obtainData: function () {

        var month = this.fecha.getMonth() + 1;

        if (month < 10) {
            month = '0' + month;
        }

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
//        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(month);


        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);

        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
//        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(month);

        var cmbSearch = Ext.getCmp(prototype.id + '-cmbSearch');
        cmbSearch.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["0", "Flight Date"],
                ["1", "Sale Date"],
                ["2", "Contab Date"]
            ]
        }));
        cmbSearch.setValue("0");

    },
    viewTicket: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        var strTkt = rowData.data.strTicket;

        prototypeProgram.view = 'flown-report-nrtmex-form';
        prototypeProgram.nprog = 'PX00000634';
        prototypeProgram.title = 'Report NRT-MEX';
        prototypeProgram.modulo = '';

        var beanProMasterTicket = {};

        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(4, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(8, 6);

        console.log(beanProMasterTicket);

        win.displayProMasterTicket(this, 'ViewFlightConciliation', beanProMasterTicket);
    },
    setFormatParameter: function () {

        me.bean = {};
        me.bean.IN_DATE_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        me.bean.IN_DATE_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        me.bean.IN_TICKET = Ext.getCmp(prototype.id + '-txtTICKET').getValue();
        var TYPE = Ext.getCmp(prototype.id + '-cmbSearch').getValue();
        if (TYPE === '0') {
            me.bean.IN_TYPE = 'DFLIGHT';
        } else if (TYPE === '1') {
            me.bean.IN_TYPE = 'DSALES';
        } else if (TYPE === '2') {
            me.bean.IN_TYPE = 'FCONT';
        }

        console.log(me.bean);
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
    },
    btnSearch_click: function (obj, e) {
        
        
        me.beanNM = {};
        me.beanNM.IN_TIPO = '1';
        var txtTicket = Ext.getCmp(prototype.id + '-txtTICKET').getValue();

        if (txtTicket.trim().length === 13) {

            me.beanNM.IN_TICKET = txtTicket;
            console.log(this.beanNM);
            me.paramsDetailNM.beanString = JSON.stringify(this.beanNM);
         
            this.setGridData();

        } else if (txtTicket.trim().length === 0) {

            this.setFormatParameter();
            this.setGridMainData();

        } else {
            global.Msg({msg: 'Ticket Number must contain 13 digits.'});
        }

    },
    // <editor-fold defaultstate="collapsed" desc="setGridMainData">
    setGridMainData: function (obj, val) {
        console.log("URL : " + prototype.url + '/searchMain');
        win.lblUser_toolTip("Estructura: A4504");
        me.panelActual = '-panelGridMainData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.flown.AccountedAmountsInvoiced.GridData', {
                proxy: {
                    url: prototype.url + '/searchMain'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams;
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    },
                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask('Loading...');
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridMainData').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>
    onGridDetail: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.beanNM.DATE = rowData.data.DFLIGHT;
        this.beanNM.IN_TYPE = rowData.data.IN_TYPE;
        this.beanNM.DRILL = "";
        var drill = "";
        var date = rowData.data.strFormatDate;
        console.log(this.beanNM);
        me.paramsDetailNM.beanString = JSON.stringify(this.beanNM);
        this.setGridData(drill,date);
    },
    onGridDetailPE: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.beanNM.DATE = rowData.data.DFLIGHT;
        this.beanNM.IN_TYPE = rowData.data.IN_TYPE;
        this.beanNM.DRILL = "PE";
        var drill = "PE";
        var date = rowData.data.strFormatDate;
        console.log(this.beanNM);
        me.paramsDetailNM.beanString = JSON.stringify(this.beanNM);
        this.setGridData(drill,date);
    },
    onGridDetailCO: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.beanNM.DATE = rowData.data.DFLIGHT;
        this.beanNM.IN_TYPE = rowData.data.IN_TYPE;
        this.beanNM.DRILL = "CO";
        var drill = "CO";
        var date = rowData.data.strFormatDate;
        console.log(this.beanNM);
        me.paramsDetailNM.beanString = JSON.stringify(this.beanNM);
        this.setGridData(drill,date);
    },
    onGridDetailPA: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.beanNM.DATE = rowData.data.DFLIGHT;
        this.beanNM.IN_TYPE = rowData.data.IN_TYPE;
        this.beanNM.DRILL = "PA";
        var drill = "PA";
        var date = rowData.data.strFormatDate;
        console.log(this.beanNM);
        me.paramsDetailNM.beanString = JSON.stringify(this.beanNM);
        this.setGridData(drill,date);
    },
    onGridDetailNP: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.beanNM.DATE = rowData.data.DFLIGHT;
        this.beanNM.IN_TYPE = rowData.data.IN_TYPE;
        this.beanNM.DRILL = "NP";
        var drill = "NP";
        var date = rowData.data.strFormatDate;
        console.log(this.beanNM);
        me.paramsDetailNM.beanString = JSON.stringify(this.beanNM);
        this.setGridData(drill,date);
    },
    onGridDetailAP: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.beanNM.DATE = rowData.data.DFLIGHT;
        this.beanNM.IN_TYPE = rowData.data.IN_TYPE;
        this.beanNM.DRILL = "AP";
        var drill = "AP";
        var date = rowData.data.strFormatDate;
        console.log(this.beanNM);
        me.paramsDetailNM.beanString = JSON.stringify(this.beanNM);
        this.setGridData(drill,date);
    },
    onGridDetailNA: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.beanNM.DATE = rowData.data.DFLIGHT;
        this.beanNM.IN_TYPE = rowData.data.IN_TYPE;
        this.beanNM.DRILL = "NA";
        var drill = "NA";
        var date = rowData.data.strFormatDate;
        console.log(this.beanNM);
        me.paramsDetailNM.beanString = JSON.stringify(this.beanNM);
        this.setGridData(drill,date);
    },
    onGridDetailEX: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.beanNM.DATE = rowData.data.DFLIGHT;
        this.beanNM.IN_TYPE = rowData.data.IN_TYPE;
        this.beanNM.DRILL = "EX";
        var drill = "EX";
        var date = rowData.data.strFormatDate;
        console.log(this.beanNM);
        me.paramsDetailNM.beanString = JSON.stringify(this.beanNM);
        this.setGridData(drill,date);
    },
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridData: function (drill,date) {
        
        if(drill === 'PE'){
            drill = 'Pending';
        }else if(drill === 'CO'){
            drill = 'Conciliated';
        }else if(drill === 'PA'){
            drill = 'Pay';
        }else if(drill === 'NP'){
            drill = 'Not Payed';
        }else if(drill === 'AP'){
            drill = 'Applied';
        }else if(drill === 'NA'){
            drill = 'Not Applied';
        }else if(drill === 'EX'){
            drill = 'Exonerated';
        }
        
        if (date !== '') {
            if (drill !== '') {
                Ext.getCmp(prototype.id + '-gridData').setTitle('<center style="font-size:12px;"> Transaction Date :' + date + ' - ' + drill + '</center>');
            } else {
                Ext.getCmp(prototype.id + '-gridData').setTitle('<center style="font-size:12px;"> Transaction Date :' + date + '</center>');
            }
        } else {
            Ext.getCmp(prototype.id + '-gridData').setTitle('<center style="font-size:12px;">' + '</center>');
        }
        
        console.log("URL : " + prototype.url + '/search');
        win.lblUser_toolTip("Estructura: A4503");
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.flown.AccountedAmountsInvoiced.GridData', {
                proxy: {
                    url: prototype.url + '/search'
                }, listeners: {
                    beforeload: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = me.paramsDetailNM;
                    },
                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask('Loading...');
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
            global.clear();
            Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>

    validateFields: function () {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },
    btnAdd_click: function () {
        this.winDataEntry('I');
    },
    onEditClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        console.log(me.lst);
        Ext.create('Ext.Praxis.view.flown.ReportNrtmexForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                lst: me.lst
            }
        }).show();
    },
    btnBack_click: function (obj, e) {

        if (me.panelActual === '-panelGridDataLog') {
            console.log('prueba');
            $(Ext.getCmp(prototype.id + '-chkLog')).prop("disabled", true);
        }

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
    btnClear_click: function (obj, e) {
        Ext.getCmp(prototype.id + '-cmbCode').setValue('');
        Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
        Ext.getCmp(prototype.id + '-cmbBank').setValue('');

    },
    btnExcel_click: function (obj, e) {

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
                fn: function (btn) {
                    if (btn === 'ok') {
                        this.exportExcel();
                    }
                }
            });
        }
    },
    exportExcel: function () {

        this.setFormatParameter();
        switch (me.panelActual) {
            case  '-panelGridMainData':
                global.getFile(prototype.url + '/getXLSXMain?beanString=' + searchParams.beanString);
                break;
            case  '-panelGridData':
                global.getFile(prototype.url + '/downloadText?beanString=' + me.paramsDetailNM.beanString);
                break;
            default:
                global.Msg(
                        {msg: 'Under Construction'
                        });
        }

    },
    onDownloadFile: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        me.fileName = rowData.data.A2536NAMEF;
        Ext.Ajax.request({
            url: prototype.url + '/download',
            method: 'POST',
            timeout: 60000000,
//            beforerequest: Ext.getCmp(prototype.id + '-gridData').mask('Loading...'),
            params: me.paramsDetail,
            success: function (response, options) {
//                Ext.getCmp(prototype.id + '-gridData').unmask('Loading...');
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
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function () {
        console.log(me.panelActual);
        if (me.panelActual === '-panelGridData') {
            var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
            Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
            Ext.getCmp(prototype.id + '-pie').setVisible(true);
        } else {
            Ext.getCmp(prototype.id + '-pie').setVisible(false);
        }
    },
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
                break;
        }
    },
    afterRenderYear: function (obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function (obj) {
        obj.setValue('01');
    },
    selectComboFromYear: function (obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
    },
    selectComboFromMonth: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboToMonth: function (obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(obj.getValue());
            }
        }
    },
    selectComboFromDay: function (obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());
    },
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },
    getInt: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000');
    },
    getDouble: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getText: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:left';
        return value;
    },
    getDoubleColor1: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#F2FAFC';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor2: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#DFF0ED';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor3: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#FCF5F2';
        return Ext.util.Format.number(value, '0,000.00');
    }


}
);
