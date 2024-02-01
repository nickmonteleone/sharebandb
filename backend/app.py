"""Flask app for sharebandb backend"""

import os
from dotenv import load_dotenv

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Listing, Photo
from flask_marshmallow import Marshmallow
from marshmallow import fields, ValidationError
from marshmallow.validate import Length, Range
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

# from flask import Response

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
app.config['SQLALCHEMY_ECHO'] = False
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
toolbar = DebugToolbarExtension(app)

ma = Marshmallow(app)
connect_db(app)


class ListingSchema(SQLAlchemyAutoSchema):
    """Schema for validating listing inputs"""
    class Meta():
        model = Listing
        fields = ("name", "address", "description", "price", "photos")

    def _must_not_be_blank(data):
        """Check that input is not blank"""
        if len(data.strip()) == 0:
            raise ValidationError("Data not provided.")

    name = fields.String(
        required=True,
        validate=[Length(min=1, max=50), _must_not_be_blank]
    )
    address = fields.String(
        required=True,
        validate=[Length(min=1, max=500), _must_not_be_blank]
    )
    description = fields.String(
        required=True,
        validate=[Length(min=1, max=2000), _must_not_be_blank]
    )
    price = fields.Float(
        required=True,
        validate=[Range(min=0)]
    )

################################################################################
# Listings

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


@app.post('/listings')
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

    # Use listing schema to validate inputs.
    try:
        listing_schema = ListingSchema()
        listing_schema.load(listing_data)
    except ValidationError as error:
        return jsonify(
            {"error": error.messages}
        ), 400

    listing = Listing.add_listing(
        name=listing_data["name"],
        address=listing_data["address"],
        description=listing_data["description"],
        price=listing_data["price"],
        photos=listing_data.get("photos", []),
    )

    db.session.commit()
    return jsonify(
        {
            "added": listing.serialize()
        }
    )

@app.post('/listings/<int:listing_id>/photos')
def add_photo(listing_id):
    """Add a new listing to database
    Input
        {
            file, (image file)
            description (string)
        }
    Return
    { "added": {
            id, description, source, listing_id
        }
    }
    """
    print("received request for adding photo")
    photo_file = request.files['file']
    description = request.form["description"]

    print("received add photo request", photo_file, description)
    photo = Photo.add_photo(
        listing_id=listing_id,
        photo_file=photo_file,
        description=description,
    )

    db.session.commit()
    return jsonify(
        {
            "added": photo.serialize()
        }
    )




