
Ext.define('Ext.Praxis.controller.payments.BPOControlAnalytics.DataEntryLogRankingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryLogRankingController',
    init: function (view) {
    },
    afterRender: async function () {
        const me = this;
        me.view.setLoading(true);
        await this.getData();
        me.view.setLoading(false);
    },
    getData: async function () {
        const me = this;
        console.log('me get data', me.view.obj);
        
//         const data = me.view.obj ;
//         const params = {
//             IN_IDREC : data.IDREC ,
//             IN_CCUST : data.CCUST ,
//             IN_CCIA : data.CCIA ,
//             IN_FORMA : data.FORMA ,
//             IN_SERIE : data.SERIE ,
//             IN_SEQ : data.SEQ ,
//             IN_CORRL : data.CORRL ,
//             IN_TDOCVTA : data.TDOCVTA ,
//             IN_SEQROLL : data.SEQROLL ,
//             IN_TDOC : data.TDOC ,
//             IN_PRDA : data.PRDA ,
//             IN_AREFNBR : data.AREFNBR
//         };

//         me.dataNow = params;

//         const grid = Ext.getCmp(prototype.idEmds + '-grid-Detail');
// //        console.log('grid', grid)

//         try {
//             const res = await global.callStoreGet('PRAXISMP', 'SQP05715', params);
// //            console.log('res', res);

//             const response = res.lstRs?.at(0) || {};
// //            console.log('response', response);

//             if (!response || Object.keys(response).length === 0) {
//                 global.Msg({msg: 'Data not Found'});
//                 return;
//             }

//             let store = new Ext.data.Store({data: response});
//             grid.setStore(store);

//         } catch (e) {
//             console.error(e);
//         }

    },

    onCloseClick: function () {
        this.view.close();
    },

    downloadExcelLog: function () {  //modal confirmar descarga
        const me = this;
        const notifier = new AWN();
        notifier.confirm(
                'Download Excel',
                () => {
            me.onDownloadExcel();
        },
                null);
    },

    onDownloadExcel: async function () {
        const me = this;
        const view = me.view;

        view.setLoading(true);
        try {

          
            let notifier = new AWN();
            const dwl = async () => {
                const res = await global.callStoreGet('PRAXISMP', 'SQP05715', me.dataNow);
                if (res.lstRs) {
                    let data = res.lstRs.at(0);
                    if (data.length === 0) {
                        global.Msg({msg: 'No data'});
                    }
                    let excel = data.map(x =>
                        ({
                            'Corrl.'    : x.CORRLANC,
                            'Rfic'      : x.RFICODE,
                            'Rfics'     : x. RFICSUBCO,
                            'Carrier Code' : x.CARRIERCO,
                            'Vendor'    : x.VENDOR,
                            'Type'      : x.EMDTYPE,
                            'Currency'  : x.BASEMDA,
                            'Fare'      : x.BASEPRINCE,
                            'Iva Code'  : x.TAXCODE,
                            'Iva Amount': x.TAXAMOUNT,
                            'Iva Include' : x.TAXINCLUDE_CHECK === 1 ? 'Yes' : 'No',
                            'Fare + Iva': x.TOTATTLPRI,
                            'Airline'   : x.AIRLINCODE,
                            'From'      : x.BOARDPOINT,
                            'To'        : x.OFFPOINT,
                            'Number'    : x.FLIGHTNUM,
                            'Group'     : x.GROUPCODE,
                            'Class'     : x.CLASSOFSER,
                            'Flight Date': x.DEPARTDATE,
                            'Issuance'  : x.BASE_DESCRIPTION,
                            'Passenger Type'  : x.PASSTYPE,
                            'Passenger Number'  : x.NAMENUMBER,
                            'Passenger Name'  : x.PASSENGERN,
                            'Status'    : x.ESTATUS,
                            'Created User': x.REGIS,
                            'Created Date': x.FREGI,
                            'Created Time': x.HREGI,
                            'Updated User': x.REVIS,
                            'Updated Date': x.FREVI,
                            'Updated Time': x.HREVI
                        }));
                    global.writeExcelFromJson(excel, 'Detail EMDs Information');
                    view.setLoading(false);
                }

            };
            notifier.async(dwl(), 'Successfully Download', 'Error on Download', 'Downloading File');

        } catch (e) {
            console.log(e)
            view.setLoading(false);

        }

    }
});
