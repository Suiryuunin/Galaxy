const UI = new Scene();

const word = new Word(["sternen"], new Vec2(C_RES.x/2,C_RES.y/2-256), 32, "white", new Vec2(-0.5, 0));


UI.init(word);

// E_ for Engine
const E_menu = new Engine(60,

// Update
(dt) =>
{
    if (Math.random()>0.98)
    {
        SpawnShootingStar(UI, new Vec2(Math.random()*(C_RES.x-256)+128, Math.random()*(C_RES.y-256)+128), Math.random()*16, false);
    }
    SpawnStar(UI, new Vec2(Math.random()*C_RES.x, Math.random()*C_RES.y), Math.random()*16);
    UI.update(dt);
},

// Render
() =>
{
    rr.fillBackground("black", 0.1);

    UI.render(rr);
    rr.render();
}

);

GameState = "menu";
C_ENGINES.menu = E_menu;

// C_ENGINES[GameState].start();
E_main.start();