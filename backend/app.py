"""Flask app for sharebandb backend"""

import os
from dotenv import load_dotenv

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Listing

# from flask import Response

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
app.config['SQLALCHEMY_ECHO'] = False
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
toolbar = DebugToolbarExtension(app)

connect_db(app)

################################################################################
# Listings

# @app.before_request
# def basic_authentication():
#     if request.method.lower() == 'options':
#         return Response()

# @app.after_request
# def add_header(response):
#     response.headers['Access-Control-Allow-Origin'] = '*'
#     return response

@app.get('/listings')
def get_listings():
    """Makes a request to database for details about all listings
        Takes a query parameter 'search' to search for listings that fit that
        criteria

        Returns
        { "result": [ {id, name, address, description, price, photos},... ]
    """
    searchParams = request.args.get('search')

    if not searchParams:
        listings = Listing.query.all()
    else:
        listings = Listing.query.filter(
            Listing.name.like(f"%{searchParams}%")).all()

    return jsonify(
        {
            "result": [item.serialize() for item in listings]
        }
    )


@app.get('/listings/<int:listing_id>')
def get_listing(listing_id):
    """Makes a request to database for details about a certain listing
        Returns
        { "result": {
            id,
            name,
            address,
            description,
            price,
            photos:[{ id, description, source, listing_id },...]
        } }
    """
    listing = Listing.query.get_or_404(listing_id)
    return jsonify(
        {
            "result": listing.serialize()
        }
    )

@app.post('/listings/new')
def add_listing():
    """Add a new listing to database
    Input
        {
            name,
            address,
            description,
            price,
            photos: [{ source,description },...]
        }
    Return
    { "added": {
        id,
        name,
        address,
        description,
        price,
        photos: [{ id, description, source, listing_id },...]
    } }
    """

    listing_data = request.json
    print("received request. Listing:", listing_data)

    listing = Listing.add_listing(
        name=listing_data["name"],
        address=listing_data["address"],
        description=listing_data["description"],
        price=listing_data["price"],
        photos=listing_data["photos"],
    )

    db.session.commit()

    # change to return actual result
    return jsonify(
        {
            "added": listing.serialize()
        }
    )



