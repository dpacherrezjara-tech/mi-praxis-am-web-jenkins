Ext.define('Ext.Praxis.controller.sales.SalesReport.DataEntryFareCalcRftxController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryFareCalcRftxController',
    urlWin: CONTEXTPATH + '/SalesReport',
    objFC: [],
    meDET: '',
    init: function (view) {
         meDET = this;
        //console.log(this.view.params.vl_mda); 
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: async function () {
        Ext.getCmp(prototype.idRftxFareCalc + '-winDataEntryFareCalcRftx').mask('Loading...');
        await this.getFareCalc();
        this.showFareCalc();
        Ext.getCmp(prototype.idRftxFareCalc + '-winDataEntryFareCalcRftx').unmask();
    },
    getFareCalc: async function () {
        let body = this.view.params.body;
        this.objFC =  await fetch(this.urlWin + '/getRftxFc', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            let resObj;
            switch (res.status) {
                case 200:
                    resObj = res.json();
                    break;
                case 204:
                    console.log("Sin contenido");
                    resObj = [];
                    break;
                default :
                    resObj = [];
                    break;
            }
            return resObj;
        }).catch(err => {
            console.error('Error en fetch', err);
            return null;
        });
    },
    showFareCalc:function(){
        let fareCalc = '';
        let obj = this.objFC;
        if(obj.length>0){
            obj.forEach(x=>{
                fareCalc+= x.A4376FRCA || '';
            });
            Ext.getCmp(prototype.idRftxFareCalc + '-det-TktFareCalc').setValue(fareCalc);
        }
    },
    onClickCancel:function(btn){
        this.view.close();
    }
});

