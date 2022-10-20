/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ZUX_EXP_01/book-app/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
