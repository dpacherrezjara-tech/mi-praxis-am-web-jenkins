
Ext.define('Ext.Praxis.view.sales.LoadControlReportForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    align: 'left',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id + '-boxPrincipal',
            layout: {
                type: 'vbox',
                align: 'left'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'left'
            },
            items: [
                {
                    region: 'center',
                    id: prototype.id + '-boxMainData',
                    border: false,
                    width: prototype.widthContenedor,
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'left'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        align: 'left'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="grid">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            columnLines: false,
                            width: '99%',
                            height: 500,
                            padding: '0px 5px 1px 5px',
                            columns: {
                                items: [
                                    {
                                        text: 'HOT<br>#',
                                        dataIndex: 'NHOT',
                                        align: 'center',
                                        width: 50,
                                        locked: true
                                    },
                                    {text: 'Country', dataIndex: 'COUNTRY', width: 120, align: 'left', locked: true},
                                    {text: 'Code', dataIndex: 'COUNTRY_CODE', align: 'center', width: 50, locked: true},
                                    {text: 'Curr.', dataIndex: 'CURR', width: 50, align: 'center', locked: true},
                                    // <editor-fold defaultstate="collapsed" desc="Domingo">  
                                    {
                                        text: '2023DDMM', id: prototype.id + '-dia1',
                                        columns: [
                                            {
                                                text: 'Status', dataIndex: 'STATUS1', width: 70, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL1') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL1') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:#8688DB;';
                                                    Ext.getCmp(prototype.id + '-dia1').setText('dom.- ' + record.get('PRDA1'));
                                                    return value; //Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Issue date', dataIndex: 'ISSUDT1', width: 90, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL1') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL1') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:#8688DB;';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'SALE', dataIndex: 'SALE1', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL1') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL1') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:#8688DB;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'EXCH', dataIndex: 'EXCH1', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL1') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL1') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:#8688DB;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'RFND', dataIndex: 'RFND1', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL1') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL1') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:#8688DB;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'MEMO', dataIndex: 'MEMO1', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL1') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL1') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:#8688DB;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'VOID', dataIndex: 'VOID1', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL1') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL1') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:#8688DB;';

                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    // </editor-fold>  
                                    // <editor-fold defaultstate="collapsed" desc="Lunes">   
                                    {
                                        text: '2023DDMM', id: prototype.id + '-dia2',
                                        columns: [
                                            {
                                                text: 'Status', dataIndex: 'STATUS2', width: 70, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL2') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL2') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    Ext.getCmp(prototype.id + '-dia2').setText('lun. ' + record.get('PRDA2'));
                                                    return value; //Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Issue date', dataIndex: 'ISSUDT2', width: 90, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL2') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL2') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'SALE', dataIndex: 'SALE2', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL2') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL2') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'EXCH', dataIndex: 'EXCH2', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL2') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL2') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'RFND', dataIndex: 'RFND2', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL2') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL2') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'MEMO', dataIndex: 'MEMO2', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL2') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL2') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'VOID', dataIndex: 'VOID2', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL2') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL2') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';

                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    // </editor-fold>  
                                    // <editor-fold defaultstate="collapsed" desc="Martes">   
                                    {
                                        text: '2023DDMM', id: prototype.id + '-dia3',
                                        columns: [
                                            {
                                                text: 'Status', dataIndex: 'STATUS3', width: 70, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL3') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL3') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    Ext.getCmp(prototype.id + '-dia3').setText('mar. ' + record.get('PRDA3'));
                                                    return value; //Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Issue date', dataIndex: 'ISSUDT3', width: 90, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL3') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL3') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'SALE', dataIndex: 'SALE3', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL3') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL3') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'EXCH', dataIndex: 'EXCH3', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL3') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL3') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'RFND', dataIndex: 'RFND3', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL3') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL3') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'MEMO', dataIndex: 'MEMO3', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL3') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL3') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'VOID', dataIndex: 'VOID3', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL3') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL3') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';

                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    // </editor-fold>         
                                    // <editor-fold defaultstate="collapsed" desc="Miercoles">   
                                    {
                                        text: '2023DDMM', id: prototype.id + '-dia4',
                                        columns: [
                                            {
                                                text: 'Status', dataIndex: 'STATUS4', width: 70, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL4') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL4') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    Ext.getCmp(prototype.id + '-dia4').setText('mie. ' + record.get('PRDA4'));
                                                    return value; //Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Issue date', dataIndex: 'ISSUDT4', width: 90, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL4') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL4') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'SALE', dataIndex: 'SALE4', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL4') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL4') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'EXCH', dataIndex: 'EXCH4', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL4') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL4') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'RFND', dataIndex: 'RFND4', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL4') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL4') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'MEMO', dataIndex: 'MEMO4', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL4') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL4') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'VOID', dataIndex: 'VOID4', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL4') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL4') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';

                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    // </editor-fold>        
                                    // <editor-fold defaultstate="collapsed" desc="Juves">   
                                    {
                                        text: '2023DDMM', id: prototype.id + '-dia5',
                                        columns: [
                                            {
                                                text: 'Status', dataIndex: 'STATUS5', width: 70, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL5') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL5') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    Ext.getCmp(prototype.id + '-dia5').setText('jue. ' + record.get('PRDA5'));
                                                    return value; //Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Issue date', dataIndex: 'ISSUDT5', width: 90, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL5') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL5') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'SALE', dataIndex: 'SALE5', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL5') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL5') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'EXCH', dataIndex: 'EXCH5', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL5') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL5') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'RFND', dataIndex: 'RFND5', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL5') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL5') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'MEMO', dataIndex: 'MEMO5', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL5') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL5') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'VOID', dataIndex: 'VOID5', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL5') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL5') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';

                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    // </editor-fold> 
                                    // <editor-fold defaultstate="collapsed" desc="Viernes">   
                                    {
                                        text: '2023DDMM', id: prototype.id + '-dia6',
                                        columns: [
                                            {
                                                text: 'Status', dataIndex: 'STATUS5', width: 70, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL6') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL6') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    Ext.getCmp(prototype.id + '-dia6').setText('vie. ' + record.get('PRDA6'));
                                                    return value; //Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Issue date', dataIndex: 'ISSUDT6', width: 90, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL6') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL6') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'SALE', dataIndex: 'SALE6', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL6') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL6') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'EXCH', dataIndex: 'EXCH6', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL6') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL6') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'RFND', dataIndex: 'RFND6', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL6') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL6') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'MEMO', dataIndex: 'MEMO6', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL6') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL6') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'VOID', dataIndex: 'VOID6', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL6') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL6') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';

                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    // </editor-fold>    
                                    // <editor-fold defaultstate="collapsed" desc="Sabado">   
                                    {
                                        text: '2023DDMM', id: prototype.id + '-dia7',
                                        columns: [
                                            {
                                                text: 'Status', dataIndex: 'STATUS7', width: 70, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL7') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL7') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    Ext.getCmp(prototype.id + '-dia7').setText('sab. ' + record.get('PRDA7'));
                                                    return value; //Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Issue date', dataIndex: 'ISSUDT7', width: 90, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL7') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL7') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'SALE', dataIndex: 'SALE7', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL7') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL7') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'EXCH', dataIndex: 'EXCH7', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL7') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL7') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'RFND', dataIndex: 'RFND7', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL7') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL7') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'MEMO', dataIndex: 'MEMO7', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL7') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL7') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'VOID', dataIndex: 'VOID7', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL7') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF6C37;';
                                                    if (record.get('LABEL7') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:blue;';

                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    }
                                    // </editor-fold>  
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false,
                                getRowClass: function (record, rowIndex, rowParams, store) {
                                    if (rowIndex % 2 === 0)
                                        return 'rowA';
                                }
                            },
                            trackMouseOver: true,
                            scope: this,
                            listeners: {
                                scope: this,
                                afterrender: function (obj) {

                                }
                            }
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            width: 210,
                            height: 35,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            defaults: {
                                border: true
                            },
                            padding: '1px 1px 1px 1px',
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxPaginacion',
                                    width: 210,
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            cls: 'x-toolbar-pag',
                                            items: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    id: prototype.id + '-paggin',
                                                    pageSize: 20,
                                                    border: false,
                                                    displayInfo: true,
                                                    hidden: false
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                        // </editor-fold>
                    ]
                }
            ]
        }
    ]
});
