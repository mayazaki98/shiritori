export const getLastWord = (word: string): string => {
  if (!word) {
    return "";
  }
  return getConvertWord(word).slice(-1);
}

export const getConvertWord = (word: string): string => {
  let lastWord: string = "";
  switch(word.slice(-1)) {
    case "ー":
      return getConvertWord(word.slice(0, word.length -1));
    case "ぁ":
      lastWord = "あ";
      break;
    case "ぃ":
      lastWord = "い";
      break;
    case "ぅ":
      lastWord = "う";
      break;
    case "ぇ":
      lastWord = "え";
      break;
    case "ぉ":
      lastWord = "お";
      break;
    case "ゃ":
      lastWord = "や";
      break;
    case "ゅ":
      lastWord = "ゆ";
      break;
    case "ょ":
      lastWord = "よ";
      break;
  }
  
  if (lastWord) {
    return word.slice(0, word.length -1) + lastWord;
  }else{
    return word.slice(-1);
  }
  
}

export const isHiragana = (word : string ) : boolean => {
  const regex = /^[\p{sc=Hiragana}ー]+$/u;
  return regex.test(word);
}