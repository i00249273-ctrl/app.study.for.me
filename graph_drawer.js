export const GraphDrawer = {
    radarCtx: null,
    lineCtx: null,

    init() {
        this.radarCtx = document.getElementById('radar_chart').getContext('2d');
        this.lineCtx = document.getElementById('line_chart').getContext('2d');
    },

    drawRadar(scores) {
        const ctx = this.radarCtx;
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;
        const center = w / 2;
        ctx.clearRect(0, 0, w, h);

        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        const vals = [scores.focus, scores.time, scores.avoidance];
        vals.forEach((v, i) => {
            const angle = (i * 2 * Math.PI) / 3 - Math.PI / 2;
            const r = (v / 100) * (center * 0.7);
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.stroke();
    },

    drawLine(history) {
        const ctx = this.lineCtx;
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;
        ctx.clearRect(0, 0, w, h);
        if (history.length < 2) return;

        ctx.strokeStyle = "#00ffff";
        ctx.beginPath();
        const maxTime = Math.max(...history.map(d => d.totalMinutes), 60);
        
        history.slice(-7).forEach((data, i) => {
            const x = (i / 6) * (w - 20) + 10;
            const y = h - (data.totalMinutes / maxTime) * (h - 20) - 10;
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        });
        ctx.stroke();
    }
};
