"use strict";
exports.__esModule = true;
var React = require("react");
var InputLabel_1 = require("@mui/material/InputLabel");
var MenuItem_1 = require("@mui/material/MenuItem");
var FormControl_1 = require("@mui/material/FormControl");
var Select_1 = require("@mui/material/Select");
var SelectAutoWidth = function (_a) {
    var itemsList = _a.itemsList, setSelectedItem = _a.setSelectedItem, selectedItem = _a.selectedItem, labelTitle = _a.labelTitle;
    var handleChange = function (event) {
        setSelectedItem(event.target.value);
    };
    function generateItemList() {
        var list = Object.entries(itemsList);
        if (list.length <= 0)
            return [];
        return list.map(function (item) {
            return (React.createElement(MenuItem_1["default"], { value: item[1].id }, item[1].name));
        });
    }
    return (React.createElement("div", null,
        React.createElement(FormControl_1["default"], { sx: { m: 1, minWidth: 180 } },
            React.createElement(InputLabel_1["default"], { id: "demo-simple-select-autowidth-label" }, labelTitle),
            React.createElement(Select_1["default"], { labelId: "demo-simple-select-autowidth-label", id: "demo-simple-select-autowidth", value: selectedItem, onChange: handleChange, autoWidth: true, label: labelTitle }, generateItemList()))));
};
exports["default"] = SelectAutoWidth;
