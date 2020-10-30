#ToDo: Make distinction between pixels and RGB value clear
#ToDo: Get everything hooked up to simple flask app
#ToDo: Serve it as a Flask API to a nicer front end (react?)

import math
import requests
import random
from io import BytesIO
from PIL import Image

MINIMUM_IMAGE_WIDTH = 500
MAXIMUM_IMAGE_WIDTH = 5000
SEED = 'abcdefg'
random.seed(a=SEED, version=2)

def calculate_image_size(data_length):
    """Gets the width (all images are square) of the smallest image which can encode the data supplied
    
    Each pixel has 3 values (R, G, B)
    Each character is encoded with 8 bits.
    Three pixels means 9 values, the 9th value encodes a 'read-more?' flag
    """
    
    min_pixels = data_length * 9
    width = math.ceil(math.sqrt(min_pixels))
    if width < MINIMUM_IMAGE_WIDTH: # Really small images look kind of silly, so set minimum
        width = MINIMUM_IMAGE_WIDTH
    return width

def get_image_of_size(width):
    """Get a random square image of the supplied width"""
    url = f'https://picsum.photos/{width}' # Lorem picsum service will give a random square image of the supplied width
    print(url)
    response = requests.get(url)
    img = Image.open(BytesIO(response.content))
    img.show()
    return img

def convert_data_to_ascii(data):
    """Convert the data to list of 8-bit binary values (ASCII values)"""
    ascii_data = []
    for i in data:
        ascii_data.append(format(ord(i), '08b'))
    return ascii_data
def seed_bit_flip(data_bit):
    ran = random.random()
    if ran > 0.5: # Half of the time, flip the bit
        data_bit = str(1-int(data_bit))
    return data_bit
def tweak_pixels(pixel_values, data):
    """Tweak pixels to encode the data"""
    data = convert_data_to_ascii(data) # need list of characters in 8-bit ascii format
    image_data = iter(pixel_values)

    for i in range(len(data)):

        # Each encoded character requires 3 pixels to encode
        pixel_values = [value for value in image_data.__next__()[:3] +
                                image_data.__next__()[:3] +
                                image_data.__next__()[:3]]

        # Pixel value should be made odd for 1 and even for 0
        for j in range(0, 8):
            data_bit = seed_bit_flip(data[i][j]) # random seed is used to figure out whether the bit should be flipped (1 -> 0 and vice versa)
            if data_bit == '0' and pixel_values[j] % 2 != 0:
                pixel_values[j] -= 1

            elif data_bit == '1' and pixel_values[j] % 2 == 0:
                if pixel_values[j] != 0:
                    pixel_values[j] -= 1
                else:
                    pixel_values[j] += 1 # If the value is zero, can't deduct, so add instead

        # 9th pixel_value is a read-more flag: ODD - There is more data to encode, EVEN - All data is encoded
        if i + 1 == len(data): # In this case we are out of data
            if pixel_values[-1] % 2 == 0: # Make sure the value is odd if it is even
                if pixel_values[-1] != 0:
                    pixel_values[-1] -= 1
                else:
                    pixel_values[-1] += 1 # If the value is zero, can't deduct, so add instead

        else: # In this case there is still more data to encode
            if pixel_values[-1] % 2 != 0: # Make sure the value is even if it is odd
                pixel_values[-1] -= 1

        pixel_values = tuple(pixel_values)
        yield pixel_values[0:3]
        yield pixel_values[3:6]
        yield pixel_values[6:9]

def encode_data(data, seed=None):
    """Encode data into a random image"""
    if len(data) == 0:
        raise ValueError('Data is empty')
    width = calculate_image_size(len(data)) # The width of the image to be encoded
    if width > MAXIMUM_IMAGE_WIDTH:
        raise ValueError('Too much data. Maximum of ', (MAXIMUM_IMAGE_WIDTH**2)/9,'characters')
    image = get_image_of_size(width) # Get random image of smallest size needed for data
    x, y = 0, 0
    
    # encode each pixel and replace it in the image
    for pixel in tweak_pixels(image.getdata(), data):
        image.putpixel((x, y), pixel)
        if x + 1 == width:
            x = 0
            y += 1
        else:
            x += 1

    image.save('encoded_image.png')
def decode_data(image, seed=None):
    """Decode data from an image"""

    image_data = iter(image.getdata())
    data = '' # Holds the full readable decoded message
    while True:
        # Need to get 3 pixels to decode each character of the message
        pixels = [value for value in image_data.__next__()[:3] +
                                image_data.__next__()[:3] +
                                image_data.__next__()[:3]]
        if len(pixels) < 9: # If there are less than 9 pixels, we cannot extract another character
            break

        binary_str = '' # Holds an 8-bit binary for the decoded character

        for i in pixels[:8]:
            if i % 2 == 0:
                binary_str += seed_bit_flip('0')
            else:
                binary_str += seed_bit_flip('1')

        data += chr(int(binary_str, 2)) # Convert 8-bit binary to a readable character
        if pixels[-1] % 2 != 0: # If the 9th pixel is even, it means the message is fully decoded
            return data
if __name__ == "__main__":
    #data = open('./datatoencode.txt', 'r').read()
    #encode_data(data)
    image = Image.open('./encoded_image.png', 'r')
    print(decode_data(image))