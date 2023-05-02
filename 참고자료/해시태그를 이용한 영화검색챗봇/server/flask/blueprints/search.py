from flask import Blueprint, jsonify, request
from models.movie import Movie
from app import db


bp = Blueprint('search', __name__)

@bp.route('/search', methods=['POST'])
def search_title():
    
    title = request.json.get('title') # 검색할 제목
    page = request.json.get('page')  # 몇번째 페이지(offset), 0부터 시작
    sort = request.json.get('sort') # 정렬기준
    N = request.json.get('N') # 한번에 보여줄 개수, 프론트엔드 개발할 때 편하도록
    
    # title의 키워드가 들어있는 영화를 모두 검색    
    query_result = db.session.query(Movie).filter(Movie.title.like(f"%{title}%"))
    
    # sort 최신순이 있는 경우, 개봉일을 기준으로 정렬
    if sort == "recent":
        query_result = query_result.order_by(Movie.release_date.desc())
        
    # page별로 N개씩 반환
    query_result = query_result.limit(N).offset(N*page)
    query_result = [i.to_dict() for i in query_result]

    if not query_result:
        return "", 204
    
    return jsonify(query_result), 200