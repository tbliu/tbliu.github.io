# This script takes in a .txt file of book quotes that I manually create, and converts it into html
# to be read on the website
# usage: python3 blog_quote_script.py <filename>

import sys
from typing import List

# Converts to an html string to be saved to a file
def convert_to_html_string(title: str, quotes: List[str]) -> str:
    # Need to convert the list of quotes into a single string otherwise
    # insertng ['a', 'b', 'c'] will also insert the brackets in the list too.
    # Why didn't I just make quotes a string in the ingest function you ask? idk
    quotes = ''.join(quotes)

    return f"""
    <!DOCTYPE html>
    <html lang="en">
      <head>
          <link rel="stylesheet" href="../styles.css">
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>{title}</title>
        </head>
        <div class="index">
          <div class="body">
            <h1 class="title">{title}</h1>
            <ul>
            {quotes}
            </ul>
          </div>
        </div>
        <p id="blog-footer"><a href="/blog">←</a></p>

    </html>
    <!DOCTYPE HTML>
    """

# Remove txt prefix:
# "- Foo Bar" => "Foo Bar"
def remove_prefix(line: str) -> str:
    prefix = "- "
    if (line.startswith(prefix)):
        return line[len(prefix):]
    return line


# Reads the .txt file and returns its title and each subsequent line as a list of strings
def ingest_txt_file(filename: str) -> (str, List[str]):
    with open(filename, "r") as f:
        txt_line_prefix = "- "
        lines = f.readlines()
        title = lines[0]
        _ = lines[1] # will be a newline
        list_item_prefix = "<li>"
        list_item_suffix = "</li>"
        quotes = []
        curr_quote = ""

        i = 2
        while i < len(lines):
            line = remove_prefix(lines[i].strip())

            # If, after stripping the whitespace/prefix from the string, we have an empty string
            # then the previous line we were working on is finished and should be added to `quotes`
            if (line == ""):
                quotes.append(list_item_prefix + curr_quote + list_item_suffix)
                curr_quote = ""

            # If the current quote is not empty, then we are continuing from a previous line.
            # These should be separated from the previous line with a <br /> tag
            elif (curr_quote != ""):
                curr_quote += "<br />" + line
           
            # Otherwise, if line != "" and curr_quote == "", we are starting a new line
            else:
                curr_quote = line

            i += 1

    return (title, quotes)

def write_html_file(filename: str, contents: str) -> int:
    with open(filename, "w") as f:
        f.write(contents)
    return 0


def main():
    if len(sys.argv) != 2:
        print("Error: Requires one .txt file to parse. Example: python3 blog_quote_script.py <filename.txt>")
        return 1

    filename = sys.argv[1]

    (title, quotes) = ingest_txt_file(filename)
    html_string = convert_to_html_string(title, quotes)

    # Save to html file
    html_filename = filename[:filename.index(".txt")] + ".html"
    write_html_file(html_filename, html_string)

    return 0

main()
