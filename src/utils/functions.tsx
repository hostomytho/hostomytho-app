export function shuffleArray(array: any) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}


export function splitText(text: any): any {

  const words = text.content.split(' ').map((word: string, idx: number) => {
    if (word.includes("\n")) {
      return [
        { text: word.replace("\n", ""), isSelected: false, sentenceId: null, isCurrentSelection: false, position: idx },
      ];
    } else {
      return { text: word, isSelected: false, sentenceId: null, isCurrentSelection: false, position: idx };
    }
  }).flat();
  return { ...text, content: words };
};