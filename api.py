from flask import Flask, request, send_file
from steganography_functions import encode_data, decode_data
from PIL import Image
import io

app = Flask(__name__)

def serve_pil_image(pil_image):
    image_io = io.BytesIO()
    pil_image.save(image_io, 'PNG')
    image_io.seek(0)
    return send_file(image_io, mimetype='image/png')

@app.route('/encode', methods=['POST'])
def encode_image():
    if request.method == 'POST':
        # The random seed the user posted:
        seed = request.form.get('seed')
        data = request.form.get('data')
        # The text the user posted:
        image = encode_data(data, seed=seed)
        return serve_pil_image(image)

@app.route('/decode', methods=['POST'])
def decode_image():
    if request.method == 'POST':
        # The random seed the user posted:
        seed = request.form.get('seed')
        # The image the user posted:
        user_image = request.files['image']
        image = Image.open(user_image)
        return decode_data(image, seed=seed)
        
        