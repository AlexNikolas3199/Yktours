import I18n from 'react-native-i18n';
import en from './en.js';
import ru from './ru.js';

I18n.fallbacks = true;

I18n.translations = {
  en,
  ru
};

export default I18n;