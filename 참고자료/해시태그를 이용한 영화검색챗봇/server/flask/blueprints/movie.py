from flask import Blueprint, jsonify, request
from models.movie import Movie
from utils.tag_search import tag_search
from app import ranking_col, hashtag_col

bp = Blueprint('movie',__name__)

@bp.route("/movie", methods=['GET', 'POST'])
def get_movies():
    if request.method == 'GET':
        search_list = list(ranking_col.find_one({"collection": "ranking"}).values())[2:]

    if request.method == 'POST':
        selected_tags = request.json['selectedTags']
        search_option = request.json['searchOption']

        search_list = tag_search(selected_tags, search_option)

    searched_movie = {}
    index = 0
    for search in search_list:
        filtered_movie = Movie.query.filter(Movie.id == search).first()
        filtered_hashtags = hashtag_col.find_one({"movie_id": search})

        searched_movie[index] = {
            "movie_id": filtered_movie.id,
            "title": filtered_movie.title,
            "poster": filtered_movie.poster,
            "score": filtered_movie.score,
            "hashtags": {
                "total": filtered_hashtags["total"],
                "naver": filtered_hashtags["naver"],
                "daum": filtered_hashtags["daum"],
                "watcha": filtered_hashtags["watcha"],
                "cine21": filtered_hashtags["cine21"]
            }
        }

        index = index+1

    return jsonify(searched_movie)