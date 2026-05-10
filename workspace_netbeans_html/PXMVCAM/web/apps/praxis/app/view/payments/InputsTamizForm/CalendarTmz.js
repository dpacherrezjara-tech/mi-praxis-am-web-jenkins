Ext.define('Ext.Praxis.view.payments.InputsTamizForm.CalendarTmz', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.CalendarTmz',
    height: 650,
    width: 1400,
    layout: 'container',
    align: 'center',
    config: {
        anio: null,
        dataFechas: [],
        diasLaborales: ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'],
        mesesAnual: ['JAN', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        clickCallback: null
    },
    listeners: {
        destroy: function () {
            //Ext.getCmp(prototype.id + '-calendarPanel01').destroy();
            console.log('removido');
        }
    },
    //padding: '10 10 10 10',
    fechas: [],
    initComponent: function () {
        let me = this;
        me.title = `Calendar ${me.anio}`;
        me.actualizarCalendario();
        me.items = [];
        let panel = {
            xtype: 'panel',
            border: false,
            width: 1400,
            id: prototype.id + '-calendarPanel01',
            height: 650,
            layout: 'container',
            items: [
                //<editor-fold defaultstate="collapsed" desc="dias header">
                {
                    xtype: 'panel',
                    id: prototype.id + '-calendarHeader01',
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    width: 1400,
                    height: 32,
                    border: false,
                    bodyStyle: 'background-color:#FFFFFF;',
                    defaults: {
                        xtype: 'label',
                        padding: 5,
                        style: {
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: '#555',
                            fontSize: '11px',
                            letterSpacing: '1px',
                            textTransform: 'uppercase'
                        }
                    },
                    items: [
                        {
                            xtype: 'tbspacer',
                            width: 100
                        },
                        ...me.diasLaborales.map(x => {
                            return{
                                id: prototype.id + '-diaLab-' + x,
                                text: x,
                                flex: 1,
                            }
                        }),
                        {
                            xtype: 'tbspacer',
                            width: 10
                        }
                    ]
                },
                //</editor-fold>
                {
                    xtype: 'panel',
                    id: prototype.id + '-calendarBody01',
                    layout: {
                        type: 'hbox'
                    },
                    width: 1400,
                    height: 548,
                    autoScroll: true,
                    border: false,
                    items: [
                        //<editor-fold defaultstate="collapsed" desc="meses header">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-calendarHeader02',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            width: 100,
                            border: true,
                            bodyStyle: 'background-color:#FFFFFF;',
                            defaults: {
                                xtype: 'label',
                                style: {
                                    textAlign: 'center',
                                    'line-height': '115px',
                                    backgroundColor: 'transparent',
                                    fontWeight: 'bold',
                                    color: '#555',
                                    fontSize: '13px',
                                    letterSpacing: '1px'
                                }
                            },
                            items: me.mesesAnual.map(x => {
                                return {
                                    id: prototype.id + '-mesAnual-' + x,
                                    width: 90,
                                    height: 140,
                                    text: x
                                }
                            })
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="fechas">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-calendarDates01',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            width: 1285,
                            border: true,
                            defaults: {
                                xtype: 'panel',
                                //bodyStyle: 'background-color: #8f9fa2;',
                                //border:false,
                                layout: {
                                    type: 'hbox',
                                    align: 'center'
                                },
                                style: {
                                    textAlign: 'center', // Centro el texto horizontalmente
                                }
                            },
                            items: me.mesesAnual.map((e, index) => {
                                let fechas = [];
                                let contadorInicio = 0;
                                while (contadorInicio < me.fechas[index][0].index) {
                                    let obj = {};
                                    obj.fecha = '';
                                    obj.index = contadorInicio;
                                    obj.rn = contadorInicio;
                                    obj.status = 'none';
                                    fechas.push(obj);
                                    contadorInicio++;
                                }
                                me.fechas[index].forEach(e => {
                                    let y = fechas.at(-1);
                                    e.rn = (y ? y.rn : 0) + 1;
                                    fechas.push(e);
                                });
                                //console.log('contador fin',fechas.at(-1).index);
                                while (fechas.at(-1).index < 7) {
                                    let obj = {};
                                    obj.fecha = '';
                                    obj.rn = (fechas.at(-1).rn || 0) + 1;
                                    obj.index = fechas.at(-1).index + 1;
                                    obj.status = 'none';
                                    fechas.push(obj);
                                }
                                //console.log('fechas contenedor',fechas);
                                let componentes = [];
                                for (let i = 0; i < 7; i++) {
                                    let componente = {
                                        defaults: {
                                            xtype: 'label',
                                            flex: 1,
                                            width: 90,
                                            height: 18,
                                            margin: 2,
                                            style: {
                                                textAlign: 'center'
                                            },
                                        },
                                        items: []
                                    };
                                    let filtrado = fechas.filter(x => x.index === i);
                                    filtrado.forEach(x => {
                                        const statusStyles = {
                                            'OK':                  {bg: '#27ae60', color: '#fff'},
                                            'INCOMPLETE':          {bg: '#f1c40f', color: '#2c3e50'},
                                            'UNSCHEDULED':         {bg: '#2c3e50', color: '#fff'},
                                            'NOT RECEIVED':        {bg: '#e74c3c', color: '#fff'},
                                            'AWAITING SETTLEMENT': {bg: '#95a5a6', color: '#fff'},
                                            'WITH OBSERVATION':    {bg: '#2980b9', color: '#fff'}
                                        };
                                        const sSt = statusStyles[x.status];
                                        const dayNum = x.fecha || '';
                                        const cellHtml = sSt && dayNum
                                            ? `<div title="${x.status}" style="background:${sSt.bg};color:${sSt.color};border-radius:4px;font-size:9px;font-weight:bold;text-align:center;line-height:16px;width:100%;cursor:pointer;">${dayNum}</div>`
                                            : `<div style="text-align:center;line-height:16px;font-size:9px;color:#bdc3c7;">${dayNum}</div>`;
                                        const cellListeners = (sSt && dayNum) ? {
                                            afterrender: function (label) {
                                                label.getEl().on('click', function () {
                                                    me.clickCallback(label);
                                                });
                                            }
                                        } : {};
                                        componente.items.push({
                                            html: cellHtml,
                                            id: prototype.id + `-${!x.procesador ? 'none' : x.procesador}-m${e}-d${x}-f${x.rn}`,
                                            fecha: x.fecha,
                                            procesador: !x.procesador ? 'none' : x.procesador,
                                            listeners: cellListeners
                                        });
                                    });
                                    componentes.push(componente);

                                }
                                //console.log('componentes', componentes);
                                //console.log('index num',index%2===0);
                                return{
                                    id: prototype.id + `-mes-${e}`,
                                    width: 1200,
                                    height: 140,
                                    bodyStyle: index%2===0?'background-color:#ecf0f1;':'background-color:#dfe6e9;',
                                    defaults: {
                                        xtype: 'panel',
                                        flex: 1,
                                        border: false,
                                        layout: {
                                            type: 'vbox',
                                            align: 'center'
                                        },
                                        bodyStyle: 'background-color: transparent;',
                                        height: 135
                                    },
                                    items: componentes
                                }
                            })
                        },
                                //</editor-fold>
                    ]
                },
                {
                    xtype: 'panel',
                    border: false,
                    width: 1400,
                    height: 26,
                    layout: {type: 'hbox', align: 'middle'},
                    bodyStyle: 'background-color:#f8f9fa; padding:0 10px; border-top:1px solid #dee2e6;',
                    defaults: {xtype: 'label', margin: '0 5px 0 0', style: {fontSize: '10px', lineHeight: '18px'}},
                    items: [
                        {html: '<strong style="font-size:10px;color:#555;">Legend:</strong>'},
                        {html: '<span style="background:#27ae60;color:#fff;border-radius:3px;padding:1px 6px;">OK</span>'},
                        {html: '<span style="background:#f1c40f;color:#2c3e50;border-radius:3px;padding:1px 6px;">Incomplete</span>'},
                        {html: '<span style="background:#e74c3c;color:#fff;border-radius:3px;padding:1px 6px;">Not Received</span>'},
                        {html: '<span style="background:#2c3e50;color:#fff;border-radius:3px;padding:1px 6px;">Unscheduled</span>'},
                        {html: '<span style="background:#95a5a6;color:#fff;border-radius:3px;padding:1px 6px;">Awaiting Settlement</span>'},
                        {html: '<span style="background:#2980b9;color:#fff;border-radius:3px;padding:1px 6px;">With Observation</span>'}
                    ]
                }
            ]
        };
        me.items.push(panel);
        me.callParent(arguments);
    },

    actualizarCalendario: function () {
        let me = this;
        const fechasAnio = me.getFechasCalendario(me.anio);
        const fechasProceso = me.dataFechas || [];
        const response = [];
        me.mesesAnual.forEach((e, index) => {
            response[index + 1] = []
        });
        const processorDefault = fechasProceso.length > 0 ? fechasProceso[0].PROCESSOR : '';
        fechasAnio.forEach((element) => {
            let mes = parseInt(element.fecha.substring(4, 6));
            let obj = {};
            obj.fecha = element.fecha;
            obj.index = element.index;
            let fechaProceso = fechasProceso.find(y => y.DAY === element.fecha);
            obj.status = fechaProceso ? fechaProceso.STATUS : 'none';
            obj.procesador = processorDefault;
            response[mes].push(obj);
        });
        me.fechas = response.filter(x => x !== undefined);
    },
    getFechasCalendario: function (anioStr) {
        const anio = parseInt(anioStr);
        const startDate = new Date(anio, 0, 1); // 1 de enero del año
        const endDate = new Date(anio, 11, 31); // 31 de diciembre del año
        const result = [];

        // itera sobre todas las fechas dentro del rango
        for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
            // si el día de la semana no es sábado ni domingo, añade la fecha al resultado
//            if (date.getDay() !== 0 && date.getDay() !== 6) {
//                let fecha = {
//                    fecha: this.convertirFechaStr(new Date(date)),
//                    index: date.getDay()
//                }
//                result.push(fecha);
//            }
            let fecha = {
                fecha: this.convertirFechaStr(new Date(date)),
                index: date.getDay()
            }
            result.push(fecha);
        }
        return result;
    },
    convertirFechaStr: function (fecha) {
        let year = fecha.getFullYear();
        let month = fecha.getMonth() + 1;
        let day = fecha.getDate();

        // Agrega un cero delante del mes y el día si son menores a 10
        month = (month < 10 ? '0' : '') + month;
        day = (day < 10 ? '0' : '') + day;

        // Retorna la fecha en el formato AAAAMMDD
        return '' + year + month + day;
    }
});