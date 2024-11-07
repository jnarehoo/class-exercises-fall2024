import requests
from bs4 import BeautifulSoup

def main():
    print("hello world")
    # user_agent makes it seem like the request is coming from a web browser (versus a bot)
    user_agent = {'User-agent': 'Mozilla/5.0'}
    response = requests.get("https://new.cs.unca.edu/", headers=user_agent)
    
    # html objects
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Chat GPT code
    # Find all anchor tags
    links = soup.find_all('a')
    
    # Loop through the anchor tags and print their URLs
    for link in links:
        url = link.get('href')
        if url:  # Check if href attribute exists
            print(url)

    #print(response.content)

if __name__ == "__main__":
    main()

