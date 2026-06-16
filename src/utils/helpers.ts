export default {
  ucFirst: (string: string, snakeCaseToWords: boolean = false, kebabCaseToWords: boolean = false): string|any => {
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