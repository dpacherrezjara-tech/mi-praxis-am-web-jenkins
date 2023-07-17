/*
 * @Dvicente
 */
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
    },
    getFareCalc: async function () {
        let me = this;
        let body = this.view.params.body;
        let response = await this.getFetchAsync(me.urlWin + '/getRftxFc', body);
        if (response.success) {
            me.objFC = response.data;
        } else {
            global.Msg({
                msg: 'Not Found'
            });
            me.view.close();
        }

    },
    showFareCalc: function () {
        let fareCalc = '';
        let obj = this.objFC;
        if (obj.length > 0) {
            obj.forEach(x => {
                fareCalc += x.A4376FRCA || '';
            });
            Ext.getCmp(prototype.idRftxFareCalc + '-det-TktFareCalc').setValue(fareCalc);

            Ext.getCmp(prototype.idRftxFareCalc + '-winDataEntryFareCalcRftx').unmask();
        }
    },
    onClickCancel: function (btn) {
        this.view.close();
    },
    //<editor-fold defaultstate="collapsed" desc="FETCH">
    getFetchAsync: async function (url, params, method = 'GET') {
        let reqUrl = '';
        let options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let ready = true;
        switch (method) {
            case 'GET':
                reqUrl = url;
                if (params !== null && params !== undefined) {
                    reqUrl = reqUrl + '?' + new URLSearchParams(params);
                }
                break;
            case 'DELETE':
                reqUrl = url;
                if (params !== null && params !== undefined) {
                    reqUrl = reqUrl + '?' + new URLSearchParams(params);
                } else {
                    ready = false;
                }
                break;
            case 'POST':
            case 'PUT':
                reqUrl = url;
                if (params === null && params === undefined) {
                    console.log('Method POST or PUT without Body');
                    ready = false;
                }
                options = {
                    body: JSON.stringify(params),
                    ...options
                };
                break;
            default :
                ready = false;
        }

        if (url !== '' && ready) {
            return await fetch(reqUrl, options).then(async res => {
                let resObj;
                switch (res.status) {
                    case 200:
                        resObj = await res.json();
                        return {success: true, data: resObj};
                        break;
                    case 204:
                        return {success: false};
                        break;
                    default:
                        console.error('Error en endpoint =>' + url);
                        return {success: false};
                }
            }).catch(err => {
                console.log('Error en request. ', err);
                return {success: false};
            });
        }
        return {success: false};
    }
    //</editor-fold>
});

