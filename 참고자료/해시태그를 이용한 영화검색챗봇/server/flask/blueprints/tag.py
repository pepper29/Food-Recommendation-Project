from flask import Blueprint, jsonify
from random import shuffle
from app import hashtag_col

bp = Blueprint('tag',__name__)

@bp.route('/tag', methods=['GET'])
def get_tags():
    QUERY = 15 # 넘겨줘야 할 태그 수
    
    # total_tag 검색
    cur = hashtag_col.find_one({'movie_id': 0})
    total_tag = []
    print(cur)
    # for i in cur:
    #     print(i)
    #     total_tag.append(i)
    # total_tag = total_tag[0]
    # total_tag = total_tag['content']
    # total_tag = total_tag.split(',')
    # N = len(total_tag)

    # 인덱스 무작위 셔플
    # idxs = list(range(N))
    # shuffle(idxs)
    
    # # 무작위 셔플된 인덱스로 total tag에서 인덱싱
    # random_tag = []
    # for i in idxs[:QUERY]:
    #     random_tag.append(total_tag[i])
        
    return "jsonify(random_tag)"
