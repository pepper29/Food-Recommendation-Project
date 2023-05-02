from re import search
from flask import Blueprint, jsonify, request
from models.movie import Movie
from app import hashtag_col

bp = Blueprint('detail',__name__)

@bp.route("/detail/get_detail", methods=['GET'])
def get_detail():
    movie_id = request.args.get('movie_id')

    movie_detail = get_movie_detail(movie_id)
    total_detail = get_total_detail(movie_id)

    return jsonify(movie_detail, total_detail)

@bp.route("/detail/get_platform", methods=['POST'])
def get_platform():
    movie_id = request.json['movie_id']
    platform = request.json['platform']

    movie_detail = get_movie_detail(movie_id)
    total_detail = get_total_detail(movie_id)

    return jsonify(movie_detail, total_detail)


def get_movie_detail(movie_id):
    filtered_movie = Movie.query.filter(Movie.id == movie_id).first()

    searched_movie = {
        "title": filtered_movie.title,
        "release_date": filtered_movie.release_date,
        "actor": filtered_movie.actor,
        "director": filtered_movie.director,
        "summary": filtered_movie.summary,
        "running_time": filtered_movie.running_time,
        "poster": filtered_movie.poster,
        "genre": filtered_movie.genre,
        "rating": filtered_movie.rating
    }

    return searched_movie

def get_total_detail(movie_id):
    filtered_movie = Movie.query.filter(Movie.id == movie_id).first()

    searched_movie = {
        "score": filtered_movie.score,
        "naver": filtered_movie.naver,
        "daum": filtered_movie.daum,
        "watcha": filtered_movie.watcah,
        "cine21": filtered_movie.cine21
    }

    return searched_movie

@bp.route('/detail/wc')
def wc():
    movie_id = request.json.get('movie_id')

    cur = hashtag_col.find({"movie_id": movie_id})
    return jsonify({
        'total': cur['total'],
        'naver':cur['naver'],
        'daum':cur['daum'],
        'watcha':cur['watcha'],
        'cine21':cur['cine21']
    })