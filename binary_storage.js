export const BinaryStorage = {
    // 文字列を 01 の羅列に変換
    toBinary: (str) => {
        return str.split('').map(char => 
            char.charCodeAt(0).toString(2).padStart(8, '0')
        ).join('');
    },
    // 01 の羅列を文字列に復元
    fromBinary: (bin) => {
        let str = "";
        for (let i = 0; i < bin.length; i += 8) {
            str += String.fromCharCode(parseInt(bin.substr(i, 8), 2));
        }
        return str;
    },
    // 1週間以上前のデータを消して保存
    async update(newData) {
        const now = Date.now();
        const binaryStr = await localforage.getItem('study_binary_data');
        let history = [];
        
        if (binaryStr) {
            try {
                history = JSON.parse(this.fromBinary(binaryStr));
            } catch (e) { console.error("Data recovery failed."); }
        }

        // 7日（604,800,000ミリ秒）より新しいデータだけ残す
        history = history.filter(item => (now - item.timestamp) < 604800000);
        
        newData.timestamp = now;
        history.push(newData);

        const newBin = this.toBinary(JSON.stringify(history));
        await localforage.setItem('study_binary_data', newBin);
    }
};
