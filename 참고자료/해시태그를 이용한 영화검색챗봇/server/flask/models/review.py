import mongoengine as mongodb
class Review(mongodb.Document):
    movie_id = mongodb.IntField(required=True)
    score = mongodb.IntField()
    content = mongodb.StringField(Required=True)
    write_date = mongodb.DateTimeField()
    source_site = mongodb.IntField()
    
    def to_json(self):
        return {"movie_id": self.movie_id,
                "score": self.score,
                "content": self.content,
                "write_date": self.write_date,
                "source_site": self.source_site}