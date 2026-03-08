export class HandTracker {
    constructor(w, h) {
        this.w = w;
        this.h = h;
        this.cacheCentroid = null;
        this.nextCacheFrame = 1200;
        this.frameCounter = 0;
    }

    analyze(imageData) {
        this.frameCounter++;
        const currentCentroid = this.getCentroid(imageData);

        // ランダムタイミング(20-40秒)で比較基準を更新
        if (this.frameCounter >= this.nextCacheFrame) {
            this.cacheCentroid = currentCentroid;
            this.frameCounter = 0;
            this.nextCacheFrame = Math.floor(Math.random() * 1200) + 1200;
        }

        if (!this.cacheCentroid) {
            this.cacheCentroid = currentCentroid;
            return true;
        }

        // 重心の移動距離を計算
        const dist = Math.sqrt(
            Math.pow(currentCentroid.x - this.cacheCentroid.x, 2) + 
            Math.pow(currentCentroid.y - this.cacheCentroid.y, 2)
        );

        return dist > 25; // 25px以上の移動で「動いている」とみなす
    }

    getCentroid(img) {
        let sumX = 0, sumY = 0, count = 0;
        const d = img.data;
        for (let i = 0; i < d.length; i += 4) {
            // 肌色判定ロジック
            if (d[i] > 95 && d[i+1] > 40 && d[i+2] > 20) {
                const x = (i / 4) % this.w;
                const y = Math.floor((i / 4) / this.w);
                sumX += x; sumY += y; count++;
            }
        }
        return count > 0 ? { x: sumX / count, y: sumY / count } : { x: 0, y: 0 };
    }
}
