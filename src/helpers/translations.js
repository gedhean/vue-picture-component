const DEFAULT_LOCALE = 'en'
const LOCALES = ['en', 'pt-BR']
const TRANLATIONS = {
  'en': {
    'img-format-not-supported': 'Image format not supported. Choose an image with the following formats: .jpg, .jpeg, .png, .gif ou .bmp',
    'upload-error': 'Sorry, we were unable to upload your image right now :(',
    'choose-image': 'Choose image',
    'choose-another': 'Choose another',
    'crop': 'Crop',
    'edit': 'Edit',
    'rotate-left': 'Rotate Left',
    'rotate-right': 'Rotate Right'
  },
  'pt-BR': {
    'img-format-not-supported': 'Formato de imagem não suportado. Escolha uma imagem com os seguintes formatos: .jpg, .jpeg, .png, .gif ou .bmp',
    'upload-error': 'Desculpe, não foi possível fazer o upload da imagem nesse momento :(',
    'choose-image': 'Escolher image',
    'choose-another': 'Escolher outra',
    'crop': 'Recortar',
    'edit': 'Editar',
    'rotate-left': 'Rotacionar esquerda',
    'rotate-right': 'Rotacionar direita'
  }
}

function translate(locale) {
  // eslint-disable-next-line no-console
  const loc = LOCALES.find(l => l === locale) || console.warn(`Missing locale '${locale}'`) || DEFAULT_LOCALE
  const trans = TRANLATIONS[loc]

  // eslint-disable-next-line no-console
  return (key, translations = trans) => translations[key] || console.warn(`Missing key '${key} for locale '${loc}'`) || key
}

export default translate