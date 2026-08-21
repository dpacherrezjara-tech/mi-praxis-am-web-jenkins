
Ext.define('Ext.Praxis.controller.salesaudit.RFNDPending.RFNDPendingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RFNDPendingController',

    /**
     * Constructor
     */

    beanTMP: {},
    beanUpdate: {},

    /**
     * Constructor
     */

    init: function (view) {
        var me = this;
    },

    OnBeforeShow: function () {
        /*
         * Solucion temporal para el reinicio de variables
         */
        // console.log('Antes de mostrar...');
        prototype.id = 'RFNDPending';
        prototype.id01 = 'DetailRefundQueryRFND';
        prototype.id2 = 'DetailTicket';
        prototype.id3 = 'RFNDAddTax';
        prototype.id4 = 'DetailTicketHistory';
        prototype.url02 = CONTEXTPATH + '/RFNDPending';
        prototype.url01 = CONTEXTPATH + '/RFNDQuery';
        prototype.url3 = CONTEXTPATH + '/RFNDUserMaintenance';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;
    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
       var me = this;
        me.onLoadUsers();
        // this.setUser();
        Ext.getCmp(prototype.id + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
        me.setStoresFilters();
        me.setStoresGrids();
        me.onSearchClick();
    },
    onLoadUsers: function () {
        var me = this;
        var cmbUser = Ext.getCmp(prototype.id + '-txtUser');
        var store = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url3 + '/loadDataInit',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalPorperty: 'total'
                }
            },
            autoLoad: true,
            listeners: {
                load: function (obj, records, successful, operation, eOpts) {
                    cmbUser.setValue('ALL');
                }
            }
        });
        cmbUser.setStore(store);
       //me.onSearchClick();
    },
   /* setUser: function () {
        var me = this;
        Ext.Ajax.request({
            url: prototype.url02 + '/getUser',
            timeout: 60000000,
            method: 'POST',
            //params: this.beanTMP,
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                Ext.getCmp(prototype.id + '-txtUser').setValue('XFMALAGON');   // Ext.String.trim(res.user.USR);
                me.onSearchClick();

            }
        });
    },*/
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.id + '-search-type');
        var cmbStatus = Ext.getCmp(prototype.id + '-CmbStatus');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                //{ "code": "5", "name": "AGENCY"},
                {"code": "4", "name": "APPLICATION DATE"},
                {"code": "6", "name": "AUTHORISED - REJECTED / DATE"},
                {"code": "2", "name": "FOLIO"},
                //{ "code": "7", "name": "NO ASSIGNMENT"},
                {"code": "1", "name": "SYSTEM DATE"},
                {"code": "3", "name": "TICKET"}
            ]
        }));

        cmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "A", "name": "ASSIGNED TO THE AUDITOR"},
                {"code": "E", "name": "ERROR IN THE PROCESS"},
                {"code": "C", "name": "INCONSISTENCY WITH THE ROBOT"},
                {"code": "Y", "name": "PENDING"},
                {"code": "X", "name": "REMOVED"}
            ]
        }));
    },

    setStoresGrids: function () {
        var grid00 = Ext.getCmp(prototype.id + '-grid');

        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-store-grid00',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: prototype.url02 + '/SearchQueryRefund',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        grid00.setStore(store00);

        Ext.getCmp(prototype.id + '-pagginator-01').setStore(store00);
    },

    onPagingBeforeChange01: function (obj, page, opts) {
        obj.store.proxy.extraParams = this.beanTMP;
    },

    onCmbSearchAfterRender: function (obj) {
        obj.setValue('1');
    },

    onCmbSearchChange: function (obj, newValue, oldValue, eOpts) {
        // console.log(String(newValue))
        var txtIATA = Ext.getCmp(prototype.id + '-txtIATA');
        var txtDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom');
        var txtDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo');
        var txtHora1 = Ext.getCmp(prototype.id + '-txthora1');
        var txtHora2 = Ext.getCmp(prototype.id + '-txthora2');
        var txtCia = Ext.getCmp(prototype.id + '-txtCia');
        var txtForma = Ext.getCmp(prototype.id + '-txtFrmaSerie');
        var txtSeq = Ext.getCmp(prototype.id + '-txtSeq');
        var txtNumber = Ext.getCmp(prototype.id + '-txtNumber');
        var cmbStatus = Ext.getCmp(prototype.id + '-CmbStatus');
        var txtCountry = Ext.getCmp(prototype.id + '-cmbCountry');
        var txtUser = Ext.getCmp(prototype.id + '-txtUser');
        var boxFilter02 = Ext.getCmp(prototype.id + '-box-filter-02');
        switch (String(newValue)) {
            case '1':
            case '4':
            case '6':
                txtIATA.hide();
                cmbStatus.show();
                txtDateFrom.show();
                txtDateTo.show();
                txtHora1.hide();
                txtHora2.hide();
                txtCia.hide();
                txtForma.hide();
                txtSeq.hide();
                txtNumber.hide();

                boxFilter02.show();

                if (String(newValue) === '6') {
                    txtHora1.show();
                    txtHora2.show();
                } else {
                    txtHora1.setValue('');
                    txtHora2.setValue('');
                }
                break;
            case '2':
            case '3':
                txtIATA.hide();
                cmbStatus.hide();
                txtDateFrom.hide();
                txtDateTo.hide();
                txtHora1.hide();
                txtHora2.hide();
                txtCia.show();
                txtForma.hide();
                txtSeq.hide();
                txtNumber.show();

                boxFilter02.show();

                if (String(newValue) === '3') {
                    txtForma.show();
                    txtSeq.show();
                    txtNumber.hide();
                }
                break;
            case '5':
                txtIATA.show();
                cmbStatus.show();
                txtDateFrom.hide();
                txtDateTo.hide();
                txtHora1.hide();
                txtHora2.hide();
                txtCia.hide();
                txtForma.hide();
                txtSeq.hide();
                txtNumber.hide();

                boxFilter02.show();
                break;
            case '7':
                txtIATA.hide();
                cmbStatus.hide();
                txtDateFrom.hide();
                txtDateTo.hide();
                txtHora1.hide();
                txtHora2.hide();
                txtCia.hide();
                txtForma.hide();
                txtSeq.hide();
                txtNumber.hide();
                txtCountry.hide();
                txtUser.hide();

                boxFilter02.hide();
                boxFilter02.setBorder(false);
        }
    },

    onCmbStatusAfterRender: function (obj) {
        obj.setValue('');
    },

    onCmbStatusChange: function (obj, newValue, oldValue, eOpts) {

    },

    onSearchClick: function (btn) {
        var me = this;
        var form = Ext.getCmp(prototype.id + '-contenedor-filters-form').getForm();

        var grid = Ext.getCmp(prototype.id + '-grid');
        var store = grid.getStore();
        store.removeAll();

        var comboBy = String(Ext.getCmp(prototype.id + '-search-type').getValue());
        if (comboBy != '7') {
            if (comboBy == '') {
                Ext.Msg.alert('.: PRAXIS :.', 'SELECT Of By');
                return;
            }
        }

        if (comboBy == '1' || comboBy == '4' || comboBy == '6') {
            if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()) != '') {
                if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()) == '') {
                    Ext.Msg.alert('.: PRAXIS :.', 'Enter Date To');
                    return;
                }
            }
            if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()) != '') {
                if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()) == '') {
                    Ext.Msg.alert('.: PRAXIS :.', 'Enter Date From');
                    return;
                }
            }

            /*if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()) != '' &&
                    Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()) != '') {
                if (global.validate_fechaMayorQue(Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()), Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()))) {
                    Ext.Msg.alert('.: PRAXIS :.', 'the starting date must be less than the end date');
                    return;
                }
            }*/
        }

        /*if ( comboBy == '6' ){
         if ( Ext.String.trim(Ext.getCmp(prototype.id+'-txthora1').getValue()) != '' &&
         Ext.String.trim(Ext.getCmp(prototype.id+'-txthora2').getValue()) != '' ){
         Ext.Msg.alert('.: PRAXIS :.', 'the starting hour must be less than the end hour');
         return;
         }
         }*/

        if (comboBy == '2' || comboBy == '3' || comboBy == '5') {
            if (comboBy == '2') {
                me.beanTMP.IN_DOCUMET = Ext.String.trim(Ext.getCmp(prototype.id + '-txtNumber').getValue());
            } else {
                me.beanTMP.IN_DOCUMET = '';
            }
            if (comboBy == '3') {
                me.beanTMP.IN_CIA = Ext.String.trim(Ext.getCmp(prototype.id + '-txtCia').getValue());
                me.beanTMP.IN_FORMA = Ext.String.trim(Ext.getCmp(prototype.id + '-txtFrmaSerie').getValue().substr(0, 4));
                me.beanTMP.IN_SERIE = Ext.String.trim(Ext.getCmp(prototype.id + '-txtFrmaSerie').getValue().substr(4, 10));
                me.beanTMP.IN_SEQ = Ext.String.trim(Ext.getCmp(prototype.id + '-txtSeq').getValue());
            } else {
                me.beanTMP.IN_CIA = '';
                me.beanTMP.IN_FORMA = '';
                me.beanTMP.IN_SERIE = '';
                me.beanTMP.IN_SEQ = '';
            }
            me.beanTMP.IN_DATEFROM = '';
            me.beanTMP.IN_DATETO = '';
        }

        if (comboBy == '1' || comboBy == '4' || comboBy == '6') {
            if (comboBy == '6') {
                me.beanTMP.IN_FORMA = Ext.String.trim(Ext.getCmp(prototype.id + '-txthora1').getValue());
                me.beanTMP.IN_SERIE = Ext.String.trim(Ext.getCmp(prototype.id + '-txthora2').getValue());
            } else {
                me.beanTMP.IN_FORMA = '';
                me.beanTMP.IN_SERIE = '';
            }
            me.beanTMP.IN_DATEFROM = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue();
            me.beanTMP.IN_DATETO = Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue();

            me.beanTMP.IN_CIA = '';
            me.beanTMP.IN_DOCUMET = '';
            me.beanTMP.IN_SEQ = '';
        }

        me.beanTMP.IN_OPTION = comboBy;
        me.beanTMP.IN_STATUS = Ext.getCmp(prototype.id + '-CmbStatus').getValue();
        me.beanTMP.IN_COUNTRY = Ext.String.trim(Ext.getCmp(prototype.id + '-cmbCountry').getValue());
        me.beanTMP.IN_USER = Ext.getCmp(prototype.id + '-txtUser').getValue();
        me.beanTMP.IN_USER = me.beanTMP.IN_USER == 'ALL' ? '' : me.beanTMP.IN_USER;
        me.beanTMP.IN_IATA = Ext.String.trim(Ext.getCmp(prototype.id + '-txtIATA').getValue());

        /*
         * El valor obtenido del checkbox se interpreta de forma inversa para 
         * aprovechar el uso de la variable bexcel
         */
        me.beanTMP.pexcel = Ext.getCmp(prototype.id + '-pagination').getValue() ? 0 : 1;

        store.loadPage(1, {
            params: me.beanTMP,
            callback: function (records, operation, success) {
                Ext.getCmp(prototype.id + '-pagination').enable();
            }
        });

    },
    onSearchkey: function (f, e) {
        if (e.getKey() == e.ENTER) {
            this.onSearchClick();
        }

    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },

    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        Ext.getCmp(prototype.id + '-btn-search').fireEvent('click', {});
        if (!newValue) {
            Ext.getCmp(prototype.id + '-pagginator-01').disable();
            //   Ext.getCmp(prototype.id + '-pagginator-legend').hide();
        } else {
            Ext.getCmp(prototype.id + '-pagginator-01').enable();
            // Ext.getCmp(prototype.id + '-pagginator-legend').show();
        }
    },

    onRendererColumnAgency: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value
    },

    onRendererColumnPassenger: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value
    },

    onRendererColumnReason: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value
    },

    onRendererColumnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        switch(Ext.String.trim(String(record.get('A3647FLAG')))){
            case 'A': color = '#81BEF7'; value = 'ASSIGNED TO AUDITOR'; break;
            case 'R': color = '#F78181'; value = 'REJECTED'; break;
            case 'F': color = '#81F781'; value = 'AUTHORISED'; break;
            case 'Y': color = '#CCFF00'; value = 'PENDING'; break;
            case 'X': color = '#FF0000'; value = 'VOID'; break;
            case 'D': color = '#FF9966'; value = 'REEMBOLSABLE'; break;
            case 'J': color = '#69D3F8'; value = ''; break;
            case 'G': color = '#0099FF'; value = 'NO REEMBOLSABLE'; break;
            case 'B': color = '#CC9966'; value = 'CHANGE FOR ANOTHER'; break;
            case 'C': color = '#D329E8'; value = 'INCONSISTENCY WITH THE ROBOT'; break;
            case '': color = '#FF0000'; value = 'PENDING ASSIGNED'; break;
            case 'E': color = '#F2A60D'; value = 'ERROR IN THE PROCESS'; break;
        } 
        metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";
        return value
    },

    onRendererColumnOnTime: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('A3647SEMAF'))) {
            case 'ORANGE':
                value = 'orange';
                break;
            case 'GREEN':
                value = 'green';
                break;
            default:
                value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },

    onDetailClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('FORMASSOCIATEDRFND', rec);
    },

    winDataEntry: function (action, rec) {
        action = action == null || action == undefined ? 'I' : action;
        rec = rec == null || rec == undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.RFNDQuery.DetailRefundQueryRFND({
            params: {
                action: action,
                rec: rec,
                url01: prototype.url01,
                url02: prototype.url02
            }
        });
        win.show();
    },

    onExcelClick: function (obj) {
        if (Ext.Object.getSize(this.beanTMP) > 0) {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Download Excel ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'ok') {
                        global.getFile(prototype.url02 + '/getXLSX?beanString=' + encodeURI(JSON.stringify(this.beanTMP)));
                    }
                }
            });
        }
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },

});
