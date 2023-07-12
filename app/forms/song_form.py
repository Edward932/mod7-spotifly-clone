from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from flask_wtf.validators import DataRequired, Length
from wtforms import SubmitField, StringField
from app.routes.aws_helpers import ALLOWED_EXTENSIONS

class SongForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired(), Length(min=2, max=50)])
    song_file = FileField("Song File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    description = StringField("Description", validators=[DataRequired(), Length(min=5, max=100)])
    submit = SubmitField("Create Post")
