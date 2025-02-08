"use strict";

// Init Scene

const S_Game = new Scene();

let anchors = new LinkedList(true);
let planets = new LinkedList(true);
let toDestroy = new LinkedList(true);


const B_menu = new Button(() => {C_ENGINES.main.stop(); C_ENGINES.menu.start(); S_Game.deactivate(); S_Menu.activate();}, ["<"], new R_Transform2D(new Vec2(64,C_RES.y-64), new Vec2(64, 64)), 64);
S_Game.init(B_menu);

let Anchor = new Planet(new Vec2(C_RES.x/2,C_RES.y/2), 256);
Anchor.initAnchor(anchors, 16);

S_Game.add(Anchor);


function placeOrbiter(coords)
{
    let inPlanet = false;
    const newRadius = Math.random()*16+4;
    const mouseBounds = new R_Bound(new R_Transform2D(coords, new Vec2(1,1)));
    for (let i = 0; i < mouseBounds.sect1.length; i++)
    {
        for (let j = 0; j < S_Game.cps[mouseBounds.sect1[i]].length; j++)
        {
            if (S_Game.cps[mouseBounds.sect1[i]][j].t.pos.sub(coords).mag() <= S_Game.cps[mouseBounds.sect1[i]][j].t.radius+newRadius)
            {
                inPlanet = true;
                break;
            }
        }
    }
    if (inPlanet) return;

    A_Normal(Math.round(Math.random()*3));

    const tempPlanet = new Planet(coords, newRadius);
    tempPlanet.initMovable(planets, anchors.arr, S_Game);
    tempPlanet.c = randomColor();
}
function destroyAnchor(coords)
{
    let exploded = false;
    for (const anchor of anchors.arr)
    {
        if (anchor.t.pos.sub(coords).mag() <= anchor.t.radius)
        {
            anchor.explode(S_Game, anchors, planets);
            exploded = true;
        }
    }
    if (exploded)
    {
        A_Destroy(Math.round(Math.random()*2));
    }
}
function placeAnchor(coords)
{
    const tempAnchor = new Planet(coords, 256);
    tempAnchor.initAnchor(anchors, 16, S_Game);
    tempAnchor.c = randomColor();

    A_Normal(Math.round(Math.random()*3));
}



// Inputs
const keys = {};
window.addEventListener("mousedown", (e) => {
    if (!E_main.running) return;

    keys[e.button] = true;

    const coords = rr.toCanvasCoords(e.pageX, e.pageY);
    switch (e.button)
    {
        case 0:
        {
            placeOrbiter(coords);

            return;
        }
        case 1:
        {
            e.preventDefault();

            destroyAnchor(coords);

            return;
        }
        case 2:
        {
            e.preventDefault();

            placeAnchor(coords);
            
            return;
        }
    }
});
window.addEventListener("mouseup", (e) =>
{
    delete keys[e.button];
});
window.addEventListener("mousemove", (e) => {
    if (!E_main.running) return;

    const coords = rr.toCanvasCoords(e.pageX, e.pageY);
    switch (true)
    {
        case keys[0]:
        {
            placeOrbiter(coords);

            return;
        }
        case keys[1]:
        {
            e.preventDefault();

            destroyAnchor(coords);

            return;
        }
        case keys[2]:
        {
            e.preventDefault();

            placeAnchor(coords);
            
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
    SpawnStar(S_Game, new Vec2(Math.random()*C_RES.x, Math.random()*C_RES.y), Math.random()*16);

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
        S_Game.update(dt/8);
        toDestroy = S_Game.toExplode(toDestroy);
        S_Game.explode(toDestroy, anchors, planets);
    }
},

// Render
() =>
{
    rr.fillBackground("black", 0.25);

    S_Game.render(rr);

    rr.render();
}

);

C_ENGINES.main = E_main;