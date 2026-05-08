/**
 * マークダウンをHTMLに変換する簡易ライブラリです。
 * ユーザーはmarkedにmd文字列を入れるとhtml文字列が返ってきます
 * 必ず/src/css/markdown.cssを読み込んでください。そこのスタイルに準拠します。
 */

const mdParser = (() => {
  const rules = [
    { regex: /^# (.*)$/gm, replace: "<h1>$1</h1>" },
    { regex: /^## (.*)$/gm, replace: "<h2>$1</h2>" },
    { regex: /^### (.*)$/gm, replace: "<h3>$1</h3>" },
    { regex: /\*\*(.*?)\*\*/g, replace: "<strong>$1</strong>" },
    { regex: /\*(.*?)\*/g, replace: "<em>$1</em>" },
    { regex: /`([^`]+)`/g, replace: "<code>$1</code>" },
    { regex: /^\s*(\*{3,}|-{3,}|_{3,})\s*$/gm, replace: "<hr>" },
  ];

  function convert(text) {
    let html = text;
    for (const rule of rules) {
      html = html.replace(rule.regex, rule.replace);
    }
    return html;
  }

  function exportFunc(text) {
    return `<div class="markdown">${convert(text)}</div>`;
  }

  return { exportFunc };
})();

const marked = mdParser.exportFunc;
