import requests
from bs4 import BeautifulSoup
import csv
import random
import re

from sklearn.cluster import DBSCAN
from sklearn.feature_extraction.text import TfidfVectorizer

from urllib.parse import urlparse

unique_urls = set()
visited_urls = set()

"""def get_html_content(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.text, response
    except requests.exceptions.RequestException as e:
        print(f"Failed to retrieve the page: {url} Status code: {response.status_code}")
        return 0 , None"""
def get_html_content(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.text
    except requests.exceptions.RequestException as e:
        print(f"Failed to retrieve the page: {url}. Error: {e}")
        return None
"""def get_html_content(url):
    response = requests.get(url)
    if response.status_code == 200:
        return response.text
    else:
        print(f"Failed to retrieve the page: {url} Status code: {response.status_code}")
        return None"""

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
        required_pages[0].append(url)
        return required_pages
    """soup = BeautifulSoup(html_content, "html.parser")
    for text in soup.find_all(string=True):
        if text.parent.name != "a" or text.parent.name != "nav":
            for i in range(0, len(keywords)):
                for word in keywords[i]:
                    keyword_count[i] += len(re.findall(rf"\b{word}\b".format(word), text, re.IGNORECASE))"""
    for i in range(0, len(keyword_count)):
        if keyword_count[i] >= 3:
            required_pages[i].append(url)
    return required_pages

def find_required_pages(keywords, unique_urls, url):
    required_pages = []
    for i in range(0, len(keywords)):
        required_pages.append([])
    for item in unique_urls:

        html_content= get_html_content(item)
        """if html_content!=0:
            required_pages = check_for_keywords(response, required_pages, html_content, keywords)"""
        if html_content is not None:

            required_pages = check_for_keywords(item, required_pages, keywords)

    return required_pages

def crawl_url(url, depth, input_url):
    if url in visited_urls or depth == 0:
        return

    try:
        response = requests.get(url)
        if response.status_code == 200:
            visited_urls.add(url)
            soup = BeautifulSoup(response.text, 'html.parser')
            a_tags = soup.find_all('a', href=True)

            for a_tag in a_tags:
                next_url = a_tag.get('href')

                if not 'http' in next_url:
                    next_url = input_url + next_url

                    if next_url not in unique_urls:
                        unique_urls.add(next_url)
                        print("Next Url:", next_url)

                    crawl_url(next_url, depth - 1, input_url)
    except Exception as e:
        print(f"Error: {str(e)}")

def crawl_and_save(input_url, max_depth, output_csv):
    crawl_url(input_url, max_depth, input_url)

    with open(output_csv, 'w') as csv_file:
        writer = csv.writer(csv_file)
        for url in unique_urls:
            writer.writerow([url])
#def get_html(url):
#    response = requests.get(url)
#    if response.status_code == 200:
#        return response.text
#    else:
#        print(f"Failed to retrieve the page: {url} Status code: {response.status_code}")
#        return None

def extract_html_structure(html_content):
    #soup = BeautifulSoup(html_content, 'html.parser')
    #soup.prettify()
    soup = BeautifulSoup(html_content, 'html.parser')
    tags = [tag.name for tag in soup.find_all()]

    stringTags = combine_strings_in_order(tags)
    return stringTags

def combine_strings_in_order(string_list):
    combined_string = ' '.join(string_list)
    return combined_string

def cluster_websites(urls):
    html_contents = []

    for url in urls:
        html_content = get_html_content(url)
        if html_content:
            html_structure = extract_html_structure(html_content)
            print("html structure is: ",html_structure)
            html_contents.append(html_structure)

    print("html content listesi: ", html_content)
    vectorizer = TfidfVectorizer(stop_words='english')
    X = vectorizer.fit_transform(html_contents)

    print("X is: ",X)
    dbscan = DBSCAN(eps=0.5, min_samples=1)
    clusters = dbscan.fit_predict(X)

    for url, cluster in zip(urls, clusters):
        print(f"Website: {url} | Cluster: {cluster}")
    return clusters


def cluster_seperator(clusters, urls):
    seperated_clusters = []
    for i in range(0, (max(clusters)+1)):
        seperated_clusters.append([])
    for url, cluster in zip(urls, clusters):
        temp = [url, cluster]
        seperated_clusters[cluster].append(temp)
    return seperated_clusters

def cluster_sampler(seperated_clusters):
    cluster_samples = []
    i = 0
    for cluster in seperated_clusters:
        rand = random.randint(0, len(cluster)-1)
        cluster_samples.append(seperated_clusters[i][rand])
        i += 1
    return cluster_samples

if __name__ == "__main__":
    url = "https://www.who.int/"
    # Set the maximum depth you want to crawl
    maxDepth = 3
    print("----beginning of crawler-----")
    crawl_and_save(url, maxDepth, "P.csv")

    #print("----end of crawl beginning of dbscan------")
    print("Length of list:", len(unique_urls))

    #clusters = cluster_websites(unique_urls)

    #print("-------Seperating the clusters into lists---------")
    #seperated_clusters = cluster_seperator(clusters, unique_urls)
    """for item in seperated_clusters:
        print(item)"""

    """print("-------Getting samples from each list---------")

    cluster_samples = cluster_sampler(seperated_clusters)
    for item in cluster_samples:
        print(item)

    print("----end of dbscan------")"""

    keywords = [["home"],
                ["login", "sign in", "signin", "login"],
                ["sitemap"],
                ["contact"],
                ["help"],
                ["legal information", "terms and conditions", "privacy policy"]]


    #html_content, response = get_html_content(url)
    # string = " home <a> sitemap</a> <a href='login'> login</a> login""
    print("-------Beginning of a---------")
    required_pages_list = find_required_pages(keywords, unique_urls, url)
    print(required_pages_list)
    # keyword_count = check_for_keywords(response, keyword_count, html_content, keywords)