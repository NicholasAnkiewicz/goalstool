from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()

#TODO: move to api 
engine = create_engine('sqlite:///:memory:', echo=True)

Base.metadata.create_all(engine)
