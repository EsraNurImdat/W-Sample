import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import csv
import random
from sklearn.cluster import DBSCAN
from sklearn.feature_extraction.text import TfidfVectorizer

unique_urls = set()
visited_urls = set()
error_messages = set()

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
                    next_url = urljoin(input_url, a_tag.get('href'))

                if next_url not in unique_urls and 'mailto' not in next_url and 'javascript' not in next_url and url in next_url:
                    unique_urls.add(next_url)
                    print("Next Url:", next_url)
                    write_to_csv(next_url)

                crawl_url(next_url, depth - 1, input_url)
    except Exception as e:
        print(f"Error: {str(e)}")

def write_to_csv(url):
    with open('urls.csv', 'a', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['URL']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        writer.writerow({'URL': url})



def clear_csv():
    open('urls.csv', 'w').close()  



def crawl_and_save(input_url, max_depth):
    unique_urls.clear()
    visited_urls.clear()
    error_messages.clear()
    clear_csv()
    crawl_url(input_url, max_depth, input_url)

    with open("output.csv", 'w') as csv_file:
        writer = csv.writer(csv_file)
        for url in unique_urls:
            writer.writerow([url])
    
    return unique_urls
"""
def crawl_url(url, depth, main_url):
    if url in visited_urls or depth == 0 or not is_same_domain(url, main_url):
        return
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        if response.status_code == 200:
            visited_urls.add(url)
            soup = BeautifulSoup(response.text, 'html.parser')
            a_tags = soup.find_all('a', href=True)
            
            for a_tag in a_tags:
                next_url = a_tag.get('href')
                
                if not next_url:
                    continue
                
                if not next_url.startswith('http'):
                    next_url = urljoin(url, next_url)
                
                if is_same_domain(next_url, main_url) and next_url not in unique_urls and 'mailto' not in next_url and 'javascript' not in next_url:
                    unique_urls.add(next_url)
                    print("Next Url:", next_url)
                    
                    crawl_url(next_url, depth - 1, main_url)
                    
    except requests.exceptions.RequestException as e:
        print(f"Failed to crawl the page: {url}. Error: {e}")
        message = f"Failed to crawl the page: {url}. Error: {e}"
        error_messages.add(message)
    except Exception as e:
        print(f"Error while processing {url}: {e}")
        message = f"Error while processing {url}: {e}"
        error_messages.add(message)

def is_same_domain(url, main_url):
    main_domain = urlparse(main_url).netloc
    url_domain = urlparse(url).netloc
    return main_domain == url_domain

def crawl_and_save(input_url, max_depth):
    unique_urls.clear()
    error_messages.clear()
    crawl_url(input_url, max_depth, input_url)

    with open("output.csv", 'w') as csv_file:
        writer = csv.writer(csv_file)
        for url in unique_urls:
            writer.writerow([url])
    
    return unique_urls
"""

def ten_percent(unique_urls):
    urls_list = list(unique_urls)
    num_of_ten_percent = int(len(urls_list) * 0.1)
    selected_urls = random.sample(urls_list, num_of_ten_percent)
    return selected_urls

def get_html(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        if response.status_code == 200:
            return response.text
        else:
            print(f"Failed to retrieve the page: {url}. Status code: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"Failed to retrieve the page: {url}. Error: {e}")
    except Exception as e:
        print(f"Error while retrieving {url}: {e}")
    
    return None

def extract_html_structure(html_content):
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
        html_content = get_html(url)
        if html_content:
            html_structure = extract_html_structure(html_content)
            html_contents.append(html_structure)

    vectorizer = TfidfVectorizer(stop_words='english')
    X = vectorizer.fit_transform(html_contents)

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
        seperated_clusters[cluster].append(url)
    return seperated_clusters

def cluster_sampler(seperated_clusters):
    cluster_samples = []
    i = 0
    for cluster in seperated_clusters:
        rand = random.randint(0, len(cluster)-1)
        cluster_samples.append(seperated_clusters[i][rand])
        i += 1
    return cluster_samples

