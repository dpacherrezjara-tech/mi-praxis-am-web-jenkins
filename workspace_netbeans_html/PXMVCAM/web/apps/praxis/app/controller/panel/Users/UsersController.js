Ext.define('Ext.Praxis.controller.panel.Users.UsersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.UsersController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    fecha: new Date(),
    searchParams: {},    
    _path: '',
    profilesdesc: [],
    profiles: [],
    // </editor-fold>
    init: function(view) {
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'UsersForm';
        prototype.url = CONTEXTPATH+'/Users';
        prototype.widthContenedor = 1300;
        prototype.widthGrid = 863;
        // </editor-fold>
        this.control({
        });
    },
    afterRender: function () {
        this.setStoreData();
        this.btnClear_click();
        this.searchProfiles();
//        this.btnSearch_click();
    },
    onMostrarFiltrosChange: function(cmp, newValue, oldValue, eOpts) {
        
    },
    
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    setStoreData: function() {
        var cboGroup = Ext.getCmp(prototype.id + '-cboGroup');
        cboGroup.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "User"]
            ]
        }));
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Info">
    onEditClick: function(grid, rowIndex, colIndex) {
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        console.log(rec);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        rec.profiles = profiles;
        Ext.create('Ext.Praxis.view.panel.UsersForm.DataEntry', {
            id: 'DataEntryUsersForm',
            params: {
                action: action,
                rec: rec
            }
        }).show();
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="onViewClick">
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        var strModulo = this.getValue('cboGroup');
        if (strModulo!=='') {
            this.setFormatParameter();
            this.setGridData();
        } else {
            global.Msg({
                msg: 'Please select module.'
            });
            this.focus('cboGroup');
        }
    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id+'-boxSearchFilter');
        if (option.isVisible()) option.setVisible(false);
        else option.setVisible(true);
    },
    btnExcel_click: function(obj, e) {
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
    btnClear_click: function(obj, e) {
        //this.limpiarFiltros();
        
        //this.setValue("cboGroup", "");
        
        // <editor-fold defaultstate="collapsed" desc="Clear Grilla">
        Ext.getCmp(prototype.id+'-gridData').getStore().removeAll();
        Ext.getCmp(prototype.id+'-lbl-currentPage').setText("1");
        Ext.getCmp(prototype.id+'-lbl-pageCount').setText("0");
        Ext.getCmp(prototype.id+'-lbl-total').setText("0");
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="show">
        Ext.getCmp(prototype.id+'-boxMainData').show();
        
        // </editor-fold>
    },
    btnAdd_click: function() {
        this.winDataEntry('I');
    },
    btnBack_click: function() {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            var heightMenu = 400;
            Ext.getCmp('App-main-region-content-north').setHeight(heightMenu);
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameter: function() {
        var group = Ext.getCmp(prototype.id + '-cboGroup').getValue();
        var option = Ext.getCmp(prototype.id+'-codigo-option').getValue();
        
        searchParams = { 
                group: group,
                option: option
            };
        
        // <editor-fold defaultstate="collapsed" desc="asignación">
        _path = prototype.url+'/getXLSX?' +
                'group='+searchParams.group+'&' +
                'option='+searchParams.option;
        // </editor-fold>
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridData: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.panel.Users.GridData', {
            proxy: {
                url: prototype.url+'/search'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1955");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
                    var pag = Ext.getCmp(prototype.id+'-paggin');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id+'-lbl-currentPage').setText(currentPage);
                    Ext.getCmp(prototype.id+'-lbl-pageCount').setText(pageCount);
                    Ext.getCmp(prototype.id+'-lbl-total').setText(total);
                    // </editor-fold>
                    if (obj.data.items.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    var arr = [];
                    arr = profilesdesc;
                    obj.data.items.map((item, i)=>{
                        var res = arr.find((profile)=> profile.id === item.data.ID_PROFILE);
                        item.data.DESC1 = res === undefined ? '--': res.desc;
                        return item;
                    });
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin').bindStore(storeGridDatas);
    },
    // </editor-fold>    
    
    exportExcel: function() {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            global.getFile(_path);
        }
    },
    limpiarFiltros: function() {
        
        // <editor-fold defaultstate="collapsed" desc="Clear Campos">
        Ext.getCmp(prototype.id+'-cboGroup').setValue('1');
        Ext.getCmp(prototype.id+'-codigo-option').setValue('');        
        // </editor-fold>
    },

    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveFirst();
        }
    },
    pagPrevious: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').movePrevious();
        }
    },
    pagNext: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveNext();
        }
    },
    pagLast: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveLast();
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
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
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.btnSearch_click();
        }
    },
    searchProfiles: function() {
        var mod = this;
        Ext.Ajax.request({
            url: prototype.url + '/searchProfiles',
            method: 'POST',
            timeout: 60000000,
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var arr = [];
                var arr1 = [];
                if (res.success) {
                    res.data.map((data, i)=>{
                        arr[i+1] = [data.ID_PROFILE, data.DESC1];
                        arr1[i] = {id: data.ID_PROFILE, desc: data.DESC1};
                    });
                    arr[0] = ["0","-- SELECT --"];
                    profiles = arr;
                    profilesdesc = arr1;
                    
                } else {
                    global.Msg({
                        msg: res.sesion
                    });
                }
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    }
    // </editor-fold>
});
