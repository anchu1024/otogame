/**
 * @class Data
 * マップデータ管理用
 */
class Data {
  /**
   * データ登録
   * @param {object} data 登録するデータ
   */
  constructor(data) {
    this.name = "Unknown";
    this.author = "Unknown";
    try {
      this.name = data.header.name;
      this.author = data.header.author;
    } catch (e) {
      console.error(e);
    }
    this.data = data;
  }
}

/**
 * マップデータのキャッシュなどの管理を行う
 */
const DataManager = {
  cache: {},

  /**
   * 渡されたデータをマネージメントする
   * @param {Data} data Dataインスタンス
   */
  set(data) {
    const key = `mapdata:"${data.name}" made by ${data.author}`;
    if (key in this.cache) {
      UI.confirm(
        `
        # マップデータの上書き
        お使いのデバイスにはすでに同名のマップデータ(${key})が存在します。
        処理を続けるとこれを上書きすることになりますがよろしいですか?
        `,
      ).onOk(() => {
        this.cache[key] = data;
      });
    } else {
      this.cache[key] = data;
    }
  },

  /**
   * 現時点でのデータを全部localStorageに保存します
   */
  save() {
    localStorage.clear();
    for (const key of Object.keys(this.cache)) {
      localStorage.setItem(key, JSON.stringify(this.cache[key].data));
    }
  },

  /**
   * localStorageからマップデータをすべて引っ張ってきます
   */
  load() {
    for (const key of Object.keys(localStorage)) {
      if (key.startsWith("mapdata:")) {
        const jsonData = localStorage.getItem(key);
        const data = new Data(JSON.parse(jsonData));
        this.cache[key] = data;
      }
    }
  },
};
