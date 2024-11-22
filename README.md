# Regex_Tester

Regular expression (regex) strings contain transfer symbols (`\`), which instruct the string to be treated as a raw string. This mode of operation makes it challenging to validate the regex’s functionality. This tool provides a solution to this challenge by enabling the testing of regex strings against input strings.

For instance, consider the raw regex string `\\d{3}`, which differs from the actual regex string `\d{3}`. This tool facilitates testing the raw regex string with the input string.