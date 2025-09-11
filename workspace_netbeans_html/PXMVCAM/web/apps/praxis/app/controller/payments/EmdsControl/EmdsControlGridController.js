Ext.define('Ext.Praxis.controller.payments.EmdsControl.EmdsControlGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.EmdsControlGridController',
    afterRender: function (obj, e) {
        const me = this; //call controller
        const view = me.view; // call view design
        this.getData(view);
    },
    getData: async function (view) {
        let store = global.callStorePaggin('PRAXISMP', 'SQP05717', view.searchParams);
//        console.log('stores', store)
        view.bindStore(store);
        this.view.setStore(store);
    },
    downloadExcel: async function(){
        const me = this;
        const view = me.view;
        
        let notifier = new AWN();
//        let params = this.formatParams();
console.table(view.searchParams);
        
        const dwl = async () => {
            const res = await global.callStorePagginExcel('PRAXISMP', 'SQP05717', view.searchParams);
            if (res) {
                let data = res.map(x=>({
                       'Verify': x.CHECK === 1 ? "Yes" : "No",
                       'Client': x.CCUST,
                       'Ticket': x.CCIA + x.FORMA + x.SERIE,
                       'Sequence': x.SEQ,
                       'Correlative': x.CORRL,
                       'Transaction': x.TRNCU,
                       'Code Card': x.SCARDCOD,
                       'Credit Card': x.SCARDN2,
                       'Auth': x.SAUTHOC,
                       'Processing Date': x.PRDA,
                       'Sale Date': x.SDATE,
                       'Reference Number': x.AREFNBR,
                       'Currency': x.MONEDA,
                       'Transaction Amount': x.TGROSAMOUN,
                       'Sale Amount': x.VFOPVTA,
                       'Difference Amount': x.SALDO,
                       'Sale PNR': x.SPNR,
                       'Settlement PNR': x.LPNR,
                       'Type Document': x.TIPOD,
                       'Document': x.TDOC,
                       'Fuente': x.FUENTE_DESC,
                       
                       'Status Robot': x.STBOT_DESC,
                       'Sabre PNR': x.SAPNR,
                       'Amount': x.TOTALRB,
                       'Quantity Tkts': x.QTYRB,
                       'Difference': x.DIFFRB,
                       
                       'User Created': x.USCR,
                       'Date Created': x.FECR,
                       'User Update': x.USUP,
                       'Date Update': x.FEUP
                    }));
                global.writeExcelFromJson(data, 'EMDs control');
            }
        };
        notifier.async(dwl(),'Successfully Download', 'Error on Download', 'Downloading File');
    },
    
    onClickInfo: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {  
        const me = this;
        const obj = record.data;
        
//        let params = {
//            IN_CCUST : obj.CCUST,
//            IN_PRDA : obj.PRDA,
//            IN_TDOC : obj.TDOC,
//            IN_AREFNBR : obj.AREFNBR
//        };
        const dataEntry = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.TransacErrorBPODataEntry', {
            id: prototype.id + '-TransacErrorBPODataEntry-1',
            obj: obj,
//            callback: () => {
//                grid.getStore().load();
//            }
        });
        dataEntry.show();
    },
    saveValidate: async function (view){
        const me = this;
        let success = false;
        let message = "" ;
        let notifier = new AWN();
        
        me.view.setLoading(true);
        
        try {

            // obtener la grilla
            const gridData = Ext.getCmp(prototype.id + '-EmdsControlGrid');
            const storeData = gridData.getStore().getData().items;
    //        console.log('storeData', storeData);

            // Solo los que cambiaron de 0 -> 1
            let dataChanged = storeData
                .filter(x => x.data.CHECK_ORIGIN === 0 && x.data.CHECK === true ) // solo los que cambiaron
                .map(x => ({
                    ...x.data
                })
            );
    //        console.log('dataChanged', dataChanged);

            // Si no hay cambios, avisas y no llamas nada
            if (dataChanged.length === 0) {
                global.Msg({ msg: 'There are no new records for verified', icon: 1 });
                return;
            }

            console.log('Registros modificados:', dataChanged);

            const tmp = await global.loadRecordsOnTable('PRAXISMP', 'XTEMPO', dataChanged);
            console.log('tmp', tmp);
            
             let params = {
                IN_CUUID: tmp.cuuid,
                IN_FUUID: tmp.fuuid
            };
            console.log('params',params);

            const res = await global.callStorePost('PRAXISMP', 'SQP05721', params);
            console.log(res);
            
            success = res.data.lstVals.IO_RESPONSE === 1 ;
            message = res.data.lstVals.IO_MESSAGE ;
            
            if ( success ) {
                notifier.success(message);
            }else{
                notifier.warning('Error: ' + message);        
            }
            
            // Lload search
            this.getData(me.view);
            
            
        } catch (e) {
            notifier.alert('System Error');
        }
        finally {
            me.view.setLoading(false);
        }
        
    }
   
});


