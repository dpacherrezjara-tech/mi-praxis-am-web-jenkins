/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Luis Remicio
 */
Ext.define('Ext.Praxis.controller.salesaudit.BsplinkRefundQueryRFND.BsplinkFileViewerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BsplinkFileViewerController',

    beanTMP: {},
    beanDataima: {},
    urlWin01: '',
    urlWin02: '',

    IN_DATE: '',
    IN_COUNTRY: '',
    IN_DOCUMENT: '',

    init: function (view) {
        var me = this;
    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        this.urlWin01 = Ext.String.trim(this.view.params.url01);

        this.getFilesDirectory();
    },

    OnBeforeShow: function () {
        // prototype.id = 'BsplinkFileViewer';
        // prototype.url = CONTEXTPATH + '/BsplinkRefundQueryRFND';
    },

    onCloseClick: function (btn) {
        this.view.close();
    },
    getFilesDirectory: function () {

        var me = this;
        var rec = me.view.params.rec;

        this.IN_DATE = rec.get('A3389FREGI');
        this.IN_COUNTRY = rec.get('A3389PAIS');
        this.IN_DOCUMENT = rec.get('A3389NUMER');

        me.beanTMP.IN_OPTION = 1;
        me.beanTMP.IN_PATH = "";
        // me.beanTMP.IN_PATH = "D:\\PRAXIS_AM_HTML\\PXMVCAM\\web\\resources\\IMGTMPRFND\\";
        me.beanTMP.IN_DATE = this.IN_DATE;
        me.beanTMP.IN_COUNTRY = this.IN_COUNTRY;
        me.beanTMP.IN_DOCUMENT = this.IN_DOCUMENT;

        var panel = Ext.getCmp(prototype.id05 + '-panel-tree');
        panel.removeAll();

        Ext.getCmp(prototype.id05 + '-win').mask('Please Wait....');
        Ext.Ajax.request({
            url: this.urlWin01 + '/GetFilesDirectory',
            method: 'POST',
            timeout: '300000',
            params: me.beanTMP,
            success: function (response, options) {
                Ext.getCmp(prototype.id05 + '-win').unmask();
                var res = Ext.JSON.decode(response.responseText);
                //console.log(res);
                //me.beanDataima.removeAll();
                me.beanDataima = res.data;
                
                //console.log(res.map.files.myArrayList);
                //var data = Ext.JSON.decode(res.data);
                //console.log(data);

                var dataRoot = {text: me.beanTMP.IN_DOCUMENT, filename: '', expanded: true, flag: false, children: []};
                //Ext.Object.each(res.map.files.myArrayList, function (index, value) {
                Ext.Object.each(res.data, function (index, value) {
                  var vd = value.url.split('/');
                    dataRoot.children.push({
                        leaf: true,
                        text: vd[0],//value.map.url,
                        filename: value.url,
                        flag: true
                    });
                });

                var tree = Ext.create('Ext.tree.Panel', {
                    id: prototype.id05 + '-tree-directory',
                    rootVisible: true,
                    root: dataRoot,
                    border: false,
                    useArrows: true,
                    multiSelect: true,
                    scope: this,
                    columns: [
                        {
                            xtype: 'treecolumn',
                            text: '',
                            dataIndex: 'text',
                            flex: 1
                        },
                        {
                            sortable: false,
                            xtype: 'actioncolumn',
                            width: 50,
                            align: 'center',
                            items: [
                                {
                                    iconCls: 'fas fa-file-download',
                                    tooltip: 'Download',
                                    handler: 'OnDownloadFile',
                                    isActionDisabled: 'OnDownloadActionDisabled'
                                }
                            ]
                        }
                    ],
                    listeners: {
                        cellclick: 'OnTreeItemClick'
                    },
                    viewConfig: {
                        stripeRows: true,
                        enableTextSelection: true,
                        markDirty: true,
                        getRowClass: function (record, rowIndex, rowParams, store) {
                            if (rowIndex % 2 == 0)
                                return 'rowA';
                        }
                    }
                });
                panel.add(tree);
                panel.updateLayout();
            }
        });
    },

    OnTreeItemClick: function (obj, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;
        //console.log(record.get('filename'));
        if (cellIndex === 0) {
            /* console.log(me.beanDataima);
             for (var i = 0; i < me.beanDataima.length; i++) {
             console.log(me.beanDataima[i]);
             }*/

            if (record.get('filename') !== '') {
                var extensionFile = Ext.util.Format.lowercase(record.get('filename').split('.').pop());
                var panel = Ext.getCmp(prototype.id05 + '-panel-viewer');
                panel.removeAll();
                if (extensionFile === 'jpg' || extensionFile === 'png' || extensionFile === 'jpge') {
                    panel.update('<div id="' + prototype.id05 + '-imageViewerContainer" style="width: 768px; height: 575px;" ></div>');

                    // /resources
                    var curect_file_path = record.get('filename');//CONTEXTPATH + "/IMGTMPRFND/" + this.IN_DATE + "/" + this.IN_COUNTRY + "/" + this.IN_DOCUMENT + "/" + record.get('filename');
                    $("#" + prototype.id05 + "-imageViewerContainer").verySimpleImageViewer({
                        imageSource: curect_file_path,
                        frame: ['100%', '100%'],
                        maxZoom: '900%',
                        zoomFactor: '10%',
                        mouse: true,
                        keyboard: true,
                        toolbar: true,
                        rotateToolbar: true
                    });
                } else if (extensionFile === 'pdf') {
                    // /resources
                    var curect_file_path = record.get('filename');//CONTEXTPATH + "/IMGTMPRFND/" + this.IN_DATE + "/" + this.IN_COUNTRY + "/" + this.IN_DOCUMENT + "/" + record.get('filename');
                    var htmlPdf = '<object data="' + curect_file_path + '" style="width: 768px; height: 575px;" type="application/pdf">' +
                            '<embed src="' + curect_file_path + '"  style="width: 768px; height: 575px;" type="application/pdf" />' +
                            '</object>';
                    panel.update(htmlPdf);
                } else {
                    panel.update('<div id="' + prototype.id + '-imageViewerContainer" style="width: 768px; height: 575px; display: flex; justify-content:center; align-items: center;" ><span style="font-size: 24px;">Preview not available.</span></div>');
                }
            }
        }
    },

    OnDownloadFile: function (grid, rowIndex, colIndex) {
        //console.log(rowIndex);
        var record = grid.getStore().getAt(rowIndex);
        // /resources
       //console.log(record.data.filename);
        window.open(record.data.filename, '_blank');
    },

    OnDownloadActionDisabled: function (view, rowIndex, colIndex, item, record) {
        return !record.get('flag') ? true : false;
    },

});