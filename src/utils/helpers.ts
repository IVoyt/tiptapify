export default {
  ucFirst: (string: String, snakeCaseToWords: Boolean = false, kebabCaseToWords: Boolean = false): String|any => {
    if (!string) {
      return string
    }

    if (snakeCaseToWords) {
      string = string.replaceAll('_', ' ')
    }

    if (kebabCaseToWords) {
      string = string.replaceAll('-', ' ')
    }

    return string[0].toUpperCase() + string.slice(1)
  }
}