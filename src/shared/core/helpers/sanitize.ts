const sanitizeHtml = require('sanitize-html')

function sanitizer (value: string): string {
  let gettype = typeof value
  if (gettype !== 'undefined' && value !== null && value !== '') {
    // trim to remove spaces in the beginning of the string and in the end
    if (gettype === 'string') {
      return sanitizeHtml(value.trim(), {
        allowedTags: [],
        allowedAttributes: {},
        allowedIframeHostnames: []
      }).trim()
    }
  }
  // preserve values
  return value
}

function sinatizeInput (value: string): boolean {
  if (value !== '') {
    if (sanitizer(value) === '') {
      return false
    }
  }
  return true
}

export {
  sinatizeInput,
  sanitizer
}
