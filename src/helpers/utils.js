export function displayMessage(msg, context = "success") {
  if (window.displayTopMessage) {
    window.displayTopMessage(msg, context)
  } else {
    // eslint-disable-next-line no-console
    console.log(context, msg)
  }
}