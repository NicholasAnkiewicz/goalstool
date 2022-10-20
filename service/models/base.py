from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()

#TODO: move to api 
engine = create_engine('sqlite:///app.db?check_same_thread=False', echo=True)
