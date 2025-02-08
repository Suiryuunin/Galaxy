class Fragment extends Circle
{
    constructor(sc, C_Trans2D, c, collide = true)
    {
        super(C_Trans2D, c);

        this.collide = collide;

        this.lifespan = Math.random()+1;
        this.sc = sc;
        this.type = "frag";
        this.v = new Vec2(Math.random()-0.5, Math.random()-0.5).normalized().scalar(Math.random()*512+this.t.radius*16);
        this.c = randomColor();

        this.decel = 0.995;

        sc.add(this);
    }

    explode(sc)
    {
        sc.deleteItem(this);
    }

    update(dt)
    {
        this.v = this.v.scalar(this.decel);
        this.t.pos = this.t.pos.add(this.v.scalar(dt));

        if (this.collide) this.updateBounds();

        this.lifespan -= dt;

        if (this.lifespan <= 1 && this.lifespan > 0)
        {
            this.alpha = this.lifespan;
        }
        
        if (this.lifespan <= 0)
        {
            this.explode(this.sc);
        }
    }
}

class ShootingStar extends Fragment
{
    constructor(sc, C_Trans2D, c, collide = true)
    {
        super(sc, C_Trans2D, c, collide);

        this.decel = 1;
    }

    render(rr)
    {
        
        rr.fillCircle(this.t.pos, this.t.radius, this.c, 0, this.alpha);
    }
}

function SpawnExplosion(sc, origin, mass, collide = true)
{
    const fragmentCount = Math.random()*16+16;
    let frags = [];
    for (let i = 0; i < fragmentCount; i++)
    {
        frags.push( new Fragment(sc, new C_Transform2D(origin, mass/(Math.random()*4+4)), "white", collide) );
    }
}

function SpawnShootingStar(sc, origin, mass, collide = true)
{
    new ShootingStar(sc, new C_Transform2D(origin, mass/(Math.random()*4+4)), "white", collide);
}

function SpawnStar(sc, origin, mass)
{
    const frag = new Fragment(sc, new C_Transform2D(origin, mass/(Math.random()*4+4)), "white", false);
    frag.v = frag.v.scalar(0);
}