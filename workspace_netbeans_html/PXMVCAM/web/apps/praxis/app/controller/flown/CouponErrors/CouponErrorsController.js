Ext.define('Ext.Praxis.controller.flown.CouponErrors.CouponErrorsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CouponErrorsController',
    bean: {},
    searchParams: {},
    _path: '',
    me: '',
    pagginActual: '-paggin',
    gridActual: '-panelMain',
    boxActual: '-vskMain',
    setContext: function () {
        me = this;
    },
    init: function(view) {
        me = this;
        this.control({
            '#CouponErrorsForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#CouponErrorsForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#CouponErrorsForm-btn-pag-next': {
                click: this.pagNext
            },
            '#CouponErrorsForm-btn-pag-last': {
                click: this.pagLast
            }
        });
        prototype.id = 'CouponErrorsForm';
        prototype.url = CONTEXTPATH + '/CouponErrors';
    },
    afterRender: function () {
        this.onSearchClick();
    },
    cbxFiltro_clickHandler: function( obj , newValue , oldValue , eOpts){
//        this.setValue('txtCampo', '');
//        var selectedValue = this.getValue("cbxFiltro");
//        Ext.getCmp(prototype.id + '-txtCampo').show();
//        if(selectedValue ===''){
//            Ext.getCmp(prototype.id + '-txtCampo').hide();
//	}else if(selectedValue ==='EQUIPO'){
//            Ext.getCmp(prototype.id+'-txtCampo').inputEl.dom.maxLength=6;
//	}else if(selectedValue ==='MODELO'){
//            Ext.getCmp(prototype.id+'-txtCampo').inputEl.dom.maxLength=10;
//	}else if(selectedValue ==='MATRIC'){
//            Ext.getCmp(prototype.id+'-txtCampo').inputEl.dom.maxLength=15;
//	}
        this.onSearchClick();
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.flown.CouponErrorsForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec
            }
        }).show();
    },
    //<editor-fold defaultstate="collapsed" desc="Options">
    onSearchClick: function(obj, e) {
        this.bean.IN_ERRORCODE = Ext.getCmp(prototype.id + '-txtErrorCode').getValue();
        this.search(this.bean);
    },
    onFilterClick: function(obj) {
        var cmp = Ext.getCmp(prototype.id + '-contentFilter');
        if(cmp.isVisible()) {
            Ext.getCmp(prototype.id + '-contentFilter').hide();
        } else {
            Ext.getCmp(prototype.id + '-contentFilter').show();
        }
    },
    onDisplayClick: function() {
//        Ext.getCmp(prototype.id + '-txtErrorCode').setValue('txtCampo', '');
    },
    onExcelClick: function(obj, e) {
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
    },
    onClearClick: function(obj, e) {
        Ext.getCmp(prototype.id + '-txtErrorCode').setValue('');
    },
    onAddClick: function(obj, e) {
        this.winDataEntry('I');
    },
    onBackClick: function() {
        global.showMenu();
    },
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="search">
    search: function (bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.AircraftMaster.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean),bExcel:false};
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A2543");
                    
                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found'});
                    } else {
                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    }
                    global.clear();
                }
            }
        });
        
        
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas); 
        _path = prototype.url+'/getXLSX?' +
            'IN_ERRORCODE='+bean.IN_ERRORCODE;
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1702">
    MaintenanceA1702: function(beanTemp, strOption) {
        Ext.Ajax.request({
            url: prototype.url+'/MaintenanceA1702',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(beanTemp), strOption: strOption},
            success: function(response, opts){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var msj = res.Mensaje;
                    global.Msg({ msg: msj });
                    me.search(me.bean);
                    meEntry.btnCancel_clickHandler();
                } else global.Msg({ msg: res.sesion });
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    exportExcel: function() {
        global.getFile(_path);
    },
    onClickFileLoad_VLO: function () {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: '¿Upload file?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
//                    Ext.getCmp(prototype.id + '-btn-upload_VLO').disable(true);
                    this.upload_VLO();
                }
            }
        });
    },
    upload_VLO: function () {

        var file = Ext.getCmp(prototype.id + '-file_VLO').getValue();
        console.log(file);

        if (file === '') {
            Ext.MessageBox.alert('PRAXIS', "::: Select only one file. Please :::", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-file_VLO').focus();", 100);
            });
            return;
        }

        var form = Ext.getCmp(prototype.id + '-form-01_VLO').getForm();
        form.submit({
            url: prototype.url + '/updateAircraft',
            waitMsg: 'Uploading your sure to upload the file...',
            params: {fileName: file},
            success: function (fp, o) {
                var res = Ext.decode(o.response.responseText);
                console.log(res);

                if (res.success) {
                    var msjResult = res.msj;
                    global.Msg({msg: msjResult});
                    this.onSearchClick();
                } else {
                    global.Msg({msg: "Error Excel Load"});
                }
//                Ext.getCmp(prototype.id+'-btn-upload_VLO').enable(true);
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });

    },
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function(obj, e, eOpts){
        if (e.getKey() === e.ENTER){
            this.onSearchClick(); // O cualquier función que desees ejecutar
        }
    },
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id+'-'+id).focus();
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id+'-'+id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    pagFirst: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    },
    pagPrevious: function (obj, e) {
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
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.gridActual) {
            case  '-panelMain':
                me.pagginActual = '-paggin';
                break;
        }
    },
    // </editor-fold>
});
