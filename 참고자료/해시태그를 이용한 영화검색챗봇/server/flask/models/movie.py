from app import db

class Movie(db.Model):
    __tablename__ = "movie"
    id = db.Column(db.Integer, primary_key=True)
    # 크롤링 정보
    title = db.Column(db.String(50), nullable=False)
    release_date = db.Column(db.Date)
    actor = db.Column(db.String(200))
    director = db.Column(db.String(50))
    summary = db.Column(db.Text)
    running_time = db.Column(db.Integer)
    poster = db.Column(db.String(200))
    genre = db.Column(db.String(50))
    rating = db.Column(db.String(50))
    nation = db.Column(db.String(50))
    
    # 계산하여 update할 정보
    score = db.Column(db.Float)
    naver = db.Column(db.Float)
    daum = db.Column(db.Float)
    watcha = db.Column(db.Float)
    cine21 = db.Column(db.Float)
    
    
    def __init__(self,
                title,
                release_date,
                actor,
                director,
                summary,
                running_time,
                poster,
                genre,
                rating,
                nation):        
        self.title = title
        self.release_date = release_date
        self.actor = actor
        self.director = director
        self.summary = summary
        self.running_time = running_time
        self.poster = poster,
        self.genre = genre
        self.rating = rating
        self.nation = nation
        self.score = 0
        self.naver = 0
        self.daum = 0
        self.watcha = 0
        self.cine21 = 0
        
    def to_dict(self):
        return {x.name: getattr(self, x.name) for x in self.__table__.columns}