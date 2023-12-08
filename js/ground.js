class Ground{
    constructor(x,y,w,h){
        this.w = w
        this.h = h

        this.body = Bodies.rectangle(x,y,this.w,this.h,{isStatic:true})
        World.add(world,this.body)
    }

    display(){
        var pos = this.body.position
        push()
        rectMode(CENTER)
        noStroke()
        fill(148,127,146)
        rect(pos.x,pos.y,this.w,this.h)
        pop()
    }
}