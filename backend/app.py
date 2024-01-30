"""Flask app for sharebandb backend"""

import os
from dotenv import load_dotenv

from flask import Flask
from flask_debugtoolbar import DebugToolbarExtension
from models import connect_db

load_dotenv()

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
app.config['SQLALCHEMY_ECHO'] = False
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
toolbar = DebugToolbarExtension(app)

connect_db(app)

################################################################################


@app.get('/listings')
def get_listings():
    """Makes a request to database for details about all listings
        Returns [ {id, name, description, price},... ]
    """

@app.get('/listings/<int:listing_id>')
def get_listing(listing_id):
    """Makes a request to database for details about a certain listing
        Returns
        {
            id,
            name,
            description,
            price,
            photos:
            [{
                id,
                description,
                s3_location
            }]
        }
    """

@app.post('/listings/new')
def add_listing():
    """Add a new listing to database
    Input
        {
            name,
            description,
            price,
            photos: [
                {
                    file path,
                    descriptions
                }
            ]
        }

    Return
    {
        name,
        description,
        price,
        photos: URL location
    }
    """
