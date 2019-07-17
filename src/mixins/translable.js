import translator from '@/helpers/translations.js';

export default {
  methods: {
    t(key) {
      const locale = this.locale || window.locale || window.navigator.language 
      
      return translator(locale)(key)
    }
  },
}