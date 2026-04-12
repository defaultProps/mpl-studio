// 翻译文本
export async function translateText(text: string, sourceLang = 'auto', targetLang = 'zh') {
  const url = 'https://libretranslate.de/translate';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      q: text,
      source: sourceLang,
      target: targetLang,
      format: 'text'
    })
  });

  if (!response.ok) {
    console.warn('翻译失败', response)
    return text
  }

  const data = await response.json();
  return data.translatedText;
}