
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
                            height: 570,
                            padding: '0px 5px 1px 5px',
                            features: [{
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }],
                            columns: {
                                items: [
                                    {
                                        text: 'HOT<br>#',
                                        dataIndex: 'NHOT',
                                        align: 'center',
                                        width: 50,
                                        locked: true
                                    },
                                    {text: 'Country', dataIndex: 'COUNTRY', width: 120, align: 'left', locked: true,
                                        summaryType: function () {                                            
                                            return  'Total HOT`s';
                                        }
                                    },
                                    {text: 'Code', dataIndex: 'COUNTRY_CODE', align: 'center', width: 50, locked: true},
                                    {text: 'Curr.', dataIndex: 'CURR', width: 50, align: 'center', locked: true},
                                    // <editor-fold defaultstate="collapsed" desc="dia1">  
                                    {
                                        text: '', id: prototype.id + '-dia1',
                                        columns: [
                                            {
                                                text: 'Status', dataIndex: 'STATUS1', width: 70, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL1') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL1') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS1') === '' && record.get('FLG1') === 'Y' && record.get('LABEL1') !== 'A' )
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    
                                                    Ext.getCmp(prototype.id + '-dia1').setText(record.get('PRDA1_') + '.-' + record.get('PRDA1'));
                                                    return value; //Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryType: function (records) {
                                                    var i = 0, total = 0, record;
                                                    for (;i < records.length; ++i) {
                                                        record = records[i];
                                                        if (record.get('STATUS1') !== '' && record.get('LABEL1') !== 'R' && record.get('FLG1') !== 'Y')
                                                            total += 1;
                                                    }
                                                    return  Ext.util.Format.number(total, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Issue date', dataIndex: 'ISSUDT1', width: 90, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL1') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL1') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS1') === '' && record.get('FLG1') === 'Y' && record.get('LABEL1') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'SALE', dataIndex: 'SALE1', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL1') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL1') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS1') === '' && record.get('FLG1') === 'Y' && record.get('LABEL1') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'EXCH', dataIndex: 'EXCH1', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL1') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL1') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS1') === '' && record.get('FLG1') === 'Y' && record.get('LABEL1') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'RFND', dataIndex: 'RFND1', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL1') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL1') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS1') === '' && record.get('FLG1') === 'Y' && record.get('LABEL1') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'MEMO', dataIndex: 'MEMO1', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL1') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL1') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS1') === '' && record.get('FLG1') === 'Y' && record.get('LABEL1') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'VOID', dataIndex: 'VOID1', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL1') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL1') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS1') === '' && record.get('FLG1') === 'Y' && record.get('LABEL1') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    // </editor-fold>  
                                    // <editor-fold defaultstate="collapsed" desc="dia2">   
                                    {
                                        text: '', id: prototype.id + '-dia2',
                                        columns: [
                                            {
                                                text: 'Status', dataIndex: 'STATUS2', width: 70, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL2') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL2') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS2') === '' && record.get('FLG2') === 'Y' && record.get('LABEL2') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    Ext.getCmp(prototype.id + '-dia2').setText(record.get('PRDA2_') + '.-' + record.get('PRDA2'));
                                                    return value;
                                                },
                                                summaryType: function (records) {
                                                    var i = 0, total = 0, record;
                                                    for (; i < records.length; ++i) {
                                                        record = records[i];
//                                                        console.log(i);
//                                                        console.log(record.data);
                                                        if (record.get('STATUS2') !== '' && record.get('LABEL2') !== 'R' && record.get('FLG2') !== 'Y')
                                                            total += 1;
                                                    }
                                                    return  Ext.util.Format.number(total, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Issue date', dataIndex: 'ISSUDT2', width: 90, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL2') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL2') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS2') === '' && record.get('FLG2') === 'Y' && record.get('LABEL2') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'SALE', dataIndex: 'SALE2', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL2') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL2') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS2') === '' && record.get('FLG2') === 'Y' && record.get('LABEL2') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'EXCH', dataIndex: 'EXCH2', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL2') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL2') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS2') === '' && record.get('FLG2') === 'Y' && record.get('LABEL2') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'RFND', dataIndex: 'RFND2', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL2') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL2') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS2') === '' && record.get('FLG2') === 'Y' && record.get('LABEL2') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'MEMO', dataIndex: 'MEMO2', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL2') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL2') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS2') === '' && record.get('FLG2') === 'Y' && record.get('LABEL2') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'VOID', dataIndex: 'VOID2', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL2') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL2') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS2') === '' && record.get('FLG2') === 'Y' && record.get('LABEL2') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    // </editor-fold>  
                                    // <editor-fold defaultstate="collapsed" desc="dia3">   
                                    {
                                        text: '', id: prototype.id + '-dia3',
                                        columns: [
                                            {
                                                text: 'Status', dataIndex: 'STATUS3', width: 70, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL3') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL3') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS3') === '' && record.get('FLG3') === 'Y' && record.get('LABEL3') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    Ext.getCmp(prototype.id + '-dia3').setText(record.get('PRDA3_') + '.-' + record.get('PRDA3'));
                                                    return value;
                                                },
                                                summaryType: function (records) {
                                                    var i = 0, total = 0, record;
                                                    for (; i < records.length; ++i) {
                                                        record = records[i];
                                                        if (record.get('STATUS3') !== '' && record.get('LABEL3') !== 'R' && record.get('FLG3') !== 'Y')
                                                            total += 1;
                                                        
                                                    }
                                                    return  Ext.util.Format.number(total, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Issue date', dataIndex: 'ISSUDT3', width: 90, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL3') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL3') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS3') === '' && record.get('FLG3') === 'Y' && record.get('LABEL3') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'SALE', dataIndex: 'SALE3', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL3') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL3') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS3') === '' && record.get('FLG3') === 'Y' && record.get('LABEL3') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'EXCH', dataIndex: 'EXCH3', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL3') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL3') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS3') === '' && record.get('FLG3') === 'Y' && record.get('LABEL3') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'RFND', dataIndex: 'RFND3', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL3') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL3') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS3') === '' && record.get('FLG3') === 'Y' && record.get('LABEL3') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'MEMO', dataIndex: 'MEMO3', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL3') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL3') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS3') === '' && record.get('FLG3') === 'Y' && record.get('LABEL3') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'VOID', dataIndex: 'VOID3', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL3') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL3') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS3') === '' && record.get('FLG3') === 'Y' && record.get('LABEL3') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    // </editor-fold>         
                                    // <editor-fold defaultstate="collapsed" desc="dia4">   
                                    {
                                        text: '', id: prototype.id + '-dia4',
                                        columns: [
                                            {
                                                text: 'Status', dataIndex: 'STATUS4', width: 70, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL4') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL4') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS4') === '' && record.get('FLG4') === 'Y' && record.get('LABEL4') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    Ext.getCmp(prototype.id + '-dia4').setText(record.get('PRDA4_') + '.-' + record.get('PRDA4'));
                                                    return value; //Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryType: function (records) {
                                                    var i = 0, total = 0, record;
                                                    for (; i < records.length; ++i) {
                                                        record = records[i];
                                                        if (record.get('STATUS4') !== '' && record.get('LABEL4') !== 'R' && record.get('FLG4') !== 'Y')
                                                            total += 1;
                                                    }
                                                    return  Ext.util.Format.number(total, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Issue date', dataIndex: 'ISSUDT4', width: 90, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL4') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL4') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS4') === '' && record.get('FLG4') === 'Y' && record.get('LABEL4') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'SALE', dataIndex: 'SALE4', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL4') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL4') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS4') === '' && record.get('FLG4') === 'Y' && record.get('LABEL4') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'EXCH', dataIndex: 'EXCH4', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL4') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL4') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS4') === '' && record.get('FLG4') === 'Y' && record.get('LABEL4') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'RFND', dataIndex: 'RFND4', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL4') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL4') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS4') === '' && record.get('FLG4') === 'Y' && record.get('LABEL4') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'MEMO', dataIndex: 'MEMO4', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL4') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL4') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS4') === '' && record.get('FLG4') === 'Y' && record.get('LABEL4') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'VOID', dataIndex: 'VOID4', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL4') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL4') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS4') === '' && record.get('FLG4') === 'Y' && record.get('LABEL4') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    // </editor-fold>        
                                    // <editor-fold defaultstate="collapsed" desc="dia5">   
                                    {
                                        text: '', id: prototype.id + '-dia5',
                                        columns: [
                                            {
                                                text: 'Status', dataIndex: 'STATUS5', width: 70, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL5') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL5') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS5') === '' && record.get('FLG5') === 'Y' && record.get('LABEL5') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    Ext.getCmp(prototype.id + '-dia5').setText(record.get('PRDA5_') + '.-' + record.get('PRDA5'));
                                                    return value; 
                                                },
                                                summaryType: function (records) {
                                                    var i = 0, total = 0, record;
                                                    for (; i < records.length; ++i) {
                                                        record = records[i];
                                                        if (record.get('STATUS5') !== '' && record.get('LABEL5') !== 'R' && record.get('FLG5') !== 'Y')
                                                            total += 1;
                                                    }
                                                    return  Ext.util.Format.number(total, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Issue date', dataIndex: 'ISSUDT5', width: 90, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL5') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL5') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS5') === '' && record.get('FLG5') === 'Y' && record.get('LABEL5') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'SALE', dataIndex: 'SALE5', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL5') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL5') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS5') === '' && record.get('FLG5') === 'Y' && record.get('LABEL5') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'EXCH', dataIndex: 'EXCH5', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL5') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL5') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS5') === '' && record.get('FLG5') === 'Y' && record.get('LABEL5') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'RFND', dataIndex: 'RFND5', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL5') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL5') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS5') === '' && record.get('FLG5') === 'Y' && record.get('LABEL5') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'MEMO', dataIndex: 'MEMO5', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL5') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL5') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS5') === '' && record.get('FLG5') === 'Y' && record.get('LABEL5') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'VOID', dataIndex: 'VOID5', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL5') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL5') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS5') === '' && record.get('FLG5') === 'Y' && record.get('LABEL5') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    // </editor-fold> 
                                    // <editor-fold defaultstate="collapsed" desc="dia6">   
                                    {
                                        text: '', id: prototype.id + '-dia6',
                                        columns: [
                                            {
                                                text: 'Status', dataIndex: 'STATUS6', width: 70, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL6') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL6') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS6') === '' && record.get('FLG6') === 'Y' && record.get('LABEL6') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    Ext.getCmp(prototype.id + '-dia6').setText(record.get('PRDA6_') + '.-' + record.get('PRDA6'));
                                                    return value;  
                                                },
                                                summaryType: function (records) {
                                                    var i = 0, total = 0, record;
                                                    for (; i < records.length; ++i) {
                                                        record = records[i];
                                                        if (record.get('STATUS6') !== '' && record.get('LABEL6') !== 'R' && record.get('FLG6') !== 'Y')
                                                            total += 1;
                                                    }
                                                    return  Ext.util.Format.number(total, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Issue date', dataIndex: 'ISSUDT6', width: 90, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL6') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL6') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS6') === '' && record.get('FLG6') === 'Y' && record.get('LABEL6') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'SALE', dataIndex: 'SALE6', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL6') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL6') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS6') === '' && record.get('FLG6') === 'Y' && record.get('LABEL6') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'EXCH', dataIndex: 'EXCH6', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL6') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL6') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS6') === '' && record.get('FLG6') === 'Y' && record.get('LABEL6') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'RFND', dataIndex: 'RFND6', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL6') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL6') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS6') === '' && record.get('FLG6') === 'Y' && record.get('LABEL6') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'MEMO', dataIndex: 'MEMO6', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL6') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL6') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS6') === '' && record.get('FLG6') === 'Y' && record.get('LABEL6') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'VOID', dataIndex: 'VOID6', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL6') === 'R')
                                                        metaData.style = 'font-weight:bold;background:#FF0000;color:white;';
                                                    if (record.get('LABEL6') === 'A')
                                                        metaData.style = 'font-weight:bold;background:#5B9BD5;color:white;';
                                                    if (record.get('STATUS6') === '' && record.get('FLG6') === 'Y' && record.get('LABEL6') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    // </editor-fold>    
                                    // <editor-fold defaultstate="collapsed" desc="dia7">   
                                    {
                                        text: '', id: prototype.id + '-dia7',
                                        columns: [
                                            {
                                                text: 'Status', dataIndex: 'STATUS7', width: 70, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL7') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF0000;color:white';
                                                    if (record.get('LABEL7') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:#5B9BD5;color:white';
                                                    if (record.get('STATUS7') === '' && record.get('FLG7') === 'Y' && record.get('LABEL7') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    Ext.getCmp(prototype.id + '-dia7').setText(record.get('PRDA7_') + '.-' + record.get('PRDA7'));
                                                    return value;
                                                },
                                                summaryType: function (records) {
                                                    var i = 0, total = 0, record;
                                                    for (; i < records.length; ++i) {
                                                        record = records[i];
                                                        if (record.get('STATUS7') !== '' && record.get('LABEL7') !== 'R' && record.get('FLG7') !== 'Y')
                                                            total += 1;
                                                    }
                                                    return  Ext.util.Format.number(total, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Issue date', dataIndex: 'ISSUDT7', width: 90, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL7') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF0000;color:white';
                                                    if (record.get('LABEL7') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:#5B9BD5;color:white';
                                                    if (record.get('STATUS7') === '' && record.get('FLG7') === 'Y' && record.get('LABEL7') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'SALE', dataIndex: 'SALE7', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL7') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF0000;color:white';
                                                    if (record.get('LABEL7') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:#5B9BD5;color:white';
                                                    if (record.get('STATUS7') === '' && record.get('FLG7') === 'Y' && record.get('LABEL7') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'EXCH', dataIndex: 'EXCH7', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL7') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF0000;color:white';
                                                    if (record.get('LABEL7') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:#5B9BD5;color:white';
                                                    if (record.get('STATUS7') === '' && record.get('FLG7') === 'Y' && record.get('LABEL7') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'RFND', dataIndex: 'RFND7', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL7') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF0000;color:white';
                                                    if (record.get('LABEL7') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:#5B9BD5;color:white';
                                                    if (record.get('STATUS7') === '' && record.get('FLG7') === 'Y' && record.get('LABEL7') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'MEMO', dataIndex: 'MEMO7', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL7') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF0000;color:white';
                                                    if (record.get('LABEL7') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:#5B9BD5;color:white';
                                                    if (record.get('STATUS7') === '' && record.get('FLG7') === 'Y' && record.get('LABEL7') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'VOID', dataIndex: 'VOID7', width: 60, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    if (record.get('LABEL7') === 'R')
                                                        metaData.style = 'font-weight:bold;background-color:#FF0000;color:white';
                                                    if (record.get('LABEL7') === 'A')
                                                        metaData.style = 'font-weight:bold;background-color:#5B9BD5;color:white';
                                                    if (record.get('STATUS7') === '' && record.get('FLG7') === 'Y' && record.get('LABEL7') !== 'A')
                                                        metaData.style = 'font-weight:bold;background:#8688DB;color:white;';
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
                            },
                            bbar: [
                                {
                                    xtype: 'panel',
                                    padding: 3,
                                    width: '100%',
                                    html: '<label style="background:#FF0000;color:white;padding:10px;line-height:3;">File not reported</label> \n\
\n\<label style="background:#5B9BD5;color:white;padding:10px;line-height:3;">Unscheduled File</label>\n\
\n\<label style="background:#8688DB;color:white;padding:10px;line-height:3;">Currency File not reported</label>'
                                }
                            ]
                        }
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
//                        {
//                            xtype: 'panel',
//                            id: prototype.id + '-pie',
//                            width: 210,
//                            height: 35,
//                            layout: {
//                                type: 'hbox',
//                                pack: 'center'
//                            },
//                            border: true,
//                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
//                            defaults: {
//                                border: true
//                            },
//                            padding: '1px 1px 1px 1px',
//                            items: [
//                                {
//                                    xtype: 'panel',
//                                    id: prototype.id + '-boxPaginacion',
//                                    width: 210,
//                                    border: false,
//                                    items: [
//                                        {
//                                            xtype: 'toolbar',
//                                            cls: 'x-toolbar-pag',
//                                            items: [
//                                                {
//                                                    xtype: 'pagingtoolbar',
//                                                    id: prototype.id + '-paggin',
//                                                    pageSize: 200,
//                                                    border: false,
//                                                    displayInfo: true,
//                                                    hidden: false
//                                                }
//                                            ]
//                                        }
//                                    ]
//                                }
//                            ]
//                        }
                        // </editor-fold>
                    ]
                }
            ]
        }
    ]
});
