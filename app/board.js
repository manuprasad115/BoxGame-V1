"use strict";
var Edge = (function () {
    function Edge(num) {
        this.status = false;
        this.id = num;
    }
    return Edge;
}());
exports.Edge = Edge;
var Box = (function () {
    function Box(num) {
        this.status = false;
        this.id = num;
    }
    Box.prototype.getEdges = function () {
        var _list = [];
        _list.push(this.top);
        _list.push(this.left);
        _list.push(this.bottom);
        _list.push(this.right);
        return _list;
    };
    Box.prototype.getFilledEdges = function () {
        var _list = [];
        if (this.top.status) {
            _list.push(this.top);
        }
        if (this.left.status) {
            _list.push(this.left);
        }
        if (this.bottom.status) {
            _list.push(this.bottom);
        }
        if (this.right.status) {
            _list.push(this.right);
        }
        return _list;
    };
    Box.prototype.getBlankEdges = function () {
        var _list = [];
        if (!this.top.status) {
            _list.push(this.top);
        }
        if (!this.left.status) {
            _list.push(this.left);
        }
        if (!this.bottom.status) {
            _list.push(this.bottom);
        }
        if (!this.right.status) {
            _list.push(this.right);
        }
        return _list;
    };
    Box.prototype.getNextBlankEdge = function (_edgeId) {
        return this.getBlankEdges().filter(function (x) { return x.id != _edgeId; })[0];
    };
    return Box;
}());
exports.Box = Box;
var Player = (function () {
    function Player() {
        this.name = "";
        this.icon = "";
        this.points = 0;
    }
    return Player;
}());
exports.Player = Player;
//# sourceMappingURL=board.js.map