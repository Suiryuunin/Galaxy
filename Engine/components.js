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