sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/DisplayListItem",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, DisplayListItem, JSONModel, MessageToast, MessageBox) {
        "use strict";

        return Controller.extend("ZUXEXP01.bookapp.controller.Init", {
            onInit: function () {
                this._InitialView();
                
            },

            _InitialView: function() {
                var oViewModel = new JSONModel({
                    newItem: {
                        Id: null,
                        Todo: null,
                        TodoDate: new Date(),
                        CompletionDate: null
                    },
                     itemList: []
                });
                this.getView().setModel(oViewModel, "initialViewModel");
            },
            onCancel: function() {
                if (this._oCreateDialog) {
                    this._oCreateDialog.close();
                }
            },
            onSave: function() {
                var oModel = this.getView().getModel('initialViewModel');
                var aList = oModel.getProperty("/itemList");
                var count = aList.length;
                oModel.setProperty("/newItem/Id", count + 1);
                var oItem = oModel.getProperty("/newItem");
                aList.push(oItem);
                oModel.setProperty("/itemList",aList);
                oModel.setProperty("/newItem", {
                    Id: null,
                    Todo: null,
                    TodoDate: new Date(),
                    CompletionDate: null
                });
                this._oCreateDialog.close();
            },
            onPressCreateItem: function () {
                if (!this._oCreateDialog) {
                    this._oCreateDialog = sap.ui.xmlfragment("ZUXEXP01.bookapp.fragment.CreateTodo", this);
                    this.getView().addDependent(this._oCreateDialog);
                } else {
                    this._oCreateDialog.close();
                }
                this._oCreateDialog.open();
                // var oViewModel = this.getView().getModel("initialViewModel");
                // var aList = oViewModel.getProperty("/itemList");
                // var oNewList = oViewModel.getProperty("/newList");
      
                // aList.push(oNewList);
      
                // oViewModel.setProperty("/itemList", aList);
                // oViewModel.setProperty("/newList", {});
              },

              onDone: function(oEvent) {
                var oObject = oEvent.getSource().getBindingContext('initialViewModel').getObject();
                oObject.CompletionDate = new Date();
                this.byId("listTodo").getModel("initialViewModel").refresh(true);
            },
            onDelete: function(oEvent) {
                var pPath = oEvent.getSource().getBindingContext('initialViewModel').getPath();
                var sId = pPath.split("/");
                this.getView().byId("listTodo");
                var oModel = this.getView().getModel("initialViewModel");
                var oData = oModel.oData.TodoList;
                var removed = oData.splice(sId[2], 1);
                this.byId("listTodo").getModel("initialViewModel").refresh(true);
            }
        });
    });

    