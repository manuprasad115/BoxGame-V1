import { Component, OnInit } from '@angular/core';
import{Edge,Box,Player} from './board';

@Component({
    selector: 'board',
    templateUrl: 'app/templates/board.html',
    styleUrls: ['app/styles/board.css']
})


export class BoardComponent implements OnInit {
    constructor() { this.drawBoard(); }
    boxsize: number = 6;
    edgeList: Array<Edge> = [];
    boxList: Array<Box>=[];
    myPlayer: Player = new Player();
    newPlayer: Player = new Player();
    currentPlayer: Player;
    playStart: boolean=false;
    _tmpSeqBoxList: Array<Box> = [];

    drawBoard() {
        this.myPlayer.id=1;
        this.myPlayer.name="Manu";
        this.myPlayer.icon="M";
        this.myPlayer.nextPlayer=this.newPlayer;
        this.newPlayer.id=2;
        this.newPlayer.nextPlayer=this.myPlayer;
        this.currentPlayer=this.newPlayer;
        for (var i = 1; i <= this.boxsize; i++) {
            for (var j = 1; j <= this.boxsize; j++) {
                let _box = this.createBox();
                if (i == 1) {
                    _box.top=this.createEdge();
                }
                else {
                    _box.top=this.getBox(i-1,j).bottom;
                }
                if (j == 1) {
                    _box.left=this.createEdge();
                }
                else {
                     _box.left=this.getBox(i,j-1).right;
                }
                _box.bottom=this.createEdge();
                _box.right=this.createEdge();
            }
        }
    }

    createBox(): Box{
        let _b: Box= new Box(this.boxList.length+1);
        this.boxList.push(_b);
        return _b;
    }

    getBox(row: number, col: number)
    {
        let _bId: number = (row-1)*this.boxsize+col;
        return this.boxList.find(b => b.id==_bId);
    }
    createEdge(): Edge{
        let _e = new Edge(this.edgeList.length+1);
        this.edgeList.push(_e);
        return _e;
    }
    checkWin(_edgeId: number): boolean
    {
        let _flag: boolean =false;
        let _boxArray: Array<Box> = this.boxListByEdgeId(_edgeId);
        for (var index = 0; index < _boxArray.length; index++){
               let _box=_boxArray[index];
               if(_box.top.status && _box.bottom.status && _box.left.status && _box.right.status)
               {
                   _box.status=true;
                   _box.player=this.currentPlayer;
                   _flag=true;
               }    
        }
        return _flag;
    }
    public isFirstBox(_id: number):boolean
    {
        return (_id % this.boxsize) == 1;
    }
    public setEdge(_edge: Edge){
        if(_edge.status){
           alert("Invalid Move");
        }
        else{
             _edge.status=true;
            if(this.checkWin(_edge.id))
            {
                this.currentPlayer.points=this.getPoints(this.currentPlayer);
                if(this.edgeList.filter(x => (!x.status)).length<1)
                {
                    alert("Game Finished");
                    let _winner: Player= this.currentPlayer.points > this.currentPlayer.nextPlayer.points ? this.currentPlayer : this.currentPlayer.nextPlayer;
                    alert("Congrats "+_winner.name+" you won the game");
                    return;
                }
            }
            else{
             this.currentPlayer=this.currentPlayer.nextPlayer;
            }
            if(this.currentPlayer.id==this.myPlayer.id){
                this.play();
            }
        }
    }
    public startGame(){
        if(this.newPlayer.name !="" && this.newPlayer.icon != ""){
             this.playStart=true;
        }
        else{
            alert("Enter Player info to start game");
        }
    }
    getPoints(_player: Player): number{
       return (this.boxList.filter(x => x.status ).filter(b => b.player.id == _player.id).length);
    }
    boxListByEdgeId(_edgeId: number):Array<Box>{
        return this.boxList.filter(x => x.top.id==_edgeId || x.bottom.id == _edgeId || x.left.id == _edgeId || x.right.id == _edgeId);
    }
    boxListByEdgeIdSeq(_edgeId: number):Array<Box>{
        return this.boxListByEdgeId(_edgeId).filter(x => this._tmpSeqBoxList.filter(y => y.id == x.id).length ==0);
    }
    play() {
        let _blankEdgeList: Array<Edge> = this.edgeList.filter(x => (!x.status));
        let _pointEdgeList: Array<Edge> = _blankEdgeList.filter(x => this.boxListByEdgeId(x.id).filter(b => b.getBlankEdges().length == 1).length > 0);
        if (_pointEdgeList.length > 0) {
            this.setEdge(_pointEdgeList[0]);
            return;
        }
        let _freeEdgeList: Array<Edge> = _blankEdgeList.filter(x => this.boxListByEdgeId(x.id).filter(b => b.getBlankEdges().length > 2).length == this.boxListByEdgeId(x.id).length);
        if (_freeEdgeList.length > 0) {
            this.setEdge(_freeEdgeList[0]);
            return;
        }
         let _tmpEdgeList: Array<Edge> = _blankEdgeList.filter(x => this.boxListByEdgeId(x.id).filter(b => b.getBlankEdges().length > 2).length > 0);
        if (_tmpEdgeList.length > 0) {
            this.setEdge(_tmpEdgeList[0]);
            return;
        }
        //alert("stuck");
        this._tmpSeqBoxList = [];
        let _lowCostEdge: Edge = _blankEdgeList[0];
        try{
        let _edgeCost: number = this.chainCount(_lowCostEdge,0);
        console.log("First Edge cost "+_edgeCost);
        for (var index = 1; index < _blankEdgeList.length; index++) {
            if(this.boxListByEdgeIdSeq(_blankEdgeList[index].id).length > 0){
                let _currentEdgeCost: number = this.chainCount(_blankEdgeList[index],0);
                console.log("EdgeCost"+index+": "+_currentEdgeCost);
                if(_edgeCost > _currentEdgeCost){
                    _lowCostEdge=_blankEdgeList[index];
                    _edgeCost=_currentEdgeCost;
                    console.log(_lowCostEdge);
                }
            }
        }
        }catch(ex){
            console.log(ex);
            _lowCostEdge = _lowCostEdge!=undefined && _lowCostEdge!=null ? _lowCostEdge:_blankEdgeList[0];
        }
        console.log(_lowCostEdge);
        this.setEdge(_lowCostEdge);
    }
    chainCount(_edge: Edge, _bid: number): number {
        if (_edge != null) {
            console.log("chain : " + _edge.id);
            let _level: number;
            let _boxes: Array<Box>;
            if (_bid == 0) {
                _boxes = this.boxListByEdgeIdSeq(_edge.id).filter(b => b.getBlankEdges().length == 2);
            }
            else {
                _boxes = this.boxListByEdgeIdSeq(_edge.id).filter(b => b.getBlankEdges().length == 2 && b.id != _bid);
            }
            _level = _boxes.length;
            _boxes.forEach(_box => this._tmpSeqBoxList.push(_box));
            _boxes.forEach(_box => _level += this.chainCount(_box.getNextBlankEdge(_edge.id), _box.id));
            console.log("level : " + _level);
            return _level;
        }
        else {
            return 0;
        }
    }

    ngOnInit() { }
}