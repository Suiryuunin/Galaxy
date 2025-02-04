class R_Transform2D
{
    constructor(position, dimensions)
    {
        // position
        this.pos = position;
        // dimensions
        this.dim = dimensions;
    }

    top()
    {
        return this.pos.y;
    }
    left()
    {
        return this.pos.x;
    }
    bottom()
    {
        return (this.pos.y+this.dim.y);
    }
    right()
    {
        return (this.pos.x+this.dim.x);
    }
}

class C_Transform2D
{
    constructor(position, radius)
    {
        // position
        this.pos = position;
        // dimensions
        this.radius = radius;
    }

    top()
    {
        return this.pos.y-this.radius;
    }
    left()
    {
        return this.pos.x-this.radius;
    }
    bottom()
    {
        return (this.pos.y+this.radius);
    }
    right()
    {
        return (this.pos.x+this.radius);
    }
}