export class Edge{
    id: number;
    status: boolean = false;
    constructor(num: number){
        this.id=num;
    }
}

export class Box{
    id: number;
    left: Edge;
    right: Edge;
    top: Edge;
    bottom: Edge;
    status: boolean=false;
    player: Player;
    constructor(num: number){
        this.id=num;
    }
    public getEdges(): Array<Edge>{
        let _list: Array<Edge> = [];
        _list.push(this.top)
        _list.push(this.left)
        _list.push(this.bottom)
       _list.push(this.right)
        return _list;
    }
    public getFilledEdges(): Array<Edge>{
        let _list: Array<Edge> = [];
        if(this.top.status){_list.push(this.top)}
        if(this.left.status){_list.push(this.left)}
        if(this.bottom.status){_list.push(this.bottom)}
        if(this.right.status){_list.push(this.right)}
        return _list;
    }
    public getBlankEdges(): Array<Edge>{
        let _list: Array<Edge> = [];
        if(!this.top.status){_list.push(this.top)}
        if(!this.left.status){_list.push(this.left)}
        if(!this.bottom.status){_list.push(this.bottom)}
        if(!this.right.status){_list.push(this.right)}
        return _list;
    }
    public getNextBlankEdge(_edgeId): Edge{
        return this.getBlankEdges().filter(x => x.id != _edgeId)[0];
    }
}

export class Player{
    id: number;
    name: string="";
    icon: string="";
    points: number=0;
    nextPlayer: Player;
}
