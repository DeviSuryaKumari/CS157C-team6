import requests
from bs4 import BeautifulSoup
import pandas as pd

url = 'https://www.imdb.com/chart/top/'
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'}

response = requests.get(url, headers = headers, timeout = (5.05, 22))
## Status code: 200 means everything is OK
print(f'HTTP GET status code for base url https://www.imdb.com/chart/top/: {response.status_code}')


page_contents = response.text
soup = BeautifulSoup(page_contents, 'html.parser')

movie_lists_html = soup.find_all('li', class_='ipc-metadata-list-summary-item')
print(f"Number of movies: {len(movie_lists_html)}")

def sep(txt):
    rating, num_votes = txt.split('\xa0')[0], txt.split('\xa0')[1][1:-1]
    return rating, num_votes

movie_names = []
posters = []
rating = []
num_votes = []
year_of_release = []
time_span = []
certi_type = []

for i in range(250):
    movie_names.append(movie_lists_html[i].find('div', class_='cli-children').find('a').find('h3').text.split('.')[1].strip())
    posters.append(movie_lists_html[i].find('img', class_='ipc-image')['src'])
    res = sep(movie_lists_html[i].find('div', class_='cli-children').find('span', class_='ipc-rating-star ipc-rating-star--base ipc-rating-star--imdb ratingGroup--imdb-rating').text)
    rating.append(res[0])
    num_votes.append(res[1])

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


# Visiting each movie url to collect movie description, genres, director, actor details
base_url = 'https://www.imdb.com'

genres = []
plots = []

directors = []
movies_d = []

actors = []
movies_a = []

for i in range(250):
    movie_link = base_url + movie_lists_html[i].find('div', class_='cli-children').find('a')['href']
    response = requests.get(movie_link, headers = headers, timeout = (5.05, 22))

    # print(f'status code for movie url: {response.status_code}')
    parse = BeautifulSoup(response.text, 'html.parser')

    genre = parse.find('div', class_='ipc-chip-list--baseAlt ipc-chip-list')
    director = parse.find_all('li', class_='ipc-metadata-list__item')[0]
    actor = parse.find_all('li', class_='ipc-metadata-list__item')[2]

    plot = parse.find('p', attrs={'data-testid': 'plot'})
    plot_text = plot.find('span', attrs={'data-testid': 'plot-xs_to_m'}).text
    
    genres_list = []
    for item in genre.find_all('span', class_='ipc-chip__text'):
        genres_list.append(item.text)
    genres_list = '|'.join(genres_list)

    for item in director.find_all('a', class_='ipc-metadata-list-item__list-content-item ipc-metadata-list-item__list-content-item--link'):
        directors.append(item.text)
        movies_d.append(movie_names[i])

    for item in actor.find_all('a', class_='ipc-metadata-list-item__list-content-item ipc-metadata-list-item__list-content-item--link'):
        actors.append(item.text)
        movies_a.append(movie_names[i])
        
    genres.append(genres_list)
    plots.append(plot_text)

movie_data = {
    'movie_title': movie_names,
    'poster': posters,
    'released_year': year_of_release,
    'duration': time_span,
    'certificate_type': certi_type,
    'rating': rating,
    'rating_count': num_votes,
    'genres': genres,
    'plot': plots
}

actor_data = {
    'actor': actors,
    'movie': movies_a
}

director_data = {
    'director': directors,
    'movie': movies_d
}

movie_df = pd.DataFrame(movie_data)
actor_df = pd.DataFrame(actor_data)
director_df = pd.DataFrame(director_data)

movie_df.to_csv('movies.csv', index = False)
actor_df.to_csv('actors.csv', index = False)
director_df.to_csv('directors.csv', index = False)

print(movie_df)
# print(actor_df)
# print(director_df)