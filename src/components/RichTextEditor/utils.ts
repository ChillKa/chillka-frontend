export const toLocaleEmojiGroupName = (key: string) => {
  switch (key) {
    case 'smileys & emotion':
      return '表情符號';
    case 'people & body':
      return '人物';
    case 'animals & nature':
      return '動物與大自然';
    case 'food & drink':
      return '美食與飲品';
    case 'travel & places':
      return '旅行與地點';
    case 'activities':
      return '活動與事件';
    case 'objects':
      return '物體';
    case 'symbols':
      return '符號';
    case 'flags':
      return '旗幟';
    default:
      return key;
  }
};
