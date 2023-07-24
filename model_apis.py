from flask import Flask, request, jsonify, send_file
from diffusers import StableDiffusionPipeline
import torch
import sys
import os
import base64
from PIL import Image
from io import BytesIO

import importlib  
mixer_test = importlib.import_module("stable-diffusion.scripts.mixer-test")

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = "inputs"

def pil_to_b64(input):
    buffer = BytesIO()
    input.save( buffer, "PNG" )
    output = base64.b64encode( buffer.getvalue() ).decode( "utf-8" ).replace( "\n", "" )
    buffer.close()
    return output

def b64_to_pil(input):
    output = Image.open( BytesIO( base64.b64decode( input ) ) )
    return output

MODEL_ID = "runwayml/stable-diffusion-v1-5"
PIPE = StableDiffusionPipeline.from_pretrained(MODEL_ID, torch_dtype=torch.float16)
PIPE = PIPE.to("cuda")

@app.route("/generate", methods = ["POST"])
def main_sd():
    try:
        prompt = request.form.get("prompt")
        userid = request.form.get("userid")
        image = PIPE(prompt).images[0]
        data = {
            "base64" : pil_to_b64( image["image"].convert( "RGB" ) ),
            "mime_type": "image/png",
            "userid": userid
        }
    except:
        return jsonify(isError=True,
                message="Runtime Error",
                statusCode=400,
                data= {}), 400
    return jsonify(isError=False,
                    message="Success",
                    statusCode=200,
                    data= data), 200

@app.route("/mixer", methods = ["POST"])
def main_mixer():
    try:
        userid = request.form.get("userid")
        imgid = request.form.get("imgid")
        filename = userid + "_" + imgid + ".png"
        miximg = request.file["miximg"]
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        miximg.save(filepath)
        
        image = mixer_test(filepath)
        data = {
            "base64" : pil_to_b64( image["image"].convert( "RGB" ) ),
            "mime_type": "image/png",
            "userid": userid,
            "imgid": imgid
        }
    except:
        return jsonify(isError=True,
                message="Runtime Error",
                statusCode=400,
                data= {}), 400
    return jsonify(isError=False,
                    message="Success",
                    statusCode=200,
                    data= data), 200

if __name__ == "__main__":
    app.run()