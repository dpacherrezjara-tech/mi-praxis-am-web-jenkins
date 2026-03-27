/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.AgentsMasterFile.DataEntryAgentsMasterFileController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/AgentsMasterFile',
    storeCiudades: {},
    storePaises: {},
    /**
     * Constructor
     */
    init: function (view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var p = this.view.params;
        this.setDataStore();
        global.AccessControlMaganer();
        switch (p.action) {
            case 'I':
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-account-detail').hide();
                Ext.getCmp(prototype.id + '-lblAccountMsg').show();
                break;
            case 'U':
                this.getDataInputs();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-delete').show();
                Ext.getCmp(prototype.id + '-txtA003KEY').setReadOnly(true);
                Ext.getCmp(prototype.id + '-btn-account-detail').show();
                Ext.getCmp(prototype.id + '-lblAccountMsg').hide();
                break;
        }
    },
    setDataStore: function () {
        var p = this.view.params;
        var cboA003CANAL = Ext.getCmp(prototype.id + '-cboA003CANAL');
        cboA003CANAL.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["ARC", "ARC"],
                ["BSP", "BSP"],
                ["ATO", "ATO"],
                ["CTO", "CTO"],
                ["WEB", "WEB"],
                ["GSA", "GSA"],
                ["FRA", "FRA"],
                ["CCT", "CCT"]
            ]
        }));
        cboA003CANAL.setValue("");
        Ext.getCmp(prototype.id + '-cboA003TIPO').setValue("");
        var cboA003PAIS = Ext.getCmp(prototype.id + '-cboA003PAIS');
        cboA003PAIS.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["PX", "Flights"],
                ["CG", "Charge"]
            ]
        }));
        cboA003PAIS.setValue("PX");

        this.storeCiudades = Ext.create('Ext.data.Store', {
            data: p.ciudades,
            autoLoad: true
        });

        this.storePaises = Ext.create('Ext.data.Store', {
            data: p.paises,
            autoLoad: true
        });
    },
    cmbChangeChannel: function (obj) {

        var channel = obj.getValue();
        var cboA003TIPO = Ext.getCmp(prototype.id + '-cboA003TIPO');
        switch (channel) {

            case '':
                cboA003TIPO.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["", "Select"]
                    ]
                }));
                cboA003TIPO.setValue("");
                break;
            case 'ARC':
                cboA003TIPO.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["ARC", "ARC"]
                    ]
                }));
                cboA003TIPO.setValue("ARC");
                break;
            case 'BSP':
                cboA003TIPO.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["BSP", "BSP"]
                    ]
                }));
                cboA003TIPO.setValue("BSP");
                break;
            case 'CTO':
                cboA003TIPO.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["", "Select"],
                        ["CTO", "CTO"],
                        ["ATO", "ATO"],
                        ["FRA", "FRA"],
                        ["INP", "INP"],
                        ["ROB", "ROB"],
                        ["AMP", "AMP"]
                    ]
                }));
                cboA003TIPO.setValue("");
                break;
            case 'ATO':
                cboA003TIPO.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["", "Select"],
                        ["CTO", "CTO"],
                        ["ATO", "ATO"],
                        ["AMP", "AMP"]
                    ]
                }));
                cboA003TIPO.setValue("");
                break;
            case 'GSA':
                cboA003TIPO.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["GSA", "GSA"]
                    ]
                }));
                cboA003TIPO.setValue("GSA");
                break;
            case 'WEB':
                cboA003TIPO.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["WEB", "WEB"]
                    ]
                }));
                cboA003TIPO.setValue("WEB");
                break;
            case 'CCT':
                cboA003TIPO.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["CCT", "CCT"]
                    ]
                }));
                cboA003TIPO.setValue("CCT");
                break;
            case 'FRA':
                cboA003TIPO.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["FRA", "FRA"]
                    ]
                }));
                cboA003TIPO.setValue("FRA");
                break;
        }

    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    getDataInputs: function () {
        var p = this.view.params;
        var data = p.data;
        Ext.getCmp(prototype.id + '-txtA003KEY').setValue(data.A003KEY);
        Ext.getCmp(prototype.id + '-cboA003CANAL').setValue(data.A003CANAL);
        Ext.getCmp(prototype.id + '-cboA003TIPO').setValue(data.A003TIPO);
        Ext.getCmp(prototype.id + '-cboA003PAIS').setValue(data.A003PAIS);
        Ext.getCmp(prototype.id + '-txtA003INDICA').setValue(data.A003INDICA);
        Ext.getCmp(prototype.id + '-txtA003SABCTY').setValue(data.A003SABCTY);
        Ext.getCmp(prototype.id + '-txtA003PSALF').setValue(data.A003PSALF);
        Ext.getCmp(prototype.id + '-txtA003CIUDAD').setValue(data.A003CIUDAD);
        Ext.getCmp(prototype.id + '-txtA003KEY2').setValue(data.A003KEY2);
        Ext.getCmp(prototype.id + '-txtA003KEY3').setValue(data.A003KEY3);
        Ext.getCmp(prototype.id + '-txtA003KEY1').setValue(data.A003KEY1);
        Ext.getCmp(prototype.id + '-txtA003DIREC1').setValue(data.A003DIREC1);
        Ext.getCmp(prototype.id + '-txtA003DIREC2').setValue(data.A003DIREC2);
        Ext.getCmp(prototype.id + '-txtA003IATA').setValue(data.A003IATA);
        Ext.getCmp(prototype.id + '-txtA003DISTRI').setValue(data.A003DISTRI);
        Ext.getCmp(prototype.id + '-txtA003PROVIN').setValue(data.A003PROVIN);
        Ext.getCmp(prototype.id + '-txtA003DEPART').setValue(data.A003DEPART);
        Ext.getCmp(prototype.id + '-txtA003ANEXO').setValue(data.A003ANEXO);
        Ext.getCmp(prototype.id + '-txtA003MAIL').setValue(data.A003MAIL);
        Ext.getCmp(prototype.id + '-txtA003ZIPCOD').setValue(data.A003ZIPCOD);
        Ext.getCmp(prototype.id + '-txtA003TELEF').setValue(data.A003TELEF1 + ' ' + data.A003TELEF2);
        Ext.getCmp(prototype.id + '-txtA003FAX').setValue(data.A003FAX);
        Ext.getCmp(prototype.id + '-txtA003INDI1').setValue(data.A003INDI1);
        Ext.getCmp(prototype.id + '-txtA003OFPRC').setValue(data.A003OFPRC);
        Ext.getCmp(prototype.id + '-txtA003OVERPP').setValue(data.A003OVERPP);
        Ext.getCmp(prototype.id + '-txtA003OVERCL').setValue(data.A003OVERCL);
        Ext.getCmp(prototype.id + '-txtA003OVERNA').setValue(data.A003OVERNA);
        Ext.getCmp(prototype.id + '-txtA003OVERFN').setValue(data.A003OVERFN);
        Ext.getCmp(prototype.id + '-txtA003OVERIN').setValue(data.A003OVERIN);
        Ext.getCmp(prototype.id + '-txtA003OVERFI').setValue(data.A003OVERFI);
        Ext.getCmp(prototype.id + '-txtA003OPERA').setValue(data.A003OPERA);
        Ext.getCmp(prototype.id + '-txtA003FSIST').setValue(data.A003FSIST);
        Ext.getCmp(prototype.id + '-txtA003REPRES').setValue(data.A003REPRES);
        Ext.getCmp(prototype.id + '-txtA003REPCAR').setValue(data.A003REPCAR);
        Ext.getCmp(prototype.id + '-txtA003REPTLF').setValue(data.A003REPTLF);
        Ext.getCmp(prototype.id + '-txtA003CONTA1').setValue(data.A003CONTA1);
        Ext.getCmp(prototype.id + '-txtA003CONTA2').setValue(data.A003CONTA2);
        Ext.getCmp(prototype.id + '-txtA003PROCOD').setValue(data.A003PROCOD);
        Ext.getCmp(prototype.id + '-txtA003PROMOT').setValue(data.A003PROMOT);
        Ext.getCmp(prototype.id + '-txtA003CRMONE').setText(data.A003CRMONE);
        Ext.getCmp(prototype.id + '-txtA003CRLIMI').setValue(data.A003CRLIMI);
        Ext.getCmp(prototype.id + '-txtA003CRDIAS').setValue(data.A003CRDIAS);
        Ext.getCmp(prototype.id + '-txtA003CNACON').setValue(Ext.util.Format.number(data.A003CNACON, '0.00'));
        Ext.getCmp(prototype.id + '-txtA003CNACOF').setValue(Ext.util.Format.number(data.A003CNACOF, '0.00'));
        Ext.getCmp(prototype.id + '-txtA003CINTON').setValue(data.A003CINTON);
        Ext.getCmp(prototype.id + '-txtA003CINTOF').setValue(data.A003CINTOF);
        switch (data.A003STATUS.toUpperCase()) {
            case 'A':
                Ext.getCmp(prototype.id + '-lblA003STATUS').setText('Active');
                break;
            case 'I':
                Ext.getCmp(prototype.id + '-lblA003STATUS').setText('Inactive');
                break;
            default:
                Ext.getCmp(prototype.id + '-lblA003STATUS').setText(data.A003STATUS);
                break;
        }

        Ext.getCmp(prototype.id + '-lblA003INICIO').setText(data.A003INICIO);
        Ext.getCmp(prototype.id + '-lblA003TERMIN').setText(data.A003TERMIN);
        Ext.getCmp(prototype.id + '-txtA003REPORT').setValue(data.A003REPORT == '0' ? '' : data.A003REPORT);
        Ext.getCmp(prototype.id + '-txtA003PERIDE').setValue(data.A003PERIDE == '0' ? '' : data.A003PERIDE);
        Ext.getCmp(prototype.id + '-txtA003PERIA').setValue(data.A003PERIA == '0' ? '' : data.A003PERIA);
        Ext.getCmp(prototype.id + '-txtA003FREMES').setValue(data.A003FREMES == '0' ? '' : data.A003FREMES);
        Ext.getCmp(prototype.id + '-txtA003REMESA').setValue(Ext.util.Format.number(data.A003REMESA, '0.00'));
        Ext.getCmp(prototype.id + '-txtA003COMENT').setValue(data.A003COMENT.trim());
        Ext.getCmp(prototype.id + '-lblA003FIINI1').setText(data.A003FIINI1);
        Ext.getCmp(prototype.id + '-lblA003FITER1').setText(data.A003FITER1);
        Ext.getCmp(prototype.id + '-lblA003FITER1').setText(data.A003FITER1);
        Ext.getCmp(prototype.id + '-txtA003FIANT1').setValue(data.A003FIANT1);
        Ext.getCmp(prototype.id + '-txtA003FIAND1').setValue(data.A003FIAND1);
        Ext.getCmp(prototype.id + '-txtA003FIANM1').setValue(data.A003FIANM1);
        Ext.getCmp(prototype.id + '-txtA003FIANI1').setValue(Ext.util.Format.number(data.A003FIANI1, '0.00'));
        Ext.getCmp(prototype.id + '-txtA003FIANB1').setValue(data.A003FIANB1);
        Ext.getCmp(prototype.id + '-lblA003FIINI2').setText(data.A003FIINI2);
        Ext.getCmp(prototype.id + '-txtA003FIANT2').setValue(data.A003FIANT2);
        Ext.getCmp(prototype.id + '-txtA003FIAND2').setValue(data.A003FIAND2);
        Ext.getCmp(prototype.id + '-txtA003FIANM2').setValue(data.A003FIANM2);
        Ext.getCmp(prototype.id + '-txtA003FIANI2').setValue(Ext.util.Format.number(data.A003FIANI2, '0.00'));
        Ext.getCmp(prototype.id + '-txtA003FIANB2').setValue(data.A003FIANB2);
//        Ext.getCmp(prototype.id + '-txtCIA').setValue(data.A003CTACIA);
//        Ext.getCmp(prototype.id + '-txtUNIDA').setValue(data.A003CTANEG);
//        Ext.getCmp(prototype.id + '-txtCECOS').setValue(data.A003CTACTO);
//        Ext.getCmp(prototype.id + '-txtUBICA').setValue(data.A003CTAUBC);
//        Ext.getCmp(prototype.id + '-txtCTA').setValue(data.A003CTACTA);
//        Ext.getCmp(prototype.id + '-txtSCTA').setValue(data.A003CTASCT);
//        Ext.getCmp(prototype.id + '-txtEQUI').setValue(data.A003CTAEQP);
//        Ext.getCmp(prototype.id + '-txtICIA').setValue(data.A003CTAICI);
        Ext.getCmp(prototype.id + '-txtA003AREA').setValue(data.A003AREA);
        Ext.getCmp(prototype.id + '-txtA003CPROVE').setValue(data.A003CPROVE);
        Ext.getCmp(prototype.id + '-txtA003CCLIEN').setValue(data.A003CCLIEN);
    },
    getDataEntryValues: function (strOption) {


        var A003KEY = Ext.getCmp(prototype.id + '-txtA003KEY').getValue();
        var A003CANAL = Ext.getCmp(prototype.id + '-cboA003CANAL').getValue();
        var A003TIPO = Ext.getCmp(prototype.id + '-cboA003TIPO').getValue();
        var A003PAIS = Ext.getCmp(prototype.id + '-cboA003PAIS').getValue();
        var A003INDICA = Ext.getCmp(prototype.id + '-txtA003INDICA').getValue();
        var A003SABCTY = Ext.getCmp(prototype.id + '-txtA003SABCTY').getValue();
        var A003PSALF = Ext.getCmp(prototype.id + '-txtA003PSALF').getValue();
        var A003CIUDAD = Ext.getCmp(prototype.id + '-txtA003CIUDAD').getValue();
        var A003KEY2 = Ext.getCmp(prototype.id + '-txtA003KEY2').getValue();
        var A003KEY3 = Ext.getCmp(prototype.id + '-txtA003KEY3').getValue();
        var A003KEY1 = Ext.getCmp(prototype.id + '-txtA003KEY1').getValue();
        var A003DIREC1 = Ext.getCmp(prototype.id + '-txtA003DIREC1').getValue();
        var A003DIREC2 = Ext.getCmp(prototype.id + '-txtA003DIREC2').getValue();
        var A003IATA = Ext.getCmp(prototype.id + '-txtA003IATA').getValue().trim() === '' ? Ext.getCmp(prototype.id + '-txtA003KEY').getValue() : Ext.getCmp(prototype.id + '-txtA003IATA').getValue().trim();


        var A003DISTRI = Ext.getCmp(prototype.id + '-txtA003DISTRI').getValue();
        var A003PROVIN = Ext.getCmp(prototype.id + '-txtA003PROVIN').getValue();
        var A003DEPART = Ext.getCmp(prototype.id + '-txtA003DEPART').getValue();
        var A003ANEXO = Ext.getCmp(prototype.id + '-txtA003ANEXO').getValue();
        var A003MAIL = Ext.getCmp(prototype.id + '-txtA003MAIL').getValue();
        var A003ZIPCOD = Ext.getCmp(prototype.id + '-txtA003ZIPCOD').getValue();
        var A003TELEF1 = Ext.getCmp(prototype.id + '-txtA003TELEF').getValue();
        var A003FAX = Ext.getCmp(prototype.id + '-txtA003FAX').getValue();
        var A003INDI1 = Ext.getCmp(prototype.id + '-txtA003INDI1').getValue();
        var A003OFPRC = Ext.getCmp(prototype.id + '-txtA003OFPRC').getValue();
        var A003OVERPP = Ext.getCmp(prototype.id + '-txtA003OVERPP').getValue();
        var A003OVERCL = Ext.getCmp(prototype.id + '-txtA003OVERCL').getValue();
        var A003OVERNA = Ext.getCmp(prototype.id + '-txtA003OVERNA').getValue();


        var A003OVERFN = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA003OVERFN').getValue(), 'Ymd');
        var A003OVERFI = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA003OVERFI').getValue(), 'Ymd');


        var A003OVERIN = Ext.getCmp(prototype.id + '-txtA003OVERIN').getValue();




        var A003OPERA = Ext.getCmp(prototype.id + '-txtA003OPERA').getValue();
        var A003FSIST = Ext.getCmp(prototype.id + '-txtA003FSIST').getValue();
        var A003REPRES = Ext.getCmp(prototype.id + '-txtA003REPRES').getValue();
        var A003REPCAR = Ext.getCmp(prototype.id + '-txtA003REPCAR').getValue();
        var A003REPTLF = Ext.getCmp(prototype.id + '-txtA003REPTLF').getValue();
        var A003CONTA1 = Ext.getCmp(prototype.id + '-txtA003CONTA1').getValue();
        var A003CONTA2 = Ext.getCmp(prototype.id + '-txtA003CONTA2').getValue();
        var A003PROCOD = Ext.getCmp(prototype.id + '-txtA003PROCOD').getValue();
        var A003PROMOT = Ext.getCmp(prototype.id + '-txtA003PROMOT').getValue();

        var A003CRLIMI = Ext.getCmp(prototype.id + '-txtA003CRLIMI').getValue();
        if (A003CRLIMI.trim() === '') {
            A003CRLIMI = 0;
        }
        var A003CRDIAS = Ext.getCmp(prototype.id + '-txtA003CRDIAS').getValue();
        if (A003CRDIAS.trim() === '') {
            A003CRDIAS = 0;
        }
        var A003CNACON = Ext.getCmp(prototype.id + '-txtA003CNACON').getValue();
        if (A003CNACON.trim() === '') {
            A003CNACON = 0;
        }
        var A003CNACOF = Ext.getCmp(prototype.id + '-txtA003CNACOF').getValue();
        if (A003CNACOF.trim() === '') {
            A003CNACOF = 0;
        }
        var A003CINTON = Ext.getCmp(prototype.id + '-txtA003CINTON').getValue();
        if (A003CINTON.trim() === '') {
            A003CINTON = 0;
        }
        var A003CINTOF = Ext.getCmp(prototype.id + '-txtA003CINTOF').getValue();
        if (A003CINTOF.trim() === '') {
            A003CINTOF = 0;
        }
        var A003REPORT = Ext.getCmp(prototype.id + '-txtA003REPORT').getValue();
        if (A003REPORT === null) {
            A003REPORT = 0;
        } else {
            if (A003REPORT.trim() === '') {
                A003REPORT = 0;
            }
        }

        var A003PERIDE = Ext.getCmp(prototype.id + '-txtA003PERIDE').getValue();
        if (A003PERIDE === null) {
            A003PERIDE = 0;
        } else {
            if (A003PERIDE.trim() === '') {
                A003PERIDE = 0;
            }
        }

        var A003PERIA = Ext.getCmp(prototype.id + '-txtA003PERIA').getValue();
        if (A003PERIA === null) {
            A003PERIA = 0;
        } else {
            if (A003PERIA.trim() === '') {
                A003PERIA = 0;
            }
        }
        var A003FREMES = Ext.getCmp(prototype.id + '-txtA003FREMES').getValue();
        if (A003FREMES === null) {
            A003FREMES = 0;
        } else {
            if (A003FREMES.trim() === '') {
                A003FREMES = 0;
            }
        }
        var A003REMESA = Ext.util.Format.number(Ext.getCmp(prototype.id + '-txtA003REMESA').getValue(), '0');
        if (A003REMESA.trim() === '') {
            A003REMESA = 0;
        }
        var A003COMENT = Ext.getCmp(prototype.id + '-txtA003COMENT').getValue();
        var A003FIANT1 = Ext.getCmp(prototype.id + '-txtA003FIANT1').getValue();
        var A003FIAND1 = Ext.getCmp(prototype.id + '-txtA003FIAND1').getValue();
        var A003FIANM1 = Ext.getCmp(prototype.id + '-txtA003FIANM1').getValue();

        var A003FIANI1 = Ext.getCmp(prototype.id + '-txtA003FIANI1').getValue();
        if (A003FIANI1.trim() === '') {
            A003FIANI1 = 0;
        }
        var A003FIANB1 = Ext.getCmp(prototype.id + '-txtA003FIANB1').getValue();
        var A003FIANT2 = Ext.getCmp(prototype.id + '-txtA003FIANT2').getValue();
        var A003FIAND2 = Ext.getCmp(prototype.id + '-txtA003FIAND2').getValue();
        var A003FIANM2 = Ext.getCmp(prototype.id + '-txtA003FIANM2').getValue();
        var A003FIANI2 = Ext.getCmp(prototype.id + '-txtA003FIANI2').getValue();
        if (A003FIANI2.trim() === '') {
            A003FIANI2 = 0;
        }
        var A003FIANB2 = Ext.getCmp(prototype.id + '-txtA003FIANB2').getValue();
//        var A003CTACIA = Ext.getCmp(prototype.id + '-txtCIA').getValue();
//        var A003CTANEG = Ext.getCmp(prototype.id + '-txtUNIDA').getValue();
//        var A003CTACTO = Ext.getCmp(prototype.id + '-txtCECOS').getValue();
//        var A003CTAUBC = Ext.getCmp(prototype.id + '-txtUBICA').getValue();
//        var A003CTACTA = Ext.getCmp(prototype.id + '-txtCTA').getValue();
//        var A003CTASCT = Ext.getCmp(prototype.id + '-txtSCTA').getValue();
//        var A003CTAEQP = Ext.getCmp(prototype.id + '-txtEQUI').getValue();
//        var A003CTAICI = Ext.getCmp(prototype.id + '-txtICIA').getValue();
        var A003AREA = Ext.getCmp(prototype.id + '-txtA003AREA').getValue();
        var A003CPROVE = Ext.getCmp(prototype.id + '-txtA003CPROVE').getValue();
        var A003CCLIEN = Ext.getCmp(prototype.id + '-txtA003CCLIEN').getValue();
        return {
            strOption: strOption,
            A003KEY: A003KEY,
            A003CANAL: A003CANAL,
            A003TIPO: A003TIPO,
            A003PAIS: A003PAIS,
            A003INDICA: A003INDICA,
            A003SABCTY: A003SABCTY,
            A003PSALF: A003PSALF,
            A003CIUDAD: A003CIUDAD,
            A003KEY2: A003KEY2,
            A003KEY3: A003KEY3,
            A003KEY1: A003KEY1,
            A003DIREC1: A003DIREC1,
            A003DIREC2: A003DIREC2,
            A003IATA: A003IATA,
            A003DISTRI: A003DISTRI,
            A003PROVIN: A003PROVIN,
            A003DEPART: A003DEPART,
            A003ANEXO: A003ANEXO,
            A003MAIL: A003MAIL,
            A003ZIPCOD: A003ZIPCOD,
            A003TELEF1: A003TELEF1,
            A003FAX: A003FAX,
            A003COMENT: A003COMENT,

            A003INDI1: A003INDI1,
            A003OFPRC: A003OFPRC,
            A003OVERPP: A003OVERPP,
            A003OVERCL: A003OVERCL,
            A003OVERNA: A003OVERNA,
            A003OVERFN: A003OVERFN,
            A003OVERIN: A003OVERIN,
            A003OVERFI: A003OVERFI,
            A003OPERA: A003OPERA,
            A003FSIST: A003FSIST,
            A003REPRES: A003REPRES,
            A003REPCAR: A003REPCAR,
            A003REPTLF: A003REPTLF,
            A003CONTA1: A003CONTA1,
            A003CONTA2: A003CONTA2,
            A003PROCOD: A003PROCOD,
            A003PROMOT: A003PROMOT,
            A003CRLIMI: A003CRLIMI,
            A003CRDIAS: A003CRDIAS,
            A003CNACON: A003CNACON,
            A003CNACOF: A003CNACOF,
            A003CINTON: A003CINTON,
            A003CINTOF: A003CINTOF,
            A003REPORT: A003REPORT,
            A003PERIDE: A003PERIDE,
            A003PERIA: A003PERIA,
            A003FREMES: A003FREMES,
            A003REMESA: A003REMESA,

            A003FIANT1: A003FIANT1,
            A003FIAND1: A003FIAND1,
            A003FIANM1: A003FIANM1,
            A003FIANI1: A003FIANI1,
            A003FIANB1: A003FIANB1,
            A003FIANT2: A003FIANT2,
            A003FIAND2: A003FIAND2,
            A003FIANM2: A003FIANM2,
            A003FIANI2: A003FIANI2,
            A003FIANB2: A003FIANB2,
//            A003CTACIA: A003CTACIA,
//            A003CTANEG: A003CTANEG,
//            A003CTACTO: A003CTACTO,
//            A003CTAUBC: A003CTAUBC,
//            A003CTACTA: A003CTACTA,
//            A003CTASCT: A003CTASCT,
//            A003CTAEQP: A003CTAEQP,
//            A003CTAICI: A003CTAICI,
            A003AREA: A003AREA,
            A003CPROVE: A003CPROVE,
            A003CCLIEN: A003CCLIEN
        };
    },
    onSaveClick: function (btn) {

        var strMsg = this.validateForm();

        if (strMsg.trim() !== '') {
            global.Msg({
                msg: strMsg
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to insert?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        this.view.params.action = "I";
                        this.crud();
                    }
                }
            });
        }
    },
    crud: function () {
        var p = this.view.params;
        var strOption = p.action;
        var me = this;

        Ext.Ajax.request({
            url: this.url + '/mantenimiento',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(strOption),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var objRtn = res.objRtn;

                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: 1,
                    fn: function () {
                        if (strOption === 'I') {
                            // Refrescar grid principal
                            Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});

                            // Reabrir DataEntry en modo U con los datos recién guardados
                            var A003KEY = Ext.getCmp(prototype.id + '-txtA003KEY').getValue();
                            Ext.getCmp(prototype.id + '-dataEntry').close();

                            Ext.Ajax.request({
                                url: CONTEXTPATH + '/AgentsMasterFile/searchCompData',
                                method: 'POST',
                                timeout: 60000000,
                                params: {
                                    A003KEY: A003KEY,
                                    action: 'U'
                                },
                                success: function (response2) {
                                    var res2 = Ext.JSON.decode(response2.responseText);
                                    var ciudades = res2.dataCity;
                                    var paises = res2.dataPaises;
                                    var data2 = res2.data;

                                    var win = Ext.create('Ext.Praxis.view.sales.AgentsMasterFileForm.DataEntry', {
                                        id: prototype.id + '-dataEntry',
                                        params: {
                                            action: 'U',
                                            data: data2,
                                            ciudades: ciudades,
                                            paises: paises
                                        }
                                    });
                                    win.show();

                                    // Abrir grid de Account automáticamente luego del render
                                    win.on('afterrender', function () {
                                        var ctrl = win.getController();
                                        setTimeout(function () {
                                            ctrl.onAccountDetailClick(null, true);
                                        }, 300);
                                    }, null, {single: true});
                                }
                            });

                        } else {
                            // U o D: comportamiento normal
                            Ext.getCmp(prototype.id + '-dataEntry').close();
                            Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                        }
                    }
                });
            }
        });
    },
    onUpdateClick: function (btn) {
        //var p = this.view.params;
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to update ?',
            scope: this,
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.view.params.action = "U";

                    this.crud();
                }
            }
        });
    }
    ,
    onDeleteClick: function (btn) {

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.view.params.action = "D";

                    this.crud();
                }
            }
        });
    },
    validateForm: function () {
        var mensaje = "";
        var txtA003KEY = Ext.getCmp(prototype.id + '-txtA003KEY').getValue();
        var cboA003CANAL = Ext.getCmp(prototype.id + '-cboA003CANAL').getValue();
        var cboA003TIPO = Ext.getCmp(prototype.id + '-cboA003TIPO').getValue();
        var txtA003KEY3 = Ext.getCmp(prototype.id + '-txtA003KEY3').getValue();
        var txtA003KEY1 = Ext.getCmp(prototype.id + '-txtA003KEY1').getValue();
        var txtA003PSALF = Ext.getCmp(prototype.id + '-txtA003PSALF').getValue();
        var txtA003CIUDAD = Ext.getCmp(prototype.id + '-txtA003CIUDAD').getValue();
        var txtCECOS = Ext.getCmp(prototype.id + '-txtCECOS').getValue();
        var txtUBICA = Ext.getCmp(prototype.id + '-txtUBICA').getValue();
        var txtA003CIUDAD = Ext.getCmp(prototype.id + '-txtA003CIUDAD').getValue();
        var txtA003PSALF = Ext.getCmp(prototype.id + '-txtA003PSALF').getValue();

        if (txtA003KEY.trim() === '') {
            mensaje = 'Required Field, Code ';
            return mensaje;
        } else if (cboA003CANAL.trim() === '') {
            mensaje = 'Required Field, Channel ';
            return mensaje;
        } else if (cboA003TIPO.trim() === '') {
            mensaje = 'Required Field, Office Type  ';
            return mensaje;
        } else if (txtA003KEY3.trim() === '') {
            mensaje = 'Required Field, Legal Name ';
            return mensaje;
        } else if (txtA003KEY1.trim() === '') {
            mensaje = 'Required Field, Commercial Name  ';
            return mensaje;
        } else if (txtA003PSALF.trim() === '') {
            mensaje = 'Required Field, Country Code ';
            return mensaje;
        } else if (txtA003CIUDAD.trim() === '') {
            mensaje = 'Required Field, City';
            return mensaje;
        }
        var strPais = "";
        var bfind = false;

        this.storeCiudades.each(function (record) {
            //console.log(record.data);
            if (txtA003CIUDAD === record.data.A1007CIUD) {
                strPais = record.data.A1007PAIS;
                bfind = true;
            }
        });

        if (bfind) {
            if (txtA003PSALF !== strPais) {
                mensaje = 'The City does not belong to the Country you entered (' + txtA003PSALF + ') -> (' + strPais + ')';
                return mensaje;
            }
        } else {
            mensaje = 'The City does not exist';
            return mensaje;
        }


//        if (txtCECOS.trim() === '')
//        {
//            mensaje = 'Required Field, Account: Cost Center';
//            return mensaje;
//        }
//        else if (txtUBICA.trim() === '')
//        {
//            mensaje = 'Required Field, Account: Cost Center';
//            return mensaje;
//        }
        return '';

    },

    onAccountDetailClick: async function (btn, autoOpen) {
        var A003KEY = Ext.getCmp(prototype.id + '-txtA003KEY').getValue();
        var A003PSALF = Ext.getCmp(prototype.id + '-txtA003PSALF').getValue();

        if (A003KEY.trim() === '') {
            global.Msg({msg: 'Required Field, Code'});
            return;
        }
        if (A003PSALF.trim() === '') {
            global.Msg({msg: 'Required Field, Country Code'});
            return;
        }

        var me = this;
        var winMask = Ext.getCmp(prototype.id + '-dataEntry');
        winMask.mask('Loading...');

        try {
            const res = await global.callStorePost(
                    'PRAXIS',
                    'SQP06028',
                    {
                        A003KEY_IN: A003KEY,
                        A003PSALF_IN: A003PSALF
                    }
            );

            winMask.unmask();

            if (!res || !res.data) {
                global.Msg({msg: 'No response'});
                return;
            }

            var records = res.data.lstRs?.[0] || [];
            me.showAccountDetailWindow(records, A003KEY, A003PSALF);

        } catch (e) {
            winMask.unmask();
            global.Msg({msg: 'Error calling SP ' + e});
        }
    },

    showAccountDetailWindow: function (data, A003KEY, A003PSALF) {
        var me = this;
        var existing = Ext.getCmp(prototype.id + '-accountDetailWin');
        if (existing) {
            existing.destroy();
        }

        var store = Ext.create('Ext.data.Store', {
            fields: [
                'A4059KEY', 'A4059PSALF', 'A4059DESDE', 'A4059HASTA',
                'A4059CTAUN', 'A4059CTACC', 'A4059CTAUB',
                'A4059REGIS', 'A4059FREGI', 'A4059HREGI',
                'A4059REVIS', 'A4059FREVI', 'A4059HREVI'
            ],
            data: data
        });

        Ext.create('Ext.window.Window', {
            id: prototype.id + '-accountDetailWin',
            title: 'Account Detail — ' + A003KEY + ' / ' + A003PSALF,
            width: 1030,
            height: 380,
            modal: true,
            resizable: true,
            layout: 'fit',
            items: [
                {
                    xtype: 'grid',
                    id: prototype.id + '-accountGrid',
                    store: store,
                    border: false,
                    columns: [
                        {text: 'Date From', dataIndex: 'A4059DESDE', width: 85, sortable: true, align: 'center'},
                        {text: 'Date To', dataIndex: 'A4059HASTA', width: 85, sortable: true, align: 'center'},
                        {text: 'Unit', dataIndex: 'A4059CTAUN', width: 50, sortable: true, align: 'center'},
                        {text: 'Cost Center', dataIndex: 'A4059CTACC', width: 90, sortable: true, align: 'left'},
                        {text: 'Location', dataIndex: 'A4059CTAUB', width: 75, sortable: true, align: 'center'},
                        {text: 'Registered', dataIndex: 'A4059REGIS', width: 90, sortable: true, align: 'left'},
                        {text: 'Reg. Date', dataIndex: 'A4059FREGI', width: 85, sortable: true, align: 'center'},
                        {text: 'Reg. Hour', dataIndex: 'A4059HREGI', width: 75, sortable: true, align: 'center'},
                        {text: 'Revised', dataIndex: 'A4059REVIS', width: 90, sortable: true, align: 'left'},
                        {text: 'Rev. Date', dataIndex: 'A4059FREVI', width: 85, sortable: true, align: 'center'},
                        {text: 'Rev. Hour', dataIndex: 'A4059HREVI', width: 75, sortable: true, align: 'center'},
                        {
                            text: 'Actions',
                            defaults: {
                                align: 'center',
                                menuDisabled: true,
                                sortable: true

                            },
                            columns: [
                                {text: 'Edit',
                                    xtype: 'actioncolumn',
                                    width: 70,
                                    items: [
                                        {
                                            iconCls: 'prx-icon-edit',
                                            tooltip: 'Edit',
                                            handler: function (grid, rowIndex) {
                                                var rec = grid.getStore().getAt(rowIndex);
                                                me.openAccountForm('U', rec.data, A003KEY, A003PSALF, store);
                                            }
                                        }
                                    ]
                                },
                                {text: 'Del.',
                                    xtype: 'actioncolumn',
                                    width: 70,
                                    items: [
                                        {
                                            iconCls: 'prx-icon-cancel-action',
                                            tooltip: 'Delete',
                                            handler: function (grid, rowIndex) {
                                                var rec = grid.getStore().getAt(rowIndex);
                                                Ext.Msg.show({
                                                    title: '.:PRAXIS:.',
                                                    msg: 'Are you sure to delete this account?',
                                                    buttons: Ext.MessageBox.YESNO,
                                                    icon: Ext.MessageBox.QUESTION,
                                                    scope: me,
                                                    fn: function (btn) {
                                                        if (btn === 'yes') {
                                                            me.crudAccount('D', rec.data, A003KEY, A003PSALF, store);
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                    ],
                    viewConfig: {
                        stripeRows: true,
                        emptyText: '<div style="text-align:center;padding:20px;">No accounts found for this agent.</div>'
                    }
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: 'Add Account',
                            iconCls: 'prx-icon-add',
                            handler: function () {
                                me.openAccountForm('I', null, A003KEY, A003PSALF, store);
                            }
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    items: [
                        '->',
                        {
                            text: 'Close',
                            iconCls: 'prx-icon-cancel',
                            handler: function () {
                                Ext.getCmp(prototype.id + '-accountDetailWin').close();
                            }
                        }
                    ]
                }
            ]
        }).show();
    },

    openAccountForm: function (action, data, A003KEY, A003PSALF, store) {
        var me = this;
        data = data || {};

        var existing = Ext.getCmp(prototype.id + '-accountFormWin');
        if (existing)
            existing.destroy();

        Ext.create('Ext.window.Window', {
            id: prototype.id + '-accountFormWin',
            title: (action === 'I' ? 'Add Account' : 'Edit Account') + ' — ' + A003KEY,
            width: 420,
            height: 340,
            modal: true,
            resizable: false,
            layout: 'fit',
            items: [
                {
                    xtype: 'form',
                    id: prototype.id + '-accountForm',
                    bodyStyle: 'background:#E3EAF9; padding:15px',
                    border: false,
                    defaults: {labelWidth: 100, labelAlign: 'right', width: 360},
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-frmA4059DESDE',
                            fieldLabel: '<strong>Date From</strong>',
                            value: data.A4059DESDE || '',
                            maxLength: 8,
                            enforceMaxLength: true,
                            readOnly: action === 'U'   // clave primaria en edición
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-frmA4059HASTA',
                            fieldLabel: '<strong>Date To</strong>',
                            value: data.A4059HASTA || '',
                            maxLength: 8,
                            enforceMaxLength: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-frmA4059CTAUN',
                            fieldLabel: '<strong>Unit</strong>',
                            value: data.A4059CTAUN || '',
                            maxLength: 2,
                            enforceMaxLength: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-frmA4059CTACC',
                            fieldLabel: '<strong>Cost Center</strong>',
                            value: data.A4059CTACC || '',
                            maxLength: 7,
                            enforceMaxLength: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-frmA4059CTAUB',
                            fieldLabel: '<strong>Location</strong>',
                            value: data.A4059CTAUB || '',
                            maxLength: 4,
                            enforceMaxLength: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-frmA4059REGIS',
                            fieldLabel: '<strong>Registered</strong>',
                            value: data.A4059REGIS || '',
                            maxLength: 10,
                            enforceMaxLength: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-frmA4059FREGI',
                            fieldLabel: '<strong>Reg. Date</strong>',
                            value: data.A4059FREGI || '',
                            maxLength: 8,
                            enforceMaxLength: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-frmA4059HREGI',
                            fieldLabel: '<strong>Reg. Hour</strong>',
                            value: data.A4059HREGI || '',
                            maxLength: 6,
                            enforceMaxLength: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-frmA4059REVIS',
                            fieldLabel: '<strong>Revised</strong>',
                            value: data.A4059REVIS || '',
                            maxLength: 10,
                            enforceMaxLength: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-frmA4059FREVI',
                            fieldLabel: '<strong>Rev. Date</strong>',
                            value: data.A4059FREVI || '',
                            maxLength: 8,
                            enforceMaxLength: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-frmA4059HREVI',
                            fieldLabel: '<strong>Rev. Hour</strong>',
                            value: data.A4059HREVI || '',
                            maxLength: 6,
                            enforceMaxLength: true
                        }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    items: [
                        '->',
                        {
                            text: action === 'I' ? 'Save' : 'Update',
                            iconCls: action === 'I' ? 'prx-icon-save' : 'prx-icon-update',
                            handler: function () {
                                var formData = {
                                    A4059DESDE: Ext.getCmp(prototype.id + '-frmA4059DESDE').getValue(),
                                    A4059HASTA: Ext.getCmp(prototype.id + '-frmA4059HASTA').getValue(),
                                    A4059CTAUN: Ext.getCmp(prototype.id + '-frmA4059CTAUN').getValue(),
                                    A4059CTACC: Ext.getCmp(prototype.id + '-frmA4059CTACC').getValue(),
                                    A4059CTAUB: Ext.getCmp(prototype.id + '-frmA4059CTAUB').getValue(),
                                    A4059REGIS: Ext.getCmp(prototype.id + '-frmA4059REGIS').getValue(),
                                    A4059FREGI: Ext.getCmp(prototype.id + '-frmA4059FREGI').getValue(),
                                    A4059HREGI: Ext.getCmp(prototype.id + '-frmA4059HREGI').getValue(),
                                    A4059REVIS: Ext.getCmp(prototype.id + '-frmA4059REVIS').getValue(),
                                    A4059FREVI: Ext.getCmp(prototype.id + '-frmA4059FREVI').getValue(),
                                    A4059HREVI: Ext.getCmp(prototype.id + '-frmA4059HREVI').getValue()
                                };

                                if (formData.A4059DESDE.trim() === '') {
                                    global.Msg({msg: 'Required Field, Date From'});
                                    return;
                                }

                                me.crudAccount(action, formData, A003KEY, A003PSALF, store);
                            }
                        },
                        {
                            text: 'Cancel',
                            iconCls: 'prx-icon-cancel',
                            handler: function () {
                                Ext.getCmp(prototype.id + '-accountFormWin').close();
                            }
                        }
                    ]
                }
            ]
        }).show();
    },

    crudAccount: async function (action, data, A003KEY, A003PSALF, store) {
        var me = this;
        var winMask = Ext.getCmp(prototype.id + '-accountDetailWin');
        winMask.mask('Loading...');

        try {
            const res = await global.callStorePost(
                    'PRAXIS',
                    'MPS598',
                    {
                        A4059KEY_IN: A003KEY,
                        A4059PSALF_IN: A003PSALF,
                        A4059DESDE_IN: data.A4059DESDE || '',
                        A4059HASTA_IN: data.A4059HASTA || '',
                        A4059CTAUN_IN: data.A4059CTAUN || '',
                        A4059CTACC_IN: data.A4059CTACC || '',
                        A4059CTAUB_IN: data.A4059CTAUB || '',
                        A4059REGIS_IN: data.A4059REGIS || '',
                        A4059FREGI_IN: data.A4059FREGI || '',
                        A4059HREGI_IN: data.A4059HREGI || '',
                        A4059REVIS_IN: data.A4059REVIS || '',
                        A4059FREVI_IN: data.A4059FREVI || '',
                        A4059HREVI_IN: data.A4059HREVI || '',
                        STROPTION_IN: action
                    }
            );

            winMask.unmask();

            if (!res || !res.data) {
                global.Msg({msg: 'No response from MPS598'});
                return;
            }

            var result = res.data.lstRs?.[0]?.[0] || {};
            var isError = result.RESULT === 'E';

            global.Msg({
                msg: result.MESSAGE || (isError ? 'Error processing account.' : 'Operation successful.'),
                icon: isError ? 0 : 1,
                fn: function () {
                    if (!isError) {
                        // Cerrar form y refrescar el store del grid
                        var formWin = Ext.getCmp(prototype.id + '-accountFormWin');
                        if (formWin)
                            formWin.close();

                        // Recargar datos del grid via SQP06028
                        me.refreshAccountGrid(A003KEY, A003PSALF, store);
                    }
                }
            });

        } catch (e) {
            winMask.unmask();
            global.Msg({msg: 'Error calling MPS598: ' + e});
        }

    },

    refreshAccountGrid: async function (A003KEY, A003PSALF, store) {
        var winMask = Ext.getCmp(prototype.id + '-accountDetailWin');  // <-- mask sobre el grid
        winMask.mask('Loading...');
        try {
            const res = await global.callStorePost(
                    'PRAXIS',
                    'SQP06028',
                    {
                        A003KEY_IN: A003KEY,
                        A003PSALF_IN: A003PSALF
                    }
            );
            winMask.unmask();

            var records = res?.data?.lstRs?.[0] || [];
            store.loadData(records);

        } catch (e) {
            winMask.unmask();
            global.Msg({msg: 'Error refreshing accounts: ' + e});
        }
    },

});


