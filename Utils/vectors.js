class Vec2
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }

    mag()
    {
        return Math.sqrt(this.x**2+this.y**2);
    }
    normalize()
    {
        const k = Math.sqrt(1/(this.x**2+this.y**2));
        this.x = k*this.x;
        this.y = k*this.y;
    }
    normalized()
    {
        const k = Math.sqrt(1/(this.x**2+this.y**2));
        return new Vec2(k*this.x, k*this.y);
    }
    reciprocal()
    {
        return new Vec2(this.y, this.x);
    }
    rotate90Clock()
    {
        return new Vec2(this.y, -this.x);
    }
    rotate90CounterClock()
    {
        return new Vec2(-this.y, this.x);
    }

    add(v)
    {
        return new Vec2(this.x+v.x,this.y+v.y);
    }
    sub(v)
    {
        return new Vec2(this.x-v.x,this.y-v.y);
    }
    dot(v)
    {
        return (this.x*v.x+this.y+v.y);
    }
    scalar(s)
    {
        return new Vec2(this.x*s,this.y*s);
    }
    div(v)
    {
        return new Vec2(this.x/v.x, this.y/v.y);
    }
}

class Vec4
{
    constructor(x,y,w,h)
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}