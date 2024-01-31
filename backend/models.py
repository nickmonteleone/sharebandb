"""Database models for sharebandb backend"""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Listing(db.Model):
    """Property listing in the system """

    __tablename__ = "listings"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    name = db.Column(
        db.String(50),
        nullable=False,
        default="",
    )

    address = db.Column(
        db.String(500),
        nullable=False,
        default="",
    )

    description = db.Column(
        db.String(2000),
        nullable=False,
        default="",
    )

    price = db.Column(
        db.Numeric(10,2),
        nullable=False,
    )