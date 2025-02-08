// Menu UI

const S_Menu = new Scene();

const T_ster = new Word(["sternen"], new Vec2(C_RES.x/2,C_RES.y/2-64), 96, "white", new Vec2(-0.5, 0));
const B_play = new Button(() => {A_Play(); C_ENGINES.menu.stop(); C_ENGINES.main.start(); S_Menu.deactivate(); S_Game.activate();}, ["play"], new R_Transform2D(new Vec2(C_RES.x/2,C_RES.y/2-16), new Vec2(96, 32)), 32);
const B_controls = new Button(() => {S_Active = S_Controls; S_Controls.activate(); S_Menu.deactivate();}, ["controls"], new R_Transform2D(new Vec2(C_RES.x/2,C_RES.y/2+32), new Vec2(160, 32)), 32);
const B_settings = new Button(() => {S_Active = S_Settings; S_Settings.activate(); S_Menu.deactivate();}, ["settings"], new R_Transform2D(new Vec2(C_RES.x/2,C_RES.y/2+80), new Vec2(160, 32)), 32);

S_Menu.init(T_ster);
S_Menu.addBulk([B_play, B_settings, B_controls]);

S_Menu.activate();


// Settings UI

const S_Settings = new Scene();

const T_setting = new Word(["settings"], new Vec2(C_RES.x/2,C_RES.y/2-128), 64, "white", new Vec2(-0.5, 0));

const T_fragCol = new Word(["fragments collision?"], new Vec2(C_RES.x/2-256,C_RES.y/2-64), 32, "white", new Vec2(0, -0.5));
const B_fragCol = new Button(
    (_self) => {
    if (_self.word == "yes")
    {
        _self.word = ["no"];
        fragCollide = false;
    }
    else
    {
        _self.word = ["yes"];
        fragCollide = true;
    }
}, ["yes"], new R_Transform2D(new Vec2(C_RES.x/2+224,C_RES.y/2-64), new Vec2(64, 32)), 32);

const T_sfx = new Word(["sfx?"], new Vec2(C_RES.x/2-256,C_RES.y/2-16), 32, "white", new Vec2(0, -0.5));
const B_sfx = new Button((_self) => {if (_self.word == "yes") _self.word = ["no"]; else _self.word = ["yes"];}, ["yes"], new R_Transform2D(new Vec2(C_RES.x/2+224,C_RES.y/2-16), new Vec2(64, 32)), 32);

const T_hue = new Word(["hue"], new Vec2(C_RES.x/2-256,C_RES.y/2+32), 32, "white", new Vec2(0, -0.5));
const Sl_hue = new Slider(hue, 360, new R_Transform2D(new Vec2(C_RES.x/2+64,C_RES.y/2+32), new Vec2(256-64, 32)));

const T_hrange = new Word(["variation"], new Vec2(C_RES.x/2-256,C_RES.y/2+80), 32, "white", new Vec2(0, -0.5));
const Sl_hrange = new Slider(hrange, 360, new R_Transform2D(new Vec2(C_RES.x/2+64,C_RES.y/2+80), new Vec2(256-64, 32)));

const B_back = new Button(() => {S_Active = S_Menu; S_Menu.activate(); S_Settings.deactivate(); S_Controls.deactivate();}, ["back"], new R_Transform2D(new Vec2(C_RES.x/2,C_RES.y/2+160), new Vec2(96, 32)), 32);
S_Settings.init(T_setting);
S_Settings.addBulk([T_fragCol,B_fragCol, T_sfx,B_sfx, T_hue,Sl_hue, T_hrange,Sl_hrange,  B_back]);


// Controls UI

const S_Controls = new Scene();

const T_controlsTitle = new Word(["controls"], new Vec2(C_RES.x/2,C_RES.y/2-80), 64, "white", new Vec2(-0.5, 0));
const T_Controls = new Word(["new orbiter: left click", "new anchor: right click", "destroy anchor: middle click"], new Vec2(C_RES.x/2,C_RES.y/2-16), 32, "white", new Vec2(-0.5, -0.5));

S_Controls.init(B_back);
S_Controls.addBulk([T_controlsTitle, T_Controls]);






T_setting.update = () =>
{
    T_setting.color = `hsl(${hue}deg, 75%, 75%)`;
};
T_controlsTitle.update = () =>
{
    T_controlsTitle.color = `hsl(${hue}deg, 75%, 75%)`;
};


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

    hue = Sl_hue.value;
    Sl_hue.cs = `hsl(${hue}deg, 75%, 75%)`;
    hrange = Sl_hrange.value;
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