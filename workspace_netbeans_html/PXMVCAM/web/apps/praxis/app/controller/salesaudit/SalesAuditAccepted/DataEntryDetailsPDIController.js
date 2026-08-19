
Ext.define('Ext.Praxis.controller.salesaudit.SalesAuditAccepted.DataEntryDetailsPDIController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryDetailsPDIController',
    BeanDelivery: {},
    urlWin01: CONTEXTPATH + '/SalesAuditAccepted',
    init: function (view) {
        var me = this;
        //this.urlWin01 = Ext.String.trim(this.view.params.url01);
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        // console.log('pdi render')
        // this.cargaDatos();
        this.getData();
    },
    cargaDatos: function () {
        var me = this;
        var vl_A1672FPROC = '';
        rec = me.view.params.rec;
        if (rec.data.A1672FPROC !== '') {
            vl_A1672FPROC = "20" + rec.data.A1672FPROC.substring(7, 5) + "" + win.getMonthAbbreviation(rec.data.A1672FPROC.substring(2, 5)) + "" + rec.data.A1672FPROC.substring(0, 2);
        }
        //console.log(win.getMonthAbbreviation(rec.data.A1672FPROC.substring(2, 5)));
        //09OCT20  win.getAbreviaturaMes()
        /*var mask = new Ext.LoadMask(Ext.getCmp(prototype.id0 + '-form'), {
         msg: 'Please Wait....'
         });
         mask.show();*/
        Ext.Ajax.request({
            url: me.urlWin01 + '/searchPDI',
            params: {
                VL_FPROC: vl_A1672FPROC,//rec.data.A1672FPROC,
                VL_TKT: rec.data.A1672CCUST + "" + rec.data.A1672FORMA + "" + rec.data.A1672SERIE + "" + rec.data.A1672SEQ,
                VL_TRNCU: rec.data.A1672TRNCU
            },
            success: function (records, operation, success) {
                //mask.hide();
                var contenido = '';
                var res = Ext.decode(records.responseText);
                //console.log(res.data);
                if (res.success) {
                    var resultByte = res.data;
                    var bytes = new Uint8Array(resultByte);
                    var blob = new Blob([bytes], { type: "application/png" });
                    var reader = new FileReader();//let reader = new FileReader();

                    reader.onload = function () {
                        me.callbackText(reader.result);
                    }

                    reader.readAsText(blob, 'ISO-8859-1');

                } else {
                    global.Msg({
                        msg: "Data not found.", icon: 2, fn: function () {
                        }
                    });
                }
            }
        });
    },
    callbackText: function (resultHtml) {
        document.getElementById("content-contenido_html").innerHTML = resultHtml;
        var text = $('.TextoSimple1').text();
        //console.log('dato',text);

        var template = new Ext.XTemplate(
            '<tpl for=".">',
            '<pre style="width: 100%; height: 100%; font-size: 11px !important;">',
            '<code data-language="shell">',
            '{code}',
            '</code>',
            '</pre>',
            '</tpl>',
            {
                compiled: true
            }
        );
        template.append(prototype.id8 + '-contenido_html', {
            code: text
        });
        document.getElementById("content-contenido_html").innerHTML = "";
    },

    getData: async function () {
        const me = this;
        // console.log('get data controller pdi', me.view.params.rec.data);
        const { A1672PNR } = me.view.params.rec.data;
        let params = {
            "IN_OPTION": '1',
            "IN_CCUST": '139',
            "IN_DATEFROM": "",
            "IN_DATETO": "",
            "IN_PNR": A1672PNR
        };

        me.dataParams = params;



        me.view.setLoading(true);
        try {
            const grid = Ext.getCmp(prototype.id + '-gridPDI');
            const paging = Ext.getCmp(prototype.id + '-pagingToolbar');
            let store = await global.callStorePaggin('PXSAUDIT', 'SQP05832', params);

            grid.setStore(store);

            if (paging) {
                paging.bindStore(store);
            }

        } catch (e) {
            console.error(e);
        } finally {
            me.view.setLoading(false);
        }
    },

    downloadExcel: async function () {
        const me = this;
        const view = me.view;

        view.setLoading(true);
        try {
            let data = await global.callStorePagginExcel('PXSAUDIT', 'SQP05832', me.dataParams);

            if (data.length === 0) {
                global.Msg({ msg: 'Data not Found' });
                view.setLoading(false);
                return;
            }

            let excel = data.map(x => ({
                'Id': x.ID,
                'Processing Date': x.PRDA,
                'PNR': x.PNR,
                'PNR Sabre': x.PNRAA,
                'Source': x.FUENTE,
                'Sabre Code': x.SRCODE,
                'Process': x.SRTYPE,
                'Sequence': x.RPH,
                'Type': x.TYPE,
                'Description': x.DESCRIP
            }));

            await global.writeExcelFromJson(excel, 'PDI Information');
            view.setLoading(false);

        } catch (e) {
            console.log(e);
            view.setLoading(false);

        }
    },


    onCancelClick: function (btn) {
        this.view.close();
    }
});



