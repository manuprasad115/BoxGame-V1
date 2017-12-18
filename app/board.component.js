"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var board_1 = require('./board');
var BoardComponent = (function () {
    function BoardComponent() {
        this.boxsize = 6;
        this.edgeList = [];
        this.boxList = [];
        this.myPlayer = new board_1.Player();
        this.newPlayer = new board_1.Player();
        this.playStart = false;
        this._tmpSeqBoxList = [];
        this.drawBoard();
    }
    BoardComponent.prototype.drawBoard = function () {
        this.myPlayer.id = 1;
        this.myPlayer.name = "Manu";
        this.myPlayer.icon = "M";
        this.myPlayer.nextPlayer = this.newPlayer;
        this.newPlayer.id = 2;
        this.newPlayer.nextPlayer = this.myPlayer;
        this.currentPlayer = this.newPlayer;
        for (var i = 1; i <= this.boxsize; i++) {
            for (var j = 1; j <= this.boxsize; j++) {
                var _box = this.createBox();
                if (i == 1) {
                    _box.top = this.createEdge();
                }
                else {
                    _box.top = this.getBox(i - 1, j).bottom;
                }
                if (j == 1) {
                    _box.left = this.createEdge();
                }
                else {
                    _box.left = this.getBox(i, j - 1).right;
                }
                _box.bottom = this.createEdge();
                _box.right = this.createEdge();
            }
        }
    };
    BoardComponent.prototype.createBox = function () {
        var _b = new board_1.Box(this.boxList.length + 1);
        this.boxList.push(_b);
        return _b;
    };
    BoardComponent.prototype.getBox = function (row, col) {
        var _bId = (row - 1) * this.boxsize + col;
        return this.boxList.find(function (b) { return b.id == _bId; });
    };
    BoardComponent.prototype.createEdge = function () {
        var _e = new board_1.Edge(this.edgeList.length + 1);
        this.edgeList.push(_e);
        return _e;
    };
    BoardComponent.prototype.checkWin = function (_edgeId) {
        var _flag = false;
        var _boxArray = this.boxListByEdgeId(_edgeId);
        for (var index = 0; index < _boxArray.length; index++) {
            var _box = _boxArray[index];
            if (_box.top.status && _box.bottom.status && _box.left.status && _box.right.status) {
                _box.status = true;
                _box.player = this.currentPlayer;
                _flag = true;
            }
        }
        return _flag;
    };
    BoardComponent.prototype.isFirstBox = function (_id) {
        return (_id % this.boxsize) == 1;
    };
    BoardComponent.prototype.setEdge = function (_edge) {
        if (_edge.status) {
            alert("Invalid Move");
        }
        else {
            _edge.status = true;
            if (this.checkWin(_edge.id)) {
                this.currentPlayer.points = this.getPoints(this.currentPlayer);
                if (this.edgeList.filter(function (x) { return (!x.status); }).length < 1) {
                    alert("Game Finished");
                    var _winner = this.currentPlayer.points > this.currentPlayer.nextPlayer.points ? this.currentPlayer : this.currentPlayer.nextPlayer;
                    alert("Congrats " + _winner.name + " you won the game");
                    return;
                }
            }
            else {
                this.currentPlayer = this.currentPlayer.nextPlayer;
            }
            if (this.currentPlayer.id == this.myPlayer.id) {
                this.play();
            }
        }
    };
    BoardComponent.prototype.startGame = function () {
        if (this.newPlayer.name != "" && this.newPlayer.icon != "") {
            this.playStart = true;
        }
        else {
            alert("Enter Player info to start game");
        }
    };
    BoardComponent.prototype.getPoints = function (_player) {
        return (this.boxList.filter(function (x) { return x.status; }).filter(function (b) { return b.player.id == _player.id; }).length);
    };
    BoardComponent.prototype.boxListByEdgeId = function (_edgeId) {
        return this.boxList.filter(function (x) { return x.top.id == _edgeId || x.bottom.id == _edgeId || x.left.id == _edgeId || x.right.id == _edgeId; });
    };
    BoardComponent.prototype.boxListByEdgeIdSeq = function (_edgeId) {
        var _this = this;
        return this.boxListByEdgeId(_edgeId).filter(function (x) { return _this._tmpSeqBoxList.filter(function (y) { return y.id == x.id; }).length == 0; });
    };
    BoardComponent.prototype.play = function () {
        var _this = this;
        var _blankEdgeList = this.edgeList.filter(function (x) { return (!x.status); });
        var _pointEdgeList = _blankEdgeList.filter(function (x) { return _this.boxListByEdgeId(x.id).filter(function (b) { return b.getBlankEdges().length == 1; }).length > 0; });
        if (_pointEdgeList.length > 0) {
            this.setEdge(_pointEdgeList[0]);
            return;
        }
        var _freeEdgeList = _blankEdgeList.filter(function (x) { return _this.boxListByEdgeId(x.id).filter(function (b) { return b.getBlankEdges().length > 2; }).length == _this.boxListByEdgeId(x.id).length; });
        if (_freeEdgeList.length > 0) {
            this.setEdge(_freeEdgeList[0]);
            return;
        }
        var _tmpEdgeList = _blankEdgeList.filter(function (x) { return _this.boxListByEdgeId(x.id).filter(function (b) { return b.getBlankEdges().length > 2; }).length > 0; });
        if (_tmpEdgeList.length > 0) {
            this.setEdge(_tmpEdgeList[0]);
            return;
        }
        //alert("stuck");
        this._tmpSeqBoxList = [];
        var _lowCostEdge = _blankEdgeList[0];
        try {
            var _edgeCost = this.chainCount(_lowCostEdge, 0);
            console.log("First Edge cost " + _edgeCost);
            for (var index = 1; index < _blankEdgeList.length; index++) {
                if (this.boxListByEdgeIdSeq(_blankEdgeList[index].id).length > 0) {
                    var _currentEdgeCost = this.chainCount(_blankEdgeList[index], 0);
                    console.log("EdgeCost" + index + ": " + _currentEdgeCost);
                    if (_edgeCost > _currentEdgeCost) {
                        _lowCostEdge = _blankEdgeList[index];
                        _edgeCost = _currentEdgeCost;
                        console.log(_lowCostEdge);
                    }
                }
            }
        }
        catch (ex) {
            console.log(ex);
            _lowCostEdge = _lowCostEdge != undefined && _lowCostEdge != null ? _lowCostEdge : _blankEdgeList[0];
        }
        console.log(_lowCostEdge);
        this.setEdge(_lowCostEdge);
    };
    BoardComponent.prototype.chainCount = function (_edge, _bid) {
        var _this = this;
        if (_edge != null) {
            console.log("chain : " + _edge.id);
            var _level_1;
            var _boxes = void 0;
            if (_bid == 0) {
                _boxes = this.boxListByEdgeIdSeq(_edge.id).filter(function (b) { return b.getBlankEdges().length == 2; });
            }
            else {
                _boxes = this.boxListByEdgeIdSeq(_edge.id).filter(function (b) { return b.getBlankEdges().length == 2 && b.id != _bid; });
            }
            _level_1 = _boxes.length;
            _boxes.forEach(function (_box) { return _this._tmpSeqBoxList.push(_box); });
            _boxes.forEach(function (_box) { return _level_1 += _this.chainCount(_box.getNextBlankEdge(_edge.id), _box.id); });
            console.log("level : " + _level_1);
            return _level_1;
        }
        else {
            return 0;
        }
    };
    BoardComponent.prototype.ngOnInit = function () { };
    BoardComponent = __decorate([
        core_1.Component({
            selector: 'board',
            templateUrl: 'app/templates/board.html',
            styleUrls: ['app/styles/board.css']
        }), 
        __metadata('design:paramtypes', [])
    ], BoardComponent);
    return BoardComponent;
}());
exports.BoardComponent = BoardComponent;
//# sourceMappingURL=board.component.js.map