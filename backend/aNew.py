import requests

from urllib.parse import urlparse

unique_urls = set()
visited_urls = set()

def get_html_content(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.text
    except requests.exceptions.RequestException as e:
        print(f"Failed to retrieve the page: {url}. Error: {e}")
        return None

def check_root_directory(url):
    parsed_url = urlparse(url)
    if parsed_url.path == '/' or parsed_url.path == '':
        return 1
    else:
        return 0

def check_link(url, keyword_count, keywords):
    parsed_url = urlparse(url)
    path = parsed_url.path
    for i in range(0, len(keywords)):
        for word in keywords[i]:
            if word in path:
                keyword_count[i] += 3
    return keyword_count
def check_for_keywords(url, required_pages, keywords):
    keyword_count = [0, 0, 0, 0, 0, 0]
    keyword_count = check_link(url, keyword_count, keywords)
    if check_root_directory(url) == 1:
        required_pages.append(url)
        return required_pages
    for i in range(0, len(keyword_count)):
        if keyword_count[i] >= 3:
    #        required_pages[i].append(url)
             required_pages.append(url)

    return required_pages

def find_required_pages(keywords, unique_urls, url):
    required_pages = []
    #for i in range(0, len(keywords)):
    #    required_pages.append([])

    for item in unique_urls:

        html_content= get_html_content(item)
        if html_content is not None:

            required_pages = check_for_keywords(item, required_pages, keywords)

    return required_pages
