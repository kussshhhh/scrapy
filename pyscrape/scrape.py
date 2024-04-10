import requests
import sqlite3
import datetime

from bs4 import BeautifulSoup
def extract_numbers(text):
  numbers = "".join(char for char in text if char.isdigit())
  return numbers

def scrape_rent_prices(url):
  """Scrapes rent prices from the given website URL and returns them as an array.

  Args:
      url: The URL of the website to scrape.

  Returns:
      A list containing the scraped rent prices (or an empty list if no prices are found).
  """

  try:
    # Make a GET request to the website
    response = requests.get(url)
    response.raise_for_status()  # Raise an exception for non-200 status codes

    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(response.content, 'html.parser')
    # print(soup)

    # Find all elements with the specified class structure (replace with actual classes from website)
    price_elements = soup.find_all('div', class_=['mb-srp__card__price--amount'])  # Modify class names based on website

    # Extract rent prices from the elements (replace with actual data extraction logic)
    rent_prices = []
    for element in price_elements:
      # Extract text or attributes containing the price value
      price_text = element.text.strip()  # Assuming price is directly in the text content
      # You might need to use element.attrs['data-p rice'] or similar if stored in an attribute
      price_text = extract_numbers(price_text) 
      if price_text != "" and int(float(price_text)) < 1000:
            price_text+= "000"
      if price_text != "" :
        rent_prices.append(price_text)
      # if len(rent_prices) >= 20  :
      #   break 
      

    return rent_prices

  except requests.exceptions.RequestException as e:
    print(f"Error: An error occurred while scraping the website: {e}")
    return []  # Return an empty list on error

# Example usage (replace with the actual website URL)
url = "https://www.magicbricks.com/flats-for-rent-in-bangalore-pppfr/page-"



# rent_prices = scrape_rent_prices(url1)
ans  = []

for i in range(1, 20):
  url1 = url + str(i) 
  rent_prices = scrape_rent_prices(url1)

  if rent_prices:
    for el in rent_prices:
      ans.append(el)


  

if ans:
  for price in ans:
    print(price)

ans.sort() 

median = str(ans[int((len(ans) - 1)/2)] ) 

conn = sqlite3.connect('median.db') 
cursor = conn.cursor()

today = datetime.date.today()

f = open('scrapy/pyscrape/src/data.txt', 'a') ;
f.write(median+"\n") ;
f.close()





