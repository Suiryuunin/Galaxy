class Fragment extends Circle
{
    constructor(sc, C_Trans2D, c)
    {
        super(C_Trans2D, c);

        this.lifespan = Math.random()+1;
        this.sc = sc;
        this.type = "frag";
        this.v = new Vec2(Math.random()-0.5, Math.random()-0.5).normalized().scalar(Math.random()*128+128);

        sc.add(this);
    }

    explode(sc)
    {
        sc.deleteItem(this);
    }

    update(dt)
    {
        this.t.pos = this.t.pos.add(this.v.scalar(dt));
        this.lifespan -= dt;

        if (this.lifespan <= 0.5 && this.lifespan > 0)
        {
            this.alpha = this.lifespan/0.5;
        }

        if (this.lifespan <= 0)
        {
            this.explode(this.sc);
        }
    }
}

function SpawnExplosion(sc, origin, mass)
{
    const fragmentCount = Math.random()*8+8;
    let frags = [];
    for (let i = 0; i < fragmentCount; i++)
    {
        frags.push( new Fragment(sc, new C_Transform2D(origin, mass/(Math.random()*4+4)), "white") );
    }
}