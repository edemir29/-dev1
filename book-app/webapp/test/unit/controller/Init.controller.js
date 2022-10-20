/*global QUnit*/

sap.ui.define([
	"ZUX_EXP_01/book-app/controller/Init.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Init Controller");

	QUnit.test("I should test the Init controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
