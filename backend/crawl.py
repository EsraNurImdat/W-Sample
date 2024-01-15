#Python using the requests library for making HTTP requests
import requests
#BeautifulSoup is a Python library for pulling data out of HTML and XML files.
from bs4 import BeautifulSoup #The BeautifulSoup library for HTML parsing.
from urllib.parse import urljoin
import csv



from sklearn.cluster import DBSCAN
from sklearn.feature_extraction.text import TfidfVectorizer

#The main purpose of the code is to crawl a website starting from a given URL (input_url) and 
#collect unique URLs found within a specified depth (max_depth).
# The collected URLs are then saved to a CSV file specified by the output_csv parameter.

import random

unique_urls = set() #A set to store unique URLs encountered during crawling.
visited_urls = set() # A set to keep track of URLs that have already been visited to avoid revisiting them.


#This function takes three parameters: url (current URL to crawl), depth (remaining depth to crawl), and input_url (the initial URL).
def crawl_url(url, depth, input_url):

    #It checks if the URL has been visited before or if the depth has reached zero. 
    # This is a mechanism to limit the depth of the web crawling, preventing the crawler from going too deep into the website.
    if url in visited_urls or depth == 0:
        return #If so, it returns early.


#I used the try except blog because I wanted the program to continue without terminating in case of any error.
    try:

        #It sends an HTTP request to the given URL and, if the response status code is 200 (OK), it parses the HTML using BeautifulSoup.
        response = requests.get(url) #The requests.get(url) function is called to make an HTTP GET request to the specified URL. It returns a Response object.
        if response.status_code == 200:
            #Adds the current url to the set of visited URLs, marking it as processed.
            visited_urls.add(url)

            #1**Creates a BeautifulSoup object to parse the HTML content of the response.
            # 'html.parser' specifies the parser to be used by BeautifulSoup to parse the HTML.
            # In this case, it uses the built-in HTML parser provided by Python.
            soup = BeautifulSoup(response.text, 'html.parser')

            #2** 'soup' contains a structured representation of the HTML document

            #3**searches the HTML content for all <a> tags (which represent hyperlinks) that have an href attribute.
            # The result is a list of all such <a> tags found in the HTML.
            a_tags = soup.find_all('a', href=True)
           
           #4**AFter It finds all the <a> tags, it extracts the next URL.
            for a_tag in a_tags:
                next_url = a_tag.get('href')

               #5**It is a checkpoint placed to prevent the URL from going to other sites.
                if not 'http' in next_url: #6**The urljoin function will combine these two to create an absolute URL
                    next_url = urljoin(input_url, a_tag.get('href'))
#7**This is important because HTML documents often contain relative URLs, and when crawling, we want to convert them into absolute URLs to ensure correct navigation.

#8**The next URL is added to the unique_urls set, and the function is called recursively with the new URL and depth.
                    if next_url not in unique_urls:
                        unique_urls.add(next_url)
                        print("Next Url:", next_url)

                    crawl_url(next_url, depth - 1, input_url)
    except Exception as e:
        print(f"Error: {str(e)}")
#I used the try except blog because I wanted the program to continue without terminating in case of any error.


#9**This function is responsible for initiating the crawling process using crawl_url and then saving the collected URLs to a CSV file. This will help us when we connet python flask.
def crawl_and_save(input_url, max_depth):
    #10**It calls crawl_url with the initial URL, maximum depth, and input URL.
    crawl_url(input_url, max_depth, input_url)

   #11**After crawling, it opens a CSV file (output_csv) in write mode and uses the csv.writer to write each URL from the unique_urls set into a separate row in the CSV file.
    with open("output_csv", 'w') as csv_file:
        writer = csv.writer(csv_file)
        for url in unique_urls:
            writer.writerow([url])
    
    return unique_urls

def ten_percent(unique_urls):
    urls_list = list(unique_urls)
    num_of_ten_percent = int(len(urls_list) * 0.1)
    selected_urls = random.sample(urls_list, num_of_ten_percent)
    return selected_urls

def get_html(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raises an HTTPError for bad responses (4xx and 5xx)
        
        if response.status_code == 200:
            return response.text
    except requests.exceptions.RequestException as e:
        print(f"Failed to retrieve the page: {url}. Error: {e}")
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
        #temp = [url, cluster]
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