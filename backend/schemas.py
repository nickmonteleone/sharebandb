from marshmallow import fields
# from flask_marshmallow import Marshmallow

from models import Listing
from app import ma
# ma = Marshmallow(app)


class ListingSchema(ma.SQLAlchemySchema):
    class Meta():
        model = Listing
        fields = ("name", "address", "description", "price")
    name = fields.String(required=True)
    address = fields.String(required=True)
    description = fields.String(required=True)
    price = fields.Numeric(required=True)