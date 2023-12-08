Ext.define('Ext.Praxis.view.screens.Dashboard01Form.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: false,
    margin: '2 0 2 0 ',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            width: prototype.widthContenedor,
            border: false,
            layout: 'vbox',
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-SalesAnalysis_filter',
                    width: prototype.widthContenedor,
                    layout: 'vbox',
                    border: false,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: prototype.widthContenedor,
                            layout: 'hbox',
                            border: true,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                anchor: '100%',
                                padding: '6 0 6 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 70},
                                {
                                    xtype: 'label',
                                    html: '<strong style="color:#000;">Select By : </strong>',
                                    id: prototype.id + '-lblSelec',
                                    align: 'left',
                                    fieldStyle: 'text-align: center;',
//                                    width: 120,
                                    padding: '8px 0px 0px 5px',
                                    hidden: false
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbSelectBy',
                                    fieldStyle: 'text-align:left;',
                                    padding: '5px 20px 0px 0px',
                                    queryMode: 'local',
                                    editable: false,
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    hidden: false,
                                    valueField: 'code',
                                    displayField: 'name',
//                                    emptyText: 'Reception Date',
                                    labelWidth: 100,
                                    width: 140,
                                    listeners: {
                                        change: 'imgSearch_clickHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-cmbSalesRelleno',
                                    width: 'auto',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background-color: #E3EAF9;',
                                    items: [

                                        // <editor-fold defaultstate="collapsed" desc="Combo Date">
                                        {
                                            xtype: 'label',
                                            html: '<strong style="color:#000;">Sales Date</strong>',
                                            align: 'left',
                                            fieldStyle: 'text-align: center;',
                                            padding: '3px 30px 0px 5px',
                                            hidden: false
                                        },
//                                {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'label',
                                            html: 'From:',
                                            fieldStyle: 'text-align: center;',
                                            padding: '3px 7px 0px 0px'
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateFromYear',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            editable: false,
                                            valueField: 'code', displayField: 'name',
                                            width: 75,
                                            typeAhead: true,
                                            listConfig: {maxHeight: 111},
                                            listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        },
                                                change: 'cbxDateFromYear_changeHandler'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateFromMonth',
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            editable: false,
                                            autoSelect: false,
                                            forceSelection: true,
                                            enableKeyEvents: true,
                                            caseSensitive: false,
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            width: 65,
                                            listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        },
                                                change: 'cbxDateFromMonth_changeHandler'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateFromDay',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            editable: true,
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            width: 65,
                                            listConfig: {maxHeight: 111},
                                            hidden: true,
                                            listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        },
                                                change: 'cbxDateFromDay_changeHandler'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'label',
                                            html: 'To:',
                                            fieldStyle: 'text-align: center;',
                                            padding: '3px 7px 0px 0px'
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateToYear',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            editable: false,
                                            valueField: 'code', displayField: 'name',
                                            width: 75,
                                            typeAhead: true,
                                            listConfig: {maxHeight: 111},
                                            listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        }
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateToMonth',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: false,
                                            forceSelection: true,
                                            editable: false,
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            width: 65,
                                            listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        }
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateToDay',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            editable: true,
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            hidden: true,
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            width: 65,
                                            listConfig: {maxHeight: 111},
                                            listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        }
                                            }
                                        },
                                        // </editor-fold>                               
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Top:',
                                            id: prototype.id + '-lblTop',
                                            hidden: true,
                                            padding: '3px 15px 0px 5px',
                                            width: 30
                                        },
                                        {xtype: 'tbspacer', width: 25},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbTop',
                                            queryMode: 'local',
                                            allowBlank: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: false,
//                                    listConfig: {maxHeight: 111},
                                            width: 60,
                                            typeAhead: true,
                                            valueField: 'code',
                                            displayField: 'name',
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Country',
                                            id: prototype.id + '-cmbPais',
                                            fieldStyle: 'text-align: left;',
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            editable: false,
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            hidden: false,
                                            valueField: 'A006PAIS',
                                            displayField: 'A006NOMBRE',
                                            emptyText: 'All',
                                            labelWidth: 55,
                                            width: 270,
                                            anchor: '100%'
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'checkboxfield',
                                            id: prototype.id + '-chkRN',
                                            width: 130,
                                            boxLabel: 'NR Analisys',
                                            inputValue: '1',
                                            listeners: {
                                                change: 'btnSearch_click'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 2},
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Transaction',
                                            id: prototype.id + '-cmbTran',
                                            fieldStyle: 'text-align: left;',
                                            labelAlign: 'center',
                                            queryMode: 'local',
                                            editable: false,
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            hidden: true,
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: 'All',
                                            labelWidth: 74,
                                            width: 150,
                                            anchor: '100%'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-cmbTNUFilters',
                                    width: 'auto',
                                    layout: 'hbox',
                                    hidden: true,
                                    border: false,
                                    bodyStyle: 'background-color: #E3EAF9;',
                                    items: [
//                                        {
//                                            xtype: 'numberfield',
//                                            id: prototype.id + '-periodo',
//                                            labelWidth: 40,
//                                            labelAlign: 'right',
//                                            labelStyle: 'text-align:center',
//                                            fieldLabel: 'Period',
//                                            value: new Date().getFullYear(),
//                                            width: 110,
//                                            listeners: {
//                                                specialkey: function (f, e) {
//                                                    if (e.getKey() === e.ENTER) {
//                                                        // MonthlyAtlBalance.getSearchStore();
//                                                    }
//                                                }
//                                            }
//                                        },
                                        // <editor-fold defaultstate="collapsed" desc="Combo Date">
                                        {
                                            xtype: 'label',
                                            html: 'Sales Date',
                                            align: 'left',
                                            fieldStyle: 'text-align: center;',
                                            padding: '3px 10px 0px 5px',
                                            hidden: false
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateFromYearNTU',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            editable: false,
                                            valueField: 'code', displayField: 'name',
                                            width: 75,
                                            typeAhead: true,
                                            listConfig: {maxHeight: 111},
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateFromMonthNTU',
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            hidden: true,
                                            editable: false,
                                            autoSelect: false,
                                            forceSelection: true,
                                            enableKeyEvents: true,
                                            caseSensitive: false,
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            width: 65,
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', width: 20},
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-cmbFOREFilters',
                                    width: 'auto',
                                    layout: 'hbox',
                                    hidden: true,
                                    border: false,
                                    bodyStyle: 'background-color: #E3EAF9;',
                                    items: [
                                        // <editor-fold defaultstate="collapsed" desc="Combo Date">
                                        {
                                            xtype: 'label',
                                            html: '<strong style="color:#000;">Sales Date</strong>',
                                            align: 'left',
                                            fieldStyle: 'text-align: center;',
                                            padding: '3px 30px 0px 5px',
                                            hidden: false
                                        },
                                        {
                                            xtype: 'label',
                                            html: 'From:',
                                            fieldStyle: 'text-align: center;',
                                            padding: '3px 7px 0px 0px'
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateFromYear_FORE',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            editable: false,
                                            valueField: 'code', displayField: 'name',
                                            width: 75,
                                            typeAhead: true,
                                            listConfig: {maxHeight: 111},
                                            listeners: {
                                                change: 'cbxDateFromYear_changeHandler'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateFromMonth_FORE',
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            editable: false,
                                            autoSelect: false,
                                            forceSelection: true,
                                            enableKeyEvents: true,
                                            caseSensitive: false,
                                            typeAhead: true,
                                            hidden: true,
                                            valueField: 'code', displayField: 'name',
                                            width: 65,
                                            listeners: {
                                                change: 'cbxDateFromMonth_changeHandler'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'label',
                                            html: 'To:',
                                            hidden: true,
                                            fieldStyle: 'text-align: center;',
                                            padding: '3px 7px 0px 0px'
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateToYear_FORE',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            editable: false,
                                            valueField: 'code', displayField: 'name',
                                            width: 75,
                                            hidden: true,
                                            typeAhead: true,
                                            listConfig: {maxHeight: 111},
                                            listeners: {
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateToMonth_FORE',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: false,
                                            forceSelection: true,
                                            editable: false,
                                            typeAhead: true,
                                            hidden: true,
                                            valueField: 'code', displayField: 'name',
                                            width: 65,
                                            listeners: {
                                            }
                                        },
                                        // </editor-fold>
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-previous_FORE1',
                                            iconCls: 'prx-icon-pagination-previous',
                                            tooltip: 'Previous Page',
                                            hidden:true,
                                            listeners: {
                                                click: 'RETRO1'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-previous_FORE2',
                                            iconCls: 'prx-icon-pagination-previous',
                                            tooltip: 'Previous Page',
                                            hidden:true,
                                            listeners: {
                                                click: 'RETRO2'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-next_FORE1',
                                            iconCls: 'prx-icon-pagination-next',
                                            tooltip: 'Next Page',
                                            hidden:true,
                                            listeners: {
                                                click: 'POST1'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-next_FORE2',
                                            iconCls: 'prx-icon-pagination-next',
                                            tooltip: 'Next Page',
                                            hidden:true,
                                            listeners: {
                                                click: 'POST2'
                                            }
                                        },
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-FlownAnalysis_filter',
                    width: prototype.widthContenedor,
                    layout: 'vbox',
                    border: false,
                    hidden: true,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: prototype.widthContenedor,
                            layout: 'hbox',
                            border: true,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                anchor: '100%',
                                padding: '6 0 6 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    html: '<strong style="color:#000;">Select By : </strong>',
                                    //id: prototype.id + '-lblFASelec',
                                    align: 'left',
                                    fieldStyle: 'text-align: center;',
//                                    width: 120,
                                    padding: '8px 0px 0px 5px',
                                    hidden: false
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbFASelectBy',
                                    fieldStyle: 'text-align:left;',
                                    padding: '5px 20px 0px 0px',
                                    queryMode: 'local',
                                    editable: false,
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    hidden: false,
                                    valueField: 'code',
                                    displayField: 'name',
//                                    emptyText: 'Reception Date',
                                    labelWidth: 100,
                                    width: 140,
                                    listeners: {
                                        change: 'imgSearchFA_clickHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 30},
                                // <editor-fold defaultstate="collapsed" desc="Combo Date">
                                {
                                    xtype: 'label',
                                    html: '<strong style="color:#000;">Sales Date</strong>',
                                    align: 'left',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 30px 0px 5px',
                                    hidden: false
                                },
//                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    html: 'From:',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbFADateFromYear',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    //forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 75,
                                    typeAhead: true,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
//                                        focus: function (combo) {
//                                            combo.expand();
//                                        },
                                        change: 'cbxDateFromYear_changeHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbFADateFromMonth',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    autoSelect: false,
                                    //forceSelection: true,
                                    enableKeyEvents: true,
                                    caseSensitive: false,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        },
                                        change: 'cbxDateFromMonth_changeHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbFADateFromDay',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: true,
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    //forceSelection: true,
                                    caseSensitive: false,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listConfig: {maxHeight: 111},
                                    hidden: true,
                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        },
                                        change: 'cbxDateFromDay_changeHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    html: 'To:',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbFADateToYear',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    //forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 75,
                                    typeAhead: true,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbFADateToMonth',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: false,
                                    //forceSelection: true,
                                    editable: false,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbFADateToDay',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: true,
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    //forceSelection: true,
                                    caseSensitive: false,
                                    hidden: true,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        }
                                    }
                                },
                                // </editor-fold>
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Top:',
                                    //id: prototype.id + '-lblFATop',
                                    hidden: true,
                                    padding: '8px 20px 0px 5px',
                                    width: 30
                                },
                                {xtype: 'tbspacer', width: 25},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbFATop',
                                    queryMode: 'local',
                                    allowBlank: false,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    hidden: true,
//                                    listConfig: {maxHeight: 111},
                                    width: 60,
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Country',
                                    id: prototype.id + '-cmbFAPais',
                                    fieldStyle: 'text-align: left;',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    editable: false,
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    hidden: false,
                                    readOnly: true,
                                    valueField: 'A006PAIS',
                                    displayField: 'A006NOMBRE',
                                    emptyText: 'All',
                                    labelWidth: 55,
                                    width: 270,
                                    anchor: '100%'
                                },
                                {xtype: 'tbspacer', width: 20},
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-ScrInterline_filter',
                    width: prototype.widthContenedor,
                    layout: 'vbox',
                    border: false,
                    hidden: true,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: prototype.widthContenedor,
                            layout: 'hbox',
                            border: true,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                anchor: '100%',
                                padding: '6 0 6 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 100},
                                // <editor-fold defaultstate="collapsed" desc="Combo Date">
                                {
                                    xtype: 'label',
                                    html: '<strong style="color:#000;">Billing Date</strong>',
                                    align: 'left',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 30px 0px 5px',
                                    hidden: false
                                },
//                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    html: 'From:',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromYear_INT',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    editable: false,
                                    width: 75,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
                                        change: 'cbxDateFromYear_changeHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromMonth_INT',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listeners: {
                                        change: 'cbxDateFromMonth_changeHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToYear_INT',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 75,
                                    typeAhead: true,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToMonth_INT',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listeners: {
                                    }
                                }
                                // </editor-fold>
                                ,
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    html: 'Periodo:',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbPERNUM_INT',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listeners: {
                                    }
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    html: 'Airline:',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbAirline_INT',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: true,
                                    enableKeyEvents: true,
                                    caseSensitive: false,
                                    valueField: 'A005KEY', displayField: 'A005KEY2',
                                    width: 200,
                                    listeners: {
                                    }
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'checkboxfield',
                                    id: prototype.id + '-cbCollection',
                                    margin: '8 0 0 30',
                                    labelStyle: 'color:#378BCC;',
                                    width: 100,
                                    boxLabel: 'Collection',
                                    inputValue: '1'
                                },
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-ScrEMD_filter',
                    width: prototype.widthContenedor,
                    layout: 'vbox',
                    border: false,
                    hidden: true,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: prototype.widthContenedor,
                            layout: 'hbox',
                            border: true,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                anchor: '100%',
                                padding: '6 0 6 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDate',
//                                    fieldLabel: 'Source Code',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    editable: false,
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    hidden: false,
                                    valueField: 'code',
                                    displayField: 'name',
                                    emptyText: 'Sale Date',
                                    labelWidth: 100,
                                    width: 120,
                                    anchor: '100%',
                                    listeners: {
                                    }
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    html: 'From:',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromYear_EMD',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    editable: false,
                                    width: 75,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
                                        change: 'cbxDateFromYear_changeHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromMonth_EMD',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listeners: {
                                        change: 'cbxDateFromMonth_changeHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromDay_EMD',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listeners: {
                                        change: 'cbxDateFromDay_changeHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    html: 'To:',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToYear_EMD',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 75,
                                    typeAhead: true,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToMonth_EMD',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listeners: {
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToDay_EMD',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listeners: {
                                    }
                                }
                                // </editor-fold>

                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-ScrExpired_filter',
                    width: prototype.widthContenedor,
                    layout: 'vbox',
                    border: false,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: prototype.widthContenedor,
                            layout: 'hbox',
                            border: true,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                anchor: '100%',
                                padding: '6 0 6 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 20},
                                // <editor-fold defaultstate="collapsed" desc="Combo Date">
                                {
                                    xtype: 'label',
                                    html: '<strong style="color:#000;">Sales Date</strong>',
                                    align: 'left',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 30px 0px 5px',
                                    hidden: false
                                },
//                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    html: 'From:',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromYear_EXP',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 75,
                                    typeAhead: true,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        },
                                        change: 'cbxDateFromYear_changeHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromMonth_EXP',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    autoSelect: false,
                                    forceSelection: true,
                                    enableKeyEvents: true,
                                    caseSensitive: false,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        },
                                        change: 'cbxDateFromMonth_changeHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    html: 'To:',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToYear_EXP',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 75,
                                    typeAhead: true,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToMonth_EXP',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: false,
                                    forceSelection: true,
                                    editable: false,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                // </editor-fold>
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Country',
                                    id: prototype.id + '-cmbCountry_EXP',
                                    fieldStyle: 'text-align: left;',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    editable: false,
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    hidden: false,
                                    valueField: 'A006PAIS',
                                    displayField: 'A006NOMBRE',
                                    emptyText: 'All',
                                    labelWidth: 55,
                                    width: 270,
                                    anchor: '100%'
                                },
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-SpaProfitability_filter',
                    width: prototype.widthContenedor,
                    layout: 'vbox',
                    border: false,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: prototype.widthContenedor,
                            layout: 'hbox',
                            border: true,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                anchor: '100%',
                                padding: '6 0 6 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 70},
                                // <editor-fold defaultstate="collapsed" desc="Combo Date">
                                {
                                    xtype: 'label',
                                    html: '<strong style="color:#000;">Invoice Date</strong>',
                                    align: 'left',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 30px 0px 5px',
//                                    hidden: false
                                },
//                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    html: 'From:',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromYear_SPA',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 75,
                                    typeAhead: true,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        },
                                        change: 'cbxDateFromYear_changeHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromMonth_SPA',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    autoSelect: false,
                                    forceSelection: true,
                                    enableKeyEvents: true,
                                    caseSensitive: false,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        },
                                        change: 'cbxDateFromMonth_changeHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    html: 'To:',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToYear_SPA',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 75,
                                    typeAhead: true,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToMonth_SPA',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: false,
                                    forceSelection: true,
                                    editable: false,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        }
                                    }
                                },
                                // </editor-fold>                               
                                {xtype: 'tbspacer', width: 25},
                                {
                                    xtype: 'label',
                                    text: 'Biling Airline:',
                                    hidden: true,
                                    padding: '8px 10px 0px 5px',
                                    width: 95
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbBilling',
                                    queryMode: 'local',
                                    allowBlank: false,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
//                                    listConfig: {maxHeight: 111},
                                    hidden: true,
                                    width: 200,
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                },
                                {xtype: 'tbspacer', width: 25},
                                {
                                    xtype: 'label',
                                    text: 'Source Code:',
                                    hidden: true,
                                    padding: '8px 10px 0px 5px',
                                    width: 95
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbSource',
                                    queryMode: 'local',
                                    allowBlank: false,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
//                                    listConfig: {maxHeight: 111},
                                    hidden: true,
                                    width: 200,
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                },
                                {xtype: 'tbspacer', width: 30},
                            ]
                        },
                        {
                            xtype: 'panel',
                            width: prototype.widthContenedor,
                            layout: 'hbox',
                            border: true,
                            hidden: true,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                anchor: '100%',
                                padding: '6 0 6 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 70},
                                {
                                    xtype: 'label',
                                    text: 'Document Type:',
//                                    hidden: true,
                                    padding: '8px 5px 0px 5px',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDocument',
                                    queryMode: 'local',
                                    allowBlank: false,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
//                                    listConfig: {maxHeight: 111},
                                    width: 120,
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                },
                                {xtype: 'tbspacer', width: 25},
                                {
                                    xtype: 'label',
                                    text: 'Currency:',
//                                    hidden: true,
                                    padding: '8px 10px 0px 5px',
                                    width: 70
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbCurr',
                                    queryMode: 'local',
                                    allowBlank: false,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
//                                    listConfig: {maxHeight: 111},
                                    width: 90,
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                },
                                {xtype: 'tbspacer', width: 25},
                                {
                                    xtype: 'label',
                                    text: 'Top:',
//                                    hidden: true,
                                    padding: '8px 10px 0px 5px',
                                    width: 30
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbTOP1',
                                    queryMode: 'local',
                                    allowBlank: false,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
//                                    listConfig: {maxHeight: 111},
                                    width: 60,
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Ticket:',
//                                    hidden: true,
                                    padding: '8px 10px 0px 5px',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 25},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtTKT',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9/]/,
                                    maxLength: 13,
                                    width: 150,
                                    enableKeyEvents: true,
                                    listeners: {
                                        keypress: 'filterPNR'
                                    }
                                },
//                                {xtype: 'tbspacer', width: 30},
//                                {
//                                    xtype: 'label',
//                                    text: 'SPA:',
//                                    id: prototype.id + '-lblSPA',
////                                    hidden: true,
//                                    padding: '8px 10px 0px 5px',
//                                    width: 50
//                                },
//                                {xtype: 'tbspacer', width: 25},
//                                {
//                                    xtype: 'combo',
//                                    id: prototype.id + '-cmbSPA',
//                                    queryMode: 'local',
//                                    allowBlank: false,
//                                    forceSelection: true,
//                                    selectOnFocus: true,
//                                    caseSensitive: false,
//                                    autoSelect: true,
//                                    editable: false,
////                                    listConfig: {maxHeight: 111},
//                                    width: 60,
//                                    typeAhead: true,
//                                    valueField: 'code',
//                                    displayField: 'name',
//                                    enableKeyEvents: true,
//                                    triggerAction: 'all',
//                                },
//                                {xtype: 'tbspacer', width: 30},
//                                {
//                                    xtype: 'label',
//                                    text: 'View Global:',
////                                    hidden: true,
//                                    padding: '8px 10px 0px 5px',
//                                    width: 120
//                                },
//                                {xtype: 'tbspacer', width: 25},
//                                {
//                                    xtype: 'combo',
//                                    id: prototype.id + '-cmbView',
//                                    queryMode: 'local',
//                                    allowBlank: false,
//                                    forceSelection: true,
//                                    selectOnFocus: true,
//                                    caseSensitive: false,
//                                    autoSelect: true,
//                                    editable: false,
////                                    listConfig: {maxHeight: 111},
//                                    width: 60,
//                                    typeAhead: true,
//                                    valueField: 'code',
//                                    displayField: 'name',
//                                    enableKeyEvents: true,
//                                    triggerAction: 'all',
//                                },
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-byIata_filter',
                    width: prototype.widthContenedor,
                    layout: 'vbox',
                    border: false,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: prototype.widthContenedor,
                            layout: 'hbox',
                            border: true,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                anchor: '100%',
                                padding: '6 0 6 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 70},
//                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    html: 'Year',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromYear_IATA',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 75,
                                    typeAhead: true,
                                    listConfig: {maxHeight: 111},
                                },
                            ]
                        },
                    ]
                },
            ]
        }
    ]
});