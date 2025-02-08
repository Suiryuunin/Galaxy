const rr = new Renderer(document.querySelector("canvas"), 1);

const resize = () =>
{
    rr.resize(window.innerWidth, window.innerHeight, C_RES.y/C_RES.x);

    rr.render();
};
addEventListener("load", () => {resize();});
addEventListener("resize", resize);


function randomColor(h = new Vec2(0,30),s = new Vec2(50,25),l = new Vec2(75,25))
{
    return `hsl(${Math.random()*h.y*2-h.y+h.x}, ${Math.random()*s.y*2-s.y+s.x}%, ${Math.random()*l.y*2-l.y+l.x}%)`;
}

let C_ENGINES = {};