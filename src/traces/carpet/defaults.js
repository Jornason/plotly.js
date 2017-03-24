/**
* Copyright 2012-2017, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/


'use strict';

var Lib = require('../../lib');
var handleXYDefaults = require('./xy_defaults');
var handleABDefaults = require('./ab_defaults');
var attributes = require('./attributes');
var colorAttrs = require('../../components/color/attributes');

module.exports = function supplyDefaults(traceIn, traceOut, dfltColor, fullLayout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var defaultColor = coerce('color', colorAttrs.defaultLine);
    Lib.coerceFont(coerce, 'font');

    coerce('carpetid');

    handleABDefaults(traceIn, traceOut, fullLayout, coerce, defaultColor);

    if(!traceOut.a || !traceOut.b) {
        traceOut.visible = false;
        return;
    }

    if(traceOut.a.length < 3) {
        traceOut.aaxis.smoothing = 0;
    }

    if(traceOut.b.length < 3) {
        traceOut.baxis.smoothing = 0;
    }

    var len = handleXYDefaults(traceIn, traceOut, coerce);

    if (traceOut._cheater) {
        coerce('cheaterslope');
    }

    if(!len) {
        traceOut.visible = false;
        return;
    }
};
