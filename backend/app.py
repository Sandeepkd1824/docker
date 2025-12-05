from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/process', methods=['POST'])
def process():
    data = request.get_json()
    name = data.get('name', '')
    age = data.get('age', '')
    return jsonify({
        'status': 'success',
        'msg': f"Hello {name}, age {age} received"
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
