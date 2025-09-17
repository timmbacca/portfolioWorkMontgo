/**
 * Validates an input string against a regex and a max length.
 * @param input The string to validate.
 * @param regex The regular expression to match.
 * @param maxLength The maximum allowed length.
 * @returns An error message if validation fails, otherwise an empty string.
 */
export const validateInput = (
    input: string,
    regex: RegExp,
    maxLength: number
  ): string => {
    if (input.length > maxLength) {
      return `Input exceeds the maximum length of ${maxLength} characters.`;
    }
    if (!regex.test(input)) {
      return `Input contains invalid characters.`;
    }
    return '';
  };
  
  /**
   * Validates a dropdown selection.
   * @param value The selected value.
   * @param allowedValues Array of allowed values.
   * @returns An error message if the selection is invalid, otherwise an empty string.
   */
  export const validateDropdown = (value: string, allowedValues: string[]): string => {
    if (!allowedValues.includes(value)) {
      return 'Invalid selection.';
    }
    return '';
  };
  