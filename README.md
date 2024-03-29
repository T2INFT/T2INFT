# T2INFT
> HKU MSc project about developing a web app which creates NFTs with use of T2I generative models <br /> <br />
> Check out our [_Official website_](https://wp.cs.hku.hk/2022/msp22047).

## Table of Contents
* [General Info](#general-information)
* [Models Used](#models-used)
* [NFT website](#nft-website)
* [Web framework](#web-framework)
* [Project Status](#project-status)
* [Model Installation](#model-installation)
* [Sample Usage](#sample-usage)
* [Todo](#todo)
* [Acknowledgements](#acknowledgements)
<!-- * [License](#license) -->


## General Information
- This study aims to work out a practical web application that meets potential NFT buyers' requirements in making their customized NFTs, 
which uses the Generative model to convert text description to semantically consistent NFT style images. 
Then the images would be converted into NFT products on Ethereum.


## Models Used
- __HuggingFace__ Pretrained [Stable diffusion model](https://huggingface.co/runwayml/stable-diffusion-v1-5)
- __Pytorch__ implementation [StyleGAN2-ADA](https://github.com/NVlabs/stylegan2-ada-pytorch) trained on public kaggle [NFT dataset](https://www.kaggle.com/datasets/vepnar/nft-art-dataset)
- __ImageMixer__ https://github.com/kirigiricloud/stable-diffusion


## NFT website
[Ethereum](https://ethereum.org/)


## Web framework
__Frontend__ : Vue 3 + JavaScript <br /><br />
__Backend__ : Nodejs + MySQL


## Project Status
Project is: _Done_

## Model Installation
Python version >= 3.7
```
cd stable-diffusion
pip install -r requirements.txt
```

## Sample Usage
```
python main-sd.py prompt user_name
python main-mixer.py user_name
```
prompt: String, text requirment
user_name: String, provided user name for registered user
```
python main-sd.py 'a photo of an astronaut riding a horse on mars' test_user
python main-mixer.py test_user
```

## Todo
- [x] building skeleton of web app
- [x] choose stable diffusion model to use
- [x] preprocess NFT dataset
- [x] train StyleGAN2
- [x] application basic functionalities
- [x] image-mixer: adjust the file to make it work in local
- [x] back-end: wallet
- [x] front-end: profile
- [x] front-end: login/register
- [x] back-end: mint
- [x] Model: create usable Python script - Stable Diffusion
- [x] Model: create usable Python script - image-mixer
- [x] Connect front-end and back-end
- [x] System testing 


## Acknowledgements
- This project is inspired by HKU MSc Computer Science Department
- Thanks to all team members

