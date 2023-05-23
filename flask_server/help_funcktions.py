import re

def decipher_filename(filename):
    # Define regex patterns for course code and date
    course_code_pattern = r"[A-Za-z]{2}\d{4}"
    date_pattern = r"\d{4}\d{2}\d{2}"
    date_pattern2 = r"\d{4}-\d{2}-\d{2}"
    date_pattern3 = r"\d{4}_\d{2}_\d{2}"

    # Search for course code and date in the filename
    course_code = re.search(course_code_pattern, filename)
    date = re.search(date_pattern, filename)
    date2 = re.search(date_pattern2, filename)
    date3 = re.search(date_pattern3, filename)

    # Extract the matched strings
    course_code = course_code.group(0) if course_code else ""
    if not date and not date2 and not date3:
        date = ""
    elif date:
        date = date.group(0)
    elif date2:
        date = date2.group(0)
    elif date3:
        date = date3.group(0)
    print(date)
    return date, course_code