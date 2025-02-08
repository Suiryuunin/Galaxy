const S_Menu = new Scene();

const T_ster = new Word(["sternen"], new Vec2(C_RES.x/2,C_RES.y/2-64), 64, "white", new Vec2(-0.5, 0));
const B_play = new Button(() => {C_ENGINES.menu.stop(); C_ENGINES.main.start();}, ["play"], new R_Transform2D(new Vec2(C_RES.x/2,C_RES.y/2-16), new Vec2(96, 32)), 32, "white", "hotpink");
const B_settings = new Button(() => {S_Active = S_Settings; S_Settings.activate(); S_Menu.deactivate();}, ["settings"], new R_Transform2D(new Vec2(C_RES.x/2,C_RES.y/2+32), new Vec2(96, 32)), 32, "white", "hotpink");

S_Menu.init(T_ster);
S_Menu.addBulk([B_play, B_settings]);

S_Menu.activate();


const S_Settings = new Scene();

const T_setting = new Word(["settings"], new Vec2(C_RES.x/2,C_RES.y/2-128), 64, "white", new Vec2(-0.5, 0));
const T_fragCol = new Word(["fragments collision?"], new Vec2(C_RES.x/2-256,C_RES.y/2-64), 32, "white", new Vec2(0, -0.5));
const B_fragCol = new Button((_self) => {if (_self.word == "yes") _self.word = ["no"]; else _self.word = ["yes"];}, ["yes"], new R_Transform2D(new Vec2(C_RES.x/2+224,C_RES.y/2-64), new Vec2(64, 32)), 32, "white", "hotpink");
const B_back = new Button(() => {S_Active = S_Menu; S_Menu.activate(); S_Settings.deactivate(); console.log("AA")}, ["back"], new R_Transform2D(new Vec2(C_RES.x/2,C_RES.y/2+64), new Vec2(64, 32)), 32, "white", "hotpink");
S_Settings.init(T_setting);
S_Settings.addBulk([T_fragCol,B_fragCol,B_back]);



let S_Active = S_Menu;

// E_ for Engine
const E_menu = new Engine(60,

// Update
(dt) =>
{
    if (Math.random()>0.98)
    {
        SpawnShootingStar(S_Active, new Vec2(Math.random()*(C_RES.x-256)+128, Math.random()*(C_RES.y-256)+128), Math.random()*16, false);
    }
    SpawnStar(S_Active, new Vec2(Math.random()*C_RES.x, Math.random()*C_RES.y), Math.random()*16);
    S_Active.update(dt);
},

// Render
() =>
{
    rr.fillBackground("black", 0.1);

    S_Active.render(rr);
    rr.render();
}

);

C_ENGINES.menu = E_menu;

C_ENGINES.menu.start();