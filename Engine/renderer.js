class Renderer
{
    "use strict";

    constructor(canvas, layers)
    {
        this.canvas = canvas;
        this.ctx = [document.createElement("canvas").getContext("2d")];
        this.ctx[0].canvas.width = C_RES.x;
        this.ctx[0].canvas.height = C_RES.y;
        for (let i = 0; i < layers-1; i++)
        {
            this.ctx[i].push(document.createElement("canvas").getContext("2d"));
            this.ctx[i].canvas.width = C_RES.x;
            this.ctx[i].canvas.height = C_RES.y;
        }
        this.layers = layers;
        this.display = canvas.getContext("2d");
        
        this.color = "black";
        this.font = "VCR_OSD";
    }

    toCanvasCoords(pageX, pageY)
    {
        const _rect = this.display.canvas.getBoundingClientRect();
        const scale = {x: this.display.canvas.width/this.ctx[0].canvas.width, y: this.display.canvas.height/this.ctx[0].canvas.height};
        
        let x = (pageX-_rect.left) / scale.x;
        let y = (pageY-_rect.top) / scale.y;

        return new Vec2(x, y);
    }



    fillBackground(color = this.color, alpha = 1)
    {
        this.ctx[0].globalAlpha = alpha;
        this.ctx[0].fillStyle = color;
        this.ctx[0].fillRect(0, 0, this.ctx[0].canvas.width, this.ctx[0].canvas.height);
        this.ctx[0].globalAlpha = 1;
    }

    drawLine(start, end, color = "hotpink", alpha = 1, thickness = 4, lw = 1, vw = 0)
    {
        // Start a new Path
        this.ctx.globalAlpha = alpha;
        this.ctx.setLineDash([lw, vw]);
        this.ctx.lineWidth = thickness
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(end.x, end.y);
        
        // Draw the Path
        this.ctx.stroke();
        this.ctx.globalAlpha = 1;
    }

    measureWordWidth(word, size = 16)
    {
        this.ctx.font = `${size}px ${this.font}`;
        return this.ctx.measureText(word)["width"];
    }

    write(word, color = this.color, pos, size = 16, o = new Vec2(0,0), l = 0, border = false, alpha = 1, linesMargin = 1)
    {
        this.ctx[l].globalAlpha = alpha;
        this.ctx[l].lineWidth = 1;

        this.ctx[l].font = `${size}px ${this.font}`;
        let w = 0;
        let widths = [];
        for (let i = 0; i < word.length; i++)
        {
            w = Math.max(w, widths[i] = this.ctx[l].measureText(word[i])["width"]);
        }
        
        this.ctx[l].fillStyle = color;

        for (let i = 0; i < word.length; i++)
            this.ctx[l].fillText(word[i], pos.x + widths[i] * o.x, i*linesMargin + pos.y - size*o.y/1.5, w);

        if (border)
        {
            this.ctx[l].strokeStyle = color;
            this.ctx[l].beginPath();
            this.ctx[l].rect(pos.x + w * o.x, pos.y + o.y, w + 8, size * word.length);
            this.ctx[l].stroke();
        }
        this.ctx[l].globalAlpha = 1;
    }

    // drawImg({x, y, w, h, o}, {l,r,t,b}, img, alpha = 1, ro = 0, sx=1,sy=1)
    // {
    //     if (alpha == 0) return;

    //     this.ctx.globalAlpha = alpha;
    //     if (o != undefined && ro == 0 && sx == 1 && sy == 1)
    //     {
    //         x += w * o.x;
    //         y += h * o.y;
            
    //         this.ctx.drawImage(img, x-l, y-t, w+l+r, h+t+b);
    //         return;
    //     }
        
    //     this.ctx.save();

    //     if ((sx != 1 || sy != 1) && ro != 0)
    //     {
    //         this.ctx.translate(x, y);
    //         this.ctx.rotate(ro * Math.PI / 180);
    //         this.ctx.scale(sx,sy);
            
    //     }
    //     else
    //     {
    //         if (sx != 1 || sy != 1)
    //         {
    //             this.ctx.translate(x, y);
    //             this.ctx.scale(sx,sy);
    //         }

    //         if (ro != 0)
    //         {
    //             this.ctx.translate(x, y);
    //             this.ctx.rotate(ro * Math.PI / 180);
    //         }
    //     }

    //     this.ctx.drawImage(img, w * o.x, h * o.y, w, h);

    //     // restore the context to its untranslated/unrotated state
    //     this.ctx.restore();
    //     this.ctx.globalAlpha = 1;
    // }


      //////////
     // RECT //
    //////////

    fillRect(s_T, color = this.color, l = 0, alpha = 1)
    {
        if (alpha == 0) return;

        this.ctx[l].globalAlpha = alpha;
        this.ctx[l].fillStyle = color;
        
        // s_T for Standard Transform
        this.ctx[l].fillRect(s_T.x, s_T.y, s_T.w, s_T.h);
        
        this.ctx[l].globalAlpha = 1;
    }
    strokeRect(s_T, color = this.color, l = 0, inside = true, thickness = 1, alpha = 1)
    {
        if (alpha == 0) return;

        this.ctx[l].globalAlpha = alpha;

        this.ctx[l].lineWidth = thickness;
        this.ctx[l].strokeStyle = color;

        this.ctx[l].beginPath();
        this.ctx[l].rect(s_T.x +(inside?thickness:0), s_T.y +(inside?thickness:0),
                    s_T.w -(inside?thickness*2:0), s_T.h -(inside?thickness*2:0));

        this.ctx[l].stroke();
        
        this.ctx[l].globalAlpha = 1;
    }


      ////////////
     // CIRCLE //
    ////////////

    // s_P: Standard Position
    fillCircle(s_P, r, color = this.color, l = 0, alpha = 1)
    {
        if (alpha == 0) return;

        this.ctx[l].globalAlpha = alpha;
        this.ctx[l].fillStyle = color;

        this.ctx[l].beginPath();
        this.ctx[l].arc(s_P.x, s_P.y, r, 0, 2 * Math.PI);
        this.ctx[l].fill();
        
        this.ctx[l].globalAlpha = 1;
    }
    strokeCircle(s_P, r, color = this.color, l = 0, inside = true, thickness = 1, alpha = 1)
    {
        if (alpha == 0) return;

        this.ctx[l].globalAlpha = alpha;

        this.ctx[l].lineWidth = thickness;
        this.ctx[l].strokeStyle = color;

        this.ctx[l].beginPath();
        this.ctx[l].arc(s_P.x, s_P.y, r - (inside?thickness:0), 0, 2 * Math.PI);
        this.ctx[l].stroke();
        
        this.ctx[l].globalAlpha = 1;
    }

    resize(w, h, ratio)
    {
        if (h / w > ratio)
        {
            this.display.canvas.height = Math.ceil(w * ratio);
            this.display.canvas.width =  Math.ceil(w);
        }
        else
        {
            this.display.canvas.height = Math.ceil(h);
            this.display.canvas.width =  Math.ceil(h / ratio);
        }
    }

    render()
    {
        this.display.imageSmoothingEnabled = true;

        for (let i = 0; i < this.layers; i++)
        {
            this.display.drawImage(this.ctx[i].canvas,
                0, 0,
                this.ctx[i].canvas.width, this.ctx[i].canvas.height,
                0, 0,
                this.display.canvas.width, this.display.canvas.height
            );
        }
            
        // DARKCTX.globalCompositeOperation = 'source-over';
        // DARKCTX.fillStyle = `rgba(0,0,0,1)`;
        // DARKCTX.fillRect(0, 0, res.w, res.h);
        
        // addLight(player1.center.x-VP.x,player1.center.y-VP.y, 128,player1.center.x-VP.x,player1.center.y-VP.y, 512);

        // DARKCTX.globalCompositeOperation = 'source-over';

        // this.display.globalCompositeOperation = "multiply";
        // this.display.drawImage(DARKCTX.canvas,
        //     0, 0,
        //     DARKCTX.canvas.width, DARKCTX.canvas.height,
        //     0, 0,
        //     this.display.canvas.width, this.display.canvas.height
        // );

        // this.display.globalCompositeOperation = "source-over";
    }
}