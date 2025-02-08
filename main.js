// Init Scene

const scene = new Scene();

let anchors = new LinkedList(true);
let planets = new LinkedList(true);
let toDestroy = new LinkedList(true);

let Anchor = new Planet(new Vec2(C_RES.x/2,C_RES.y/2), 256);
Anchor.c = "red";
Anchor.initAnchor(anchors, 16);

scene.init(Anchor);

Anchor = undefined;



// Inputs
window.addEventListener("mousedown", (e) => {
    const coords = rr.toCanvasCoords(e.pageX, e.pageY);
    switch (e.button)
    {
        case 0:
        {
            let inPlanet = false;
            const newRadius = Math.random()*16+4;
            const mouseBounds = new R_Bound(new R_Transform2D(coords, new Vec2(1,1)));
            for (let i = 0; i < mouseBounds.sect1.length; i++)
            {
                for (let j = 0; j < scene.cps[mouseBounds.sect1[i]].length; j++)
                {
                    if (scene.cps[mouseBounds.sect1[i]][j].t.pos.sub(coords).mag() <= scene.cps[mouseBounds.sect1[i]][j].t.radius+newRadius)
                    {
                        inPlanet = true;
                        break;
                    }
                }
            }
            if (inPlanet) return;

            const tempPlanet = new Planet(coords, newRadius);
            tempPlanet.initMovable(planets, anchors.arr, scene);
            tempPlanet.c = randomColor()

            return;
        }
        case 1:
        {
            e.preventDefault();
            for (const anchor of anchors.arr)
            {
                if (anchor.t.pos.sub(coords).mag() <= anchor.t.radius)
                    anchor.explode(scene, anchors, planets);
            }
            return;
        }
        case 2:
        {
            e.preventDefault();
            const tempAnchor = new Planet(coords, 256);
            tempAnchor.initAnchor(anchors, 16, scene);
            tempAnchor.c = randomColor()
            return;
        }
    }
});
window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});



  ///////////////
 // Game Loop //
///////////////

// E_ for Engine
const E_main = new Engine(60,

// Update
(dt) =>
{
    SpawnStar(scene, new Vec2(Math.random()*C_RES.x, Math.random()*C_RES.y), Math.random()*16);

    for (let i = 0; i < anchors.size(); i++)
    {
        for (let j = 0; j < planets.size(); j++)
        {
            const force = anchors.arr[i].calcForce(planets.arr[j]);
            planets.arr[j].applyForce(force);
        }
    }
    
    for (let i = 0; i < 8; i++)
    {
        scene.update(dt/8);
        toDestroy = scene.toExplode(toDestroy);
        scene.explode(toDestroy, anchors, planets);
    }
},

// Render
() =>
{
    rr.fillBackground("black", 0.25);

    scene.render(rr);

    rr.render();
}

);

C_ENGINES.main = E_main;