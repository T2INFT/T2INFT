# T2INFT
> HKU MSc project about developing a web app which creates NFTs with use of T2I generative models <br /> <br />
> Check out our [_Official website_](https://wp.cs.hku.hk/2022/msp22047).

## Table of Contents
* [General Info](#general-information)
* [Architecture](#architecture)
* [Models Used](#models-used)
* [NFT website](#nft-website)
* [Web framework](#web-framework)
* [Project Status](#project-status)
* [Todo](#todo)
* [Acknowledgements](#acknowledgements)
<!-- * [License](#license) -->


## General Information
- This study aims to work out a practical web application that meets potential NFT buyers' requirements in making their customized NFTs, 
which uses the Generative model to convert text description to semantically consistent NFT style images. 
Then the images would be converted into NFT products on Binance.


## Architecture
<!-- ![Example screenshot](./img/screenshot.png) -->
Image to-be-uploaded


## Models Used
- __HuggingFace__ Pretrained [Stable diffusion model](https://huggingface.co/runwayml/stable-diffusion-v1-5)
- __Pytorch__ implementation [StyleGAN2-ADA](https://github.com/NVlabs/stylegan2-ada-pytorch) trained on public kaggle [NFT dataset](https://www.kaggle.com/datasets/vepnar/nft-art-dataset)


## NFT website
[Ethereum](https://ethereum.org/)


## Web framework
__Frontend__ : Vue 3 + JavaScript <br /><br />
__Backend__ : PHP + JSAPI


## Project Status
Project is: _in progress_


## Todo
- [x] building skeleton of web app
- [x] choose stable diffusion model to use
- [x] preprocess NFT dataset
- [x] train StyleGAN2
- [ ] application basic functionalities


## Acknowledgements
- This project was inspired by HKU MSc Computer Science
- Thanks to all team members

