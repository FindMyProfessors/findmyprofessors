import re

def extract_course_codes(file_path):
    with open(file_path, 'r') as file:
        html_content = file.read()

    # Regular expression to match course codes
    course_codes = re.findall(r'name="([A-Z]{3}) -', html_content)

    # Remove duplicates by converting the list to a set and back to a list
    unique_course_codes = list(set(course_codes))

    return unique_course_codes


if __name__ == "__main__":
    import sys
    if len(sys.argv) != 2:
        print("Usage: python extract_course_codes.py <file_path>")
        sys.exit(1)

    file_path = sys.argv[1]
    codes = extract_course_codes(file_path)
    print(codes)
    print(len(codes))