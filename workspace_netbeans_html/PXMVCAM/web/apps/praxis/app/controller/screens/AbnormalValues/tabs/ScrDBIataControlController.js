Ext.define('Ext.Praxis.controller.screens.AbnormalValues.tabs.ScrDBIataControlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ScrDBIataControlController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    columns2: {},
    bean: {},
    beanDet: {},
    meIataCtr: '',
    dw_excel: false,
    boxActual: '-boxMainDataIataControl',
    drillDown: [],
    gloMoneda: 'USD',
    _path: '',
    // </editor-fold>
    init: function (view) {
        meIataCtr = this;
        console.log('ScrDBIataControlController - initt');
        meIataCtr.drillDown.push(meIataCtr.boxActual);
        console.log(meIataCtr.drillDown);


        var type = Ext.getCmp(prototype.id + '-cmbTipo_ControlTotal');
        type.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "Values out of Range"],
                ["2", "Average Control"],
                ["3", "Total Control"]
            ]
        }));
        type.setValue("1");
    },
    afterRender: function () {

        console.log('ScrDBIataControlController - after');
        Ext.getCmp(prototype.id + '-cmbDateFromYear2').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear2').setValue(new Date().getFullYear());

        Ext.getCmp(prototype.id + '-cmbDateFromMonth2').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToMonth2').setValue('');

        Ext.getCmp(prototype.id + '-cmbDateFromDay2').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToDay2').setValue('');

    },
    btnSearch_click: function (bean) {
        console.log(' ScrDBIataControlController - btnSearch_click');
        Ext.getCmp(prototype.id + '-boxMainDataIataValuesOutOfRange').show();
        Ext.getCmp(prototype.id + '-boxMainDataIataAverageControl').hide();
        Ext.getCmp(prototype.id + '-radioButton').show();

        var selectBy = Ext.getCmp(prototype.id + '-cmbTipo_ControlTotal').getValue();
        var chk = Ext.getCmp(prototype.id + '-chkONE').getValue();
        if (selectBy === '1') {
            Ext.getCmp(prototype.id + '-chkMonth_label').show();
            Ext.getCmp(prototype.id + '-chkONE').show();
            if (chk) {
                Ext.getCmp(prototype.id + '-chkMonth_label').setText('One Columns View');
                this.DD_BYAGENT_colHandler('XXX');
            } else {
                Ext.getCmp(prototype.id + '-chkMonth_label').setText('Three Columns View');
                this.loadTotalControlTotal_Abnormal_Country_ONE();
            }
        } else if (selectBy == '2') {
            Ext.getCmp(prototype.id + '-chkMonth_label').hide();
            Ext.getCmp(prototype.id + '-chkONE').hide();
            Ext.getCmp(prototype.id + '-radioButton').hide();
            Ext.getCmp(prototype.id + '-boxMainDataIataValuesOutOfRange').hide();
            Ext.getCmp(prototype.id + '-boxMainDataIataAverageControl').show();
            this.loadTotalControlTotal_Agent();

        } else if (selectBy == '3') {
            Ext.getCmp(prototype.id + '-chkMonth_label').hide();
            Ext.getCmp(prototype.id + '-chkONE').hide();
            Ext.getCmp(prototype.id + '-radioButton').hide();
            Ext.getCmp(prototype.id + '-boxMainDataIataValuesOutOfRange').hide();
            Ext.getCmp(prototype.id + '-boxMainDataIataAverageControl').hide();
        }


    },
    loadTotalControlTotal_Abnormal_Country_ONE: function () {

        console.log(' ScrDBIataControlController - loadTotalControlTotal_Abnormal_Country_ONE');

        this.setFormatParameter();
        win.lblUser_toolTip("Estructura: IMF078");
        Ext.Ajax.request({
            url: prototype.url + '/loadTotalControlTotal_Abnormal_Country_ONE',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: this.searchParams, dw_excel: false},
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
//                console.log(response);

                var res = Ext.JSON.decode(response.responseText);
                var lstData = res.lstData_Abnormal_CS;
//                console.log(lstData);

                if (lstData.length > 0) {
//                    var bean = lstData[0];
//                    Ext.getCmp(prototype.id + '-chkMonth_label').setText('One Columns View');

                    var storeData = Ext.create('Ext.data.Store', {
                        data: lstData,
                        autoLoad: true
                    });

                    Ext.getCmp(prototype.id + '-gridMainDataByValues').bindStore(storeData);
//                    Ext.getCmp(prototype.id + '-ADG_GridControlTotal_Abnormal_CS').bindStore(storeData);
                } else {
                    global.Msg({msg: 'Data not found.'});
                }
            }
        });

//        meIataCtr.dw_excel = false;

    },
    loadTotalControlTotal_Abnormal_Country: function () {

        console.log(' ScrDBIataControlController - loadTotalControlTotal_Abnormal_Country');

        this.setFormatParameter_2();
        win.lblUser_toolTip("Estructura: IMF078");
        Ext.Ajax.request({
            url: prototype.url + '/loadTotalControlTotal_Abnormal_Country',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: this.searchParams, dw_excel: false},
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');

                var res = Ext.JSON.decode(response.responseText);
                var lstData = res.lstData_Abnormal_CS;
                var lstData2 = res.lstData_Abnormal_CR;
                var lstData3 = res.lstData_Abnormal_CE;

                if (lstData.length > 0) {
                    var bean = lstData[0];
                    var bean2 = lstData2[0];
                    var bean3 = lstData3[0];

                    Ext.getCmp(prototype.id + '-titSales_AB').setText('Sales USD');
                    Ext.getCmp(prototype.id + '-titRefund_AB').setText('Refund USD');
                    Ext.getCmp(prototype.id + '-titExchange_AB').setText('Exchange USD');

                    Ext.getCmp(prototype.id + '-titFecha_AB_Country_S').setText(bean.strDescripcion4);
                    Ext.getCmp(prototype.id + '-titFecha_AB_Country_R').setText(bean2.strDescripcion4);
                    Ext.getCmp(prototype.id + '-titFecha_AB_Country_E').setText(bean3.strDescripcion4);

                    var storeData = Ext.create('Ext.data.Store', {
                        data: lstData,
                        autoLoad: true
                    });

                    var storeData2 = Ext.create('Ext.data.Store', {
                        data: lstData2,
                        autoLoad: true
                    });

                    var storeData3 = Ext.create('Ext.data.Store', {
                        data: lstData3,
                        autoLoad: true
                    });

                    Ext.getCmp(prototype.id + '-ADG_GridControlTotal_Abnormal_CS').bindStore(storeData);
                    Ext.getCmp(prototype.id + '-ADG_GridControlTotal_Abnormal_CR').bindStore(storeData2);
                    Ext.getCmp(prototype.id + '-ADG_GridControlTotal_Abnormal_CE').bindStore(storeData3);
                } else {
                    global.Msg({msg: 'Data not found.'});
                }
            }
        });

//        meIataCtr.dw_excel = false;

    },
    setFormatParameter: function () {
        meIataCtr.bean = {};

        meIataCtr.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear2').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth2').getValue();
        meIataCtr.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear2').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth2').getValue();
        meIataCtr.bean.IN_PAIS = Ext.getCmp(prototype.id + '-cmbPais').getValue();
        meIataCtr.bean.strTIPO = Ext.getCmp(prototype.id + '-cmbTran').getValue();
        meIataCtr.bean.FLAG = '';
        meIataCtr.bean.IN_CARD1 = Ext.getCmp(prototype.id + '-txtCard1').getValue();
        meIataCtr.bean.IN_CARD2 = Ext.getCmp(prototype.id + '-txtCard2').getValue();

        var beanString = JSON.stringify(meIataCtr.bean);
        this.searchParams = beanString;
    },
    setFormatParameter_2: function () {
        meIataCtr.bean = {};

        meIataCtr.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear2').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth2').getValue();
        meIataCtr.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear2').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth2').getValue();
        meIataCtr.bean.IN_PAIS = '';
        meIataCtr.bean.strCountryS = '';
        meIataCtr.bean.strTIPO = Ext.getCmp(prototype.id + '-cmbTran').getValue();
        meIataCtr.bean.FLAG = '';
        meIataCtr.bean.IN_CARD1 = Ext.getCmp(prototype.id + '-txtCard1').getValue();
        meIataCtr.bean.IN_CARD2 = Ext.getCmp(prototype.id + '-txtCard2').getValue();

        var beanString = JSON.stringify(meIataCtr.bean);
        this.searchParams = beanString;
    },
    ChangechkONE: function (obj, value, cmp, strFunc) {

        if (value) {
            Ext.getCmp(prototype.id + '-BoxAB_Pais_ONE').hide();
            Ext.getCmp(prototype.id + '-BoxAB_Pais').show();
            Ext.getCmp(prototype.id + '-radioButton').show();

            Ext.getCmp(prototype.id + '-chkMonth_label').setText('One Columns View');

            this.btnSearch_click();
        } else {
            Ext.getCmp(prototype.id + '-BoxAB_Pais').hide();
            Ext.getCmp(prototype.id + '-radioButton').hide();
            Ext.getCmp(prototype.id + '-BoxAB_Pais_ONE').show();

            Ext.getCmp(prototype.id + '-chkMonth_label').setText('Three Columns View');

            this.loadTotalControlTotal_Abnormal_Country_ONE()
        }

    },
    DD_BYAGENT_colHandler: function (obj, rb_new, rb_old, func) {


        if (obj !== 'XXX') {
//            console.log('Falta');

        } else {
            var tipo_radio = Ext.getCmp(prototype.id + '-rbgType').rbgType;

            if (tipo_radio === '2') {
                this.loadTotalControlTotal_Abnormal();
            } else {
                this.loadTotalControlTotal_Abnormal_Country();
            }
        }
    },
    loadTotalControlTotal_Agent: function () {

        console.log(' ScrDBIataControlController - loadTotalControlTotal_Agent');

        //meIataCtr.boxActual = 'boxMainDataIataAverageControl';
        //meIataCtr.drillDown.push(meIataCtr.boxActual);        

        this.setFormatParameter();
        win.lblUser_toolTip("Estructura: IMF078");
        Ext.Ajax.request({
            url: prototype.url + '/loadTotalControlTotal_Agent',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: this.searchParams, dw_excel: false},
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
                console.log(response);

                var res = Ext.JSON.decode(response.responseText);
                console.log('if');
                var lstData = res.lstData;
                //console.log(lstData);                
                if (lstData.length > 0) {
                    var bean = lstData[0];
                    Ext.getCmp(prototype.id + '-titFecha6_AG').setText(bean.strDescripcion4);
                    
                    Ext.getCmp(prototype.id + '-titFecha6_AG_2').setText(bean.strDescripcion4);
                    Ext.getCmp(prototype.id + '-titFecha5_AG').setText(bean.strDescripcion3);
                    Ext.getCmp(prototype.id + '-titFecha4_AG').setText(bean.strDescripcion2);
                    Ext.getCmp(prototype.id + '-titFecha3_AG').setText(bean.strDescripcion1);
                    Ext.getCmp(prototype.id + '-titFecha2_AG').setText(bean.strDescripcion);
                    Ext.getCmp(prototype.id + '-titFecha1_AG').setText(bean.strFormatDate4);
                    
                    var storeData = Ext.create('Ext.data.Store', {
                        data: lstData,
                        autoLoad: true
                    });
                    console.log(storeData);
                    Ext.getCmp(prototype.id + '-gridTotal_AG').bindStore(storeData);
                    Ext.getCmp(prototype.id + '-gridTotal_AG_2').bindStore(storeData);
                } else {
                    global.Msg({msg: 'Data not found.'});
                }


            }
        });

//        meIataCtr.dw_excel = false;

    },
});
