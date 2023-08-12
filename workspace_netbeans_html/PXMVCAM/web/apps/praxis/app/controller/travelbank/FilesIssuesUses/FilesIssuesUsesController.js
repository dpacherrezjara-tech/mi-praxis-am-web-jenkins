/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.travelbank.FilesIssuesUses.FilesIssuesUsesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FilesIssuesUsesController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    fecha: new Date(),
    searchParams: {},
    _path: '',
    // </editor-fold>
    init: function ( ) {
        // <editor-fold defaultstate="collapsed" desc="prototype">
        //prototype.id01 = 'FilesIssuesUsesForm';
        prototype.url = CONTEXTPATH + '/FilesIssuesUses';
        prototype.widthContenedor = 1300;
        prototype.widthGrid = 863;
        // </editor-fold>
        this.control({
        });
    },
    afterRender: function () {
        //default
        var panel = Ext.getCmp(prototype.id01 + '-conten-panel');
        panel.removeAll();
        var gridPanel = Ext.create({
            xtype: prototype.id02 + '-formFileIssue'
        });
        panel.add(gridPanel);
    }
});
