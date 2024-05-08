import requests
from bs4 import BeautifulSoup

import pandas as pd

url = 'https://www.imdb.com/chart/top/'
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'}

response = requests.get(url, headers=headers, timeout=(5.05, 22))
print(f'HTTP GET status code for base url https://www.imdb.com/chart/top/: {response.status_code}')
## Status code: 200 means everything is OK

page_contents = response.text
soup = BeautifulSoup(page_contents, 'html.parser')

movie_lists_html = soup.find_all('li', class_='ipc-metadata-list-summary-item')
print(f"Number of movies: {len(soup.find_all('li', class_='ipc-metadata-list-summary-item'))}")

## get the names of the movies 
movie_names = []

for i in range(250):
    movie_names.append(movie_lists_html[i].find('div', class_='cli-children').find('a').find('h3').text.split('.')[1].strip())
    
year_of_release = []
time_span = []
certi_type = []

for i in range(250):
    try:
        year_of_release.append(movie_lists_html[i].find('div', class_='cli-children').find('div', class_='cli-title-metadata').find_all('span', class_='cli-title-metadata-item')[0].text)
    except IndexError:
        year_of_release.append('')
    try:
        time_span.append(movie_lists_html[i].find('div', class_='cli-children').find('div', class_='cli-title-metadata').find_all('span', class_='cli-title-metadata-item')[1].text)
    except IndexError:
        time_span.append('')
    try:
        certi_type.append(movie_lists_html[i].find('div', class_='cli-children').find('div', class_='cli-title-metadata').find_all('span', class_='cli-title-metadata-item')[2].text)
    except IndexError:
        certi_type.append('')

def sep(txt):
    rating, num_votes = txt.split('\xa0')[0], txt.split('\xa0')[1][1:-1]
    return rating, num_votes

rating = []
num_votes = []

for i in range(250):
    res = sep(movie_lists_html[i].find('div', class_='cli-children').find('span', class_='ipc-rating-star ipc-rating-star--base ipc-rating-star--imdb ratingGroup--imdb-rating').text)
    rating.append(res[0])
    num_votes.append(res[1])


# Visiting each movie url to collect director, writer and actor details
base_url = 'https://www.imdb.com'

genres = []
directors = []
# writers = []
actors = []

for i in range(250):
    movie_link = base_url + movie_lists_html[i].find('div', class_='cli-children').find('a')['href']

    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'}
    response = requests.get(movie_link, headers=headers, timeout=(5.05, 22))

    # print(f'status code for movie url: {response.status_code}')
    parse = BeautifulSoup(response.text, 'html.parser')

    genre = parse.find('div', class_='ipc-chip-list--baseAlt ipc-chip-list')
    director = parse.find_all('li', class_='ipc-metadata-list__item')[0]
    # writer = parse.find_all('li', class_='ipc-metadata-list__item')[1]
    star = parse.find_all('li', class_='ipc-metadata-list__item')[2]

    genres_list = []
    for item in genre.find_all('span', class_='ipc-chip__text'):
        genres_list.append(item.text + ' ')

    director_list = []
    for item in director.find_all('a', class_='ipc-metadata-list-item__list-content-item ipc-metadata-list-item__list-content-item--link'):
        director_list.append(item.text + ' ')

    # writers_list = []
    # for item in writer.find_all('a', class_='ipc-metadata-list-item__list-content-item ipc-metadata-list-item__list-content-item--link'):
    #     writers_list.append(item.text + ' ')

    stars_list = []
    for item in star.find_all('a', class_='ipc-metadata-list-item__list-content-item ipc-metadata-list-item__list-content-item--link'):
        stars_list.append(item.text + ' ')
        
    genres.append(genres_list)
    directors.append(director_list)
    # writers.append(writers_list)
    actors.append(stars_list)

data = {
    'movie_name': movie_names,
    'released_year': year_of_release,
    'duration': time_span,
    'certificate_type': certi_type,
    'rating': rating,
    'rating_count': num_votes,
    'directors': directors,
    'genres': genres,
    'actors': actors
}

movie_df = pd.DataFrame(data)
movie_df.to_csv('Top-250-movies.csv')
print(movie_df)