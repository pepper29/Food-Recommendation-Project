import mongoengine as mongodb
class Tag(mongodb.Document):
    movie_id = mongodb.IntField(required=True)
    total = mongodb.StringField(Required=True)
    naver = mongodb.StringField(Required=True)
    daum = mongodb.StringField(Required=True)
    watcha = mongodb.StringField(Required=True)
    cine21 = mongodb.StringField(Required=True)
    
    # def __init__(self, movie_id,total, naver, daum, watcha, cine21):
    #     self.movie_id = movie_id
    #     self.total = total
    #     self.naver = naver
    #     self.daum = daum
    #     self.watcha = watcha
    #     self.cine21 = cine21
    
    def to_json(self):
        return {"movie_id": self.movie_id,
                "total": self.total,
                "naver": self.naver,
                "daum": self.daum,
                "watcha": self.watcha,
                "cine21": self.cine21}
