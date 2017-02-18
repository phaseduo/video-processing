import json
from os.path import join, dirname
import os
from dotenv import Dotenv
import pafy
from watson_developer_cloud import SpeechToTextV1
from flask import Flask, request

dotenv = Dotenv(os.path.join(os.path.dirname(__file__), './.env'))
os.environ.update(dotenv)

speech_to_text = SpeechToTextV1(
  username=os.environ.get('USERNAME'),
  password=os.environ.get('PASSWORD'),
  x_watson_learning_opt_out=False
)

app = Flask(__name__)

@app.route("/youtube", methods=['POST'])
def speech_rec():
  url = request.get_json().get('url')
  video = pafy.new(url)
  audio = video.audiostreams[2]
  print audio.extension
  audio.download(filepath=('./out.'+audio.extension), remux_audio=True)
  with open(join(dirname(__file__), './out.'+audio.extension)) as audio_file:
    recg = (speech_to_text.recognize(audio_file, content_type=('audio/'+audio.extension),
    continuous=True, word_confidence=False))
    return json.dumps(recg)

if __name__ == "__main__":
  app.run()
