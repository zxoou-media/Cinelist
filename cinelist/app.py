from flask import Flask, render_template, jsonify, send_from_directory
from flask_cors import CORS
import json, os

app = Flask(__name__)
CORS(app)

DATA_FILE = os.path.join(os.path.dirname(__file__), 'data', 'movies.json')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/movies')
def movies_api():
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return jsonify(data)

@app.route('/img/<path:filename>')
def images(filename):
    return send_from_directory(os.path.join(app.root_path, 'static', 'img'), filename)

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
