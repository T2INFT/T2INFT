from diffusers import StableDiffusionPipeline
import torch
import sys
import os

def find_last(source_dir):
    work_space = os.getcwd()
    source_dir = os.path.join(work_space,source_dir)
    index = 0
    for root, dirs, files in os.walk(source_dir):
        for file in files:
            if file.endswith(".png"):
                index += 1
    return index

if len(sys.argv) > 1:
    prompt = sys.argv[1]
    prompt = ' '.join(prompt)
    user_name = sys.argv[2]
else:
    prompt = "a photo of an astronaut riding a horse on mars"
    user_name = 'test'

#user_name = sys.argv[1]

if os.path.isdir('sd-outputs'):
    print('sd-outputs folder exists')
else:
    print('sd-outputs folder does not exist')
    os.mkdir('sd-outputs')

user_outdir = 'sd-outputs/' + user_name
if os.path.isdir(user_outdir):
    print('sd-outputs folder exists')
else:
    print('sd-outputs folder does not exist')
    os.mkdir(user_outdir)




model_id = "runwayml/stable-diffusion-v1-5"
pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
pipe = pipe.to("cuda")

#test_prompt = "a photo of an astronaut riding a horse on mars"
image = pipe(prompt).images[0]  

working_dir = os.getcwd()
out_path_dir = os.path.join(working_dir, 'sd-outputs',user_name)
out_path = os.path.join(out_path_dir, 'sd-'+user_name+'-'+str(find_last(out_path_dir))+'.png')
image.save(out_path)

f = open("sd-log.txt", "w")
f.write(out_path)
f.close()

