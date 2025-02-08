class Circle
{
    constructor(C_Trans2D, c, offset = new Vec2(0,0))
    {
        this.visible = true;

        // transform
        this.t = C_Trans2D;
        this.o = offset;
        this.c = c;
        this.alpha = 1;
        this.ring = false;
        this.collide = true;

        this.collider = new CircleCollider(C_Trans2D);

        this.v = new Vec2(0,0);
    }

    updateBounds()
    {
        this.collider.t.pos = this.t.pos;
        this.collider.t.radius = this.t.radius;

        this.collider.update();
    }

    update(dt)
    {
        this.t.pos = this.t.pos.add(this.v.scalar(dt));

        if (this.collide) this.updateBounds();
    }

    render(rr)
    {
        rr.fillCircle(this.t.pos, this.t.radius, this.c, 0, this.alpha);
        if (this.ring)
            rr.strokeCircle(this.t.pos, this.t.radius, this.c, 0, true, 4, 1);
    }
}

class Word
{
    constructor(word, pos, size, color = "white", offset)
    {
        this.visible = true;

        this.word = word;
        this.pos = pos;
        this.size = size;
        this.color = color
        
        this.offset = offset;
    }

    update() {}

    render(rr)
    {
        rr.write(this.word, this.color, this.pos, this.size, this.offset);
    }
}

function pointCollideRect(point, R_Trans2D)
{
    return (point.x <= R_Trans2D.right() && point.x >= R_Trans2D.left() && point.y <= R_Trans2D.bottom() && point.y >= R_Trans2D.top());
}

class Button
{
    constructor(action = () =>{console.log("FOOL! This button doesn't do jack shit!!")}, word = [""], R_Trans2D, size = 16, cr, cw)
    {
        this.visible = true;

        this.word = word;
        this.t = R_Trans2D,
        this.cr = cr;
        this.cw = cw;
        this.offset = new Vec2(-0.5,-0.5);
        this.size = size;

        this.action = this.action;

        this.event = (e) =>
        {
            const coords = rr.toCanvasCoords(e.pageX, e.pageY);

            const tt = new R_Transform2D(this.t.pos.sub(this.t.dim.scalar(0.5)), this.t.dim);
            if (pointCollideRect(coords, tt))
                action(this);
        };
    }

    update() {}

    activate()
    {
        window.addEventListener("mousedown", this.event);
    }

    deactivate()
    {
        window.removeEventListener("mousedown", this.event);
    }

    render(rr)
    {
        rr.write(this.word, this.cw, this.t.pos, this.size, this.offset);
        const tt = new R_Transform2D(this.t.pos.sub(this.t.dim.scalar(0.5)), this.t.dim);
        // rr.strokeRect(new Vec4(tt.left(), tt.top(), this.t.dim.x, this.t.dim.y), this.cr, 0, true, 1);
    }
}