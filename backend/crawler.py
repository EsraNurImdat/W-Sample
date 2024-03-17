import requests
from bs4 import BeautifulSoup
import csv
import random

from sklearn.cluster import DBSCAN
from sklearn.manifold import TSNE
from sklearn.feature_extraction.text import TfidfVectorizer

unique_urls = set()
visited_urls = set()

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

def get_html(url):
    response = requests.get(url)
    if response.status_code == 200:
        return response.text
    else:
        print(f"Failed to retrieve the page. Status code: {response.status_code}")
        return None
    
# Function to extract the HTML structure using BeautifulSoup and prettify it
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
        html_content = get_html(url)
        if html_content:
            html_structure = extract_html_structure(html_content)
            html_contents.append(html_structure)
            #print(html_structure)

    vectorizer = TfidfVectorizer(stop_words='english')
    X = vectorizer.fit_transform(html_contents)

    tsne = TSNE(n_components=2, init='random')
    X_tsne = tsne.fit_transform(X)

    dbscan = DBSCAN(eps=0.5, min_samples=1)
    #clusters = dbscan.fit_predict(X)
    clusters = dbscan.fit_predict(X_tsne)

    for url, cluster in zip(urls, clusters):
        print(f"Website: {url} | Cluster: {cluster}")

def ten_percent(urls):
    
    urls_list = list(urls)
    num_of_ten_percent = int(len(urls_list) * 0.1)
    selected_urls = random.sample(urls_list, num_of_ten_percent)
    return selected_urls
    

if __name__ == "__main__":
    # Set the maximum depth you want to crawl
    maxDepth = 3
    print("----beginning of crawler-----")
    crawl_and_save("https://ncc.metu.edu.tr/", maxDepth, "P.csv")

    print("----end of crawl beginning of dbscan------")
    # Cluster the websites based on their HTML content
    cluster_websites(unique_urls)
    print("----end of dbscan------")

    print("\n----%10 percent of the crawled sites ------")
    selected_urls = ten_percent(unique_urls)
    for i in selected_urls:
        print(f"Random Link = {i}")