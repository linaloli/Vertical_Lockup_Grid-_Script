var main = function() {
    app.coordinateSystem = CoordinateSystem.ARTBOARDCOORDINATESYSTEM;
    
    try {
        var doc = app.activeDocument; 
    } catch(e) { return; }

    var sel = app.selection[0];
    if (!sel) {
        alert("Select the text frame/path/group and try again.");
        return;
    }
    if (sel.typename === 'TextFrame' && sel.kind === TextType.AREATEXT) {
         sel.convertAreaObjectToPointObject();
    }
    try {
        var topLayer = doc.layers.getByName("Lockup Grid");
        topLayer.visible = true;
        topLayer.locked = false;
    } catch(e) {
        var topLayer = doc.layers.add();
        topLayer.name = "Lockup Grid";
    }
    
    try {
        var left = sel.left;
        var top = sel.top;
        var width = sel.width;
        var height = sel.height;
        var bottom = top - height;
        var rgbCol = new RGBColor();
            rgbCol.red = 232;
            rgbCol.green = 74;
            rgbCol.blue = 255;
        var grayCol = new RGBColor();
            grayCol.red = 211;
            grayCol.green = 211;
            grayCol.blue = 211;
        var third = height / 3;
        var ninth = third / 3;
        var wthird = width / 3;
        doc.selection = null;
        var defColor = doc.defaultFillColor;
        var offset = left - width - 30;
        var dup1 = sel.duplicate();
        dup1.position = [left-width, top];
        dup1.selected = true;
        doc.defaultFillColor = grayCol;
        dup1.move(topLayer, ElementPlacement.PLACEATEND);

        doc.selection = null;
        var dup2 = sel.duplicate();
        dup2.selected = true;
        doc.defaultFillColor = grayCol;
        dup2.move(topLayer, ElementPlacement.PLACEATEND);
        dup2.position = [left+width, top];
        doc.selection = null;
        doc.defaultFillColor - defColor;
        drawGuide(left-width, top, left + width + width, top, doc, rgbCol);
        drawGuide(left-width, top-third, left + width + width, top-third, doc, rgbCol);
        drawGuide(left-width, top-(2*third), left + width + width, top-(2*third), doc, rgbCol);
        drawGuide(offset, bottom, left + width + width + 30, bottom, doc, rgbCol);
        drawGuide(offset, bottom-third, left + width + width + 30, bottom-third, doc, rgbCol);
        drawGuide(offset, bottom-(2*third), left + width + width + 30, bottom-(2*third), doc, rgbCol);
        drawGuide(offset, bottom-height, left + width + width + 30, bottom-height, doc, rgbCol);
        drawGuide(left-width, bottom-ninth, left + width + width, bottom-ninth, doc, rgbCol);
        drawGuide(left-width, bottom-(2 * ninth), left + width + width, bottom-(2 * ninth), doc, rgbCol);
        drawGuide(left-width, bottom-(4 * ninth), left + width + width, bottom-(4 * ninth), doc, rgbCol);
        drawGuide(left-width, bottom-(5 * ninth), left + width + width, bottom-(5 * ninth), doc, rgbCol);
        drawGuide(left-width, bottom-(7 * ninth), left + width + width, bottom-(7 * ninth), doc, rgbCol);
        drawGuide(left-width, bottom-(8 * ninth), left + width + width, bottom-(8 * ninth), doc, rgbCol);
        drawGuide(left, top, left, bottom-height, doc, rgbCol);
        drawGuide(left+wthird, top, left+wthird, bottom-height, doc, rgbCol);
        drawGuide(left+width, top, left+width, bottom-height, doc, rgbCol);
        drawGuide(left+width-wthird, top, left+width-wthird, bottom-height, doc, rgbCol);
        drawTextFrame(doc, offset-15, top, rgbCol, false, 1, third);
        drawTextFrame(doc, offset-15, top-third, rgbCol, false, 2, third);
        drawTextFrame(doc, offset-15, top-third-third, rgbCol, false, 3, third);
        drawTextFrame(doc, offset-15, bottom, rgbCol, false, 1, third);
        drawTextFrame(doc, offset-15, bottom-third, rgbCol, false, 2, third);
        drawTextFrame(doc, offset-15, bottom-third-third, rgbCol, false, 3, third);
        drawTextFrame(doc, left-width, bottom, rgbCol, false, 1, ninth);
        drawTextFrame(doc, left-width, bottom-ninth, rgbCol, false, 2, ninth);
        drawTextFrame(doc, left-width, bottom-(2 * ninth), rgbCol, false, 3, ninth);
        drawTextFrame(doc, left-width, bottom-(3 * ninth), rgbCol, false, 1, ninth);
        drawTextFrame(doc, left-width, bottom-(4 * ninth), rgbCol, false, 2, ninth);
        drawTextFrame(doc, left-width, bottom-(5 * ninth), rgbCol, false, 3, ninth);
        drawTextFrame(doc, left-width, bottom-(6 * ninth), rgbCol, false, 1, ninth);
        drawTextFrame(doc, left-width, bottom-(7 * ninth), rgbCol, false, 2, ninth);
        drawTextFrame(doc, left-width, bottom-(8 * ninth), rgbCol, false, 3, ninth);



        topLayer.locked = true;

    } catch(e) {
        alert("Error drawing guides. Please select a path item, text frame or group: " + e + ' on ' + e.line);
    }

}


var drawTextFrame = function(doc, left, top, color, isSmall, num, height) {
    var tf = doc.textFrames.add();
    tf.contents = num;
    var pt = isSmall ? height / 3 : height / 2;
    //tf.textRange.paragraphAttributes.verticalAlignment = VerticalAlignment.CENTER; // Vertical alignment
    tf.textRange.characterAttributes.size = pt;
    tf.textRange.characterAttributes.fillColor = color;
    tf.position = [left, top - (tf.height/2)];
}


//Source: https://community.adobe.com/t5/illustrator-discussions/a-script-for-creating-guides/m-p/11906968
var drawGuide  = function(x1, y1, x2, y2, aDoc, rgbCol) {
    var _lft = x1;
    var _top = y1;
    var _rgt = x2;
    var _btm = y2;
    var line = aDoc.pathItems.add();
    line.setEntirePath( Array( Array(_lft, _top), Array(_rgt, _btm) ) );
    line.strokeColor = rgbCol;
    line.strokeWidth = 2;
    line.fillColor = rgbCol;

    //line.guides = true;
    return line;
}


main();