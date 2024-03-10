import requests
import re
from bs4 import BeautifulSoup
from urllib.parse import urlparse

def get_html_content(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.text, response
    except requests.exceptions.RequestException as e:
        print("Error fetching HTML content:", e)
        return 0

def check_root_directory(url):
    parsed_url = urlparse(url)
    if parsed_url.path == '/' or parsed_url.path == '':
        return 1
    else:
        return 0

def check_link(response, keyword_count):
    parsed_url = urlparse(response.url)
    path = parsed_url.path
    for i in range(0, len(keywords)):
        for word in keywords[i]:
            if word in path:
                keyword_count[i] += 3
    return keyword_count
def check_for_keywords(response, required_pages, html_content, keywords):
    keyword_count = [0, 0, 0, 0, 0, 0]
    keyword_count = check_link(response, keyword_count)
    if check_root_directory(response.url) == 1:
        required_pages[0].append(response.url)
        return required_pages
    soup = BeautifulSoup(html_content, "html.parser")
    for text in soup.find_all(string=True):
        if text.parent.name != "a":
            for i in range(0, len(keywords)):
                for word in keywords[i]:
                    keyword_count[i] += len(re.findall(rf"\b{word}\b".format(word), text, re.IGNORECASE))
    for i in range(0, len(keyword_count)):
        if keyword_count[i] >= 3:
            required_pages[i].append(response.url)
    return required_pages

def find_required_pages(response, html_content, keywords):
    required_pages = []
    for i in range(0, len(keywords)):
        required_pages.append([])
    required_pages = check_for_keywords(response, required_pages, html_content, keywords)
    return required_pages


keywords = [["home"],
            ["login", "sign in", "signin", "login"],
            ["sitemap"],
            ["contact"],
            ["help"],
            ["legal information", "terms and conditions", "privacy policy"]]

#url = ("https://www.starlight.org/hub")
url = ("https://www.amazon.com.tr/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com.tr%2Fref%3Dnav_ya_signin&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=trflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0")
html_content, response = get_html_content(url)
#string = " home <a> sitemap</a> <a href='login'> login</a> login""
required_pages_list = find_required_pages(response, html_content, keywords)
print(required_pages_list)
soup = BeautifulSoup(html_content, "html.parser")
print(soup)
#keyword_count = check_for_keywords(response, keyword_count, html_content, keywords)

