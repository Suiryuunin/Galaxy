let id = 0;
const G = 512;

class Planet extends Circle
{
    constructor(pos, mass)
    {
        super(new C_Transform2D(pos, mass), "white");
        
        this.mass = mass;
        this.acc = new Vec2(0,0);
        this.anchor = false;

        this.id = id;
        id++;
    }

    initMovable(LL /*Linked List*/, anchorsArr, sc = undefined)
    {
        this.mass = this.t.radius;

        let closestAnchor = undefined;

        for (const anchor of anchorsArr)
        {
            if (closestAnchor == undefined)
            {
                closestAnchor = anchor;
            }
            else if (anchor.t.pos.sub(this.t.pos).mag() < closestAnchor.t.pos.sub(this.t.pos).mag())
            {
                closestAnchor = anchor;
            }
        }

        if (closestAnchor == undefined)
        {
            this.v.x = Math.random()*128+128;
            this.v.y = Math.random()*128+128;
        }
        else
        {
            // Directional vector around closest anchor
            const v = closestAnchor.t.pos.sub(this.t.pos).normalized().rotate90Clock();
            const strength = Math.random()*128+128;
            this.v.x = v.x * strength;
            this.v.y = v.y * strength;
        }

        LL.addNode(this);
        if (sc) sc.add(this);
    }

    initAnchor(LL, radius, sc = undefined)
    {
        this.anchor = true;

        this.t.radius = radius;
        this.v = this.v.scalar(0);
        this.ring = true;
        this.alpha = 0.5;

        LL.addNode(this);
        if (sc) sc.add(this);
    }

    calcForce(p)
    {
        // p for planet
        const force = this.t.pos.sub(p.t.pos);
        const distance = force.mag() > 4 ? (force.mag() < 128 ? force.mag() : 128) : 4;
        const strength = G*this.mass*p.mass/(force.mag()**2);
        return force.normalized().scalar(strength);
    }

    applyForce(f)
    {
        this.acc = this.acc.add(f.scalar(1/this.mass));
    }

    update(dt)
    {
        this.v = this.v.add(this.acc.scalar(60/(60*dt)).scalar(dt));
        this.t.pos = this.t.pos.add(this.v.scalar(dt));
        this.acc = this.acc.scalar(0);

        this.updateBounds();
    }

    explode(sc, anchors = undefined, planets = undefined)
    {
        sc.deleteItem(this);
        SpawnExplosion(sc, this.t.pos, this.mass);
        if (this.anchor) anchors.deleteNode(this);
        else planets.deleteNode(this);
    }
}