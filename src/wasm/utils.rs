// like export const to_uppercase_custom-> use utils::to_uppercase_custom;
pub fn to_uppercase_custom(arg: &str) -> String {
    arg.to_uppercase()
}

//  like export default string -> se crate::utils::string::_to_uppercase_custom;
mod string {
    pub fn _to_uppercase_custom(arg: &str) -> String {
        arg.to_uppercase()
    }
}

#[cfg(test)]
mod tests {
    // access to utils pub fn
    use super::*;
    // access to utils string fn
    use crate::utils::string::_to_uppercase_custom;

    #[test]
    fn test_case_to_uppercase_custom() {
        let cases = vec![
            ("", ""),
            ("a", "A"),
            ("abc", "ABC"),
            ("Abc", "ABC"),
            ("aBC", "ABC"),
            ("AbC", "ABC"),
            ("aBc", "ABC"),
            ("Abc123", "ABC123"),
        ];

        for (input, expected) in cases {
            assert_eq!(to_uppercase_custom(input), expected);
        }
    }

    #[test]
    fn test_case_to_uppercase_custom_string() {
        let cases = vec![
            ("", ""),
            ("a", "A"),
            ("abc", "ABC"),
            ("Abc", "ABC"),
            ("aBC", "ABC"),
            ("AbC", "ABC"),
            ("aBc", "ABC"),
            ("Abc123", "ABC123"),
        ];

        for (input, expected) in cases {
            assert_eq!(_to_uppercase_custom(input), expected);
        }
    }
}
