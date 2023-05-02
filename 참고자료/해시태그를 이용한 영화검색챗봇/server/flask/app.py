from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import config
import pymysql
pymysql.install_as_MySQLdb()
db = SQLAlchemy()
cors = CORS()
from pymongo import MongoClient
from config import MONGO_URI
client = MongoClient(MONGO_URI)
mongodb = client.simsimhash
ranking_col = mongodb.ranking
hashtag_col = mongodb.tag
review_col = mongodb.review

def create_app():
    app = Flask(__name__)
    
    app.config.from_object(config)

    # Blueprints
    from blueprints import aboutus, detail, movie, search, tag
    url_prefix='/api'
    app.register_blueprint(aboutus.bp, url_prefix=url_prefix)
    app.register_blueprint(detail.bp, url_prefix=url_prefix)
    app.register_blueprint(movie.bp, url_prefix=url_prefix)
    app.register_blueprint(search.bp, url_prefix=url_prefix)
    app.register_blueprint(tag.bp, url_prefix=url_prefix)
    
    # ORM
    db.init_app(app)
    cors.init_app(app)
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host='0.0.0.0', port=8000, debug=True)