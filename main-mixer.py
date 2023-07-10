import os
import subprocess
import sys
import shutil

def find_last(source_dir):
    work_space = os.getcwd()
    source_dir = os.path.join(work_space,source_dir)
    index = 0
    for root, dirs, files in os.walk(source_dir):
        for file in files:
            if file.endswith(".png"):
                index += 1
    return index


user_name = sys.argv[1]

if os.path.isdir('outputs'):
    print('outputs folder exists')
else:
    print('outputs folder does not exist')
    os.mkdir('outputs')

user_outdir = 'outputs/' + user_name
if os.path.isdir(user_outdir):
    print('outputs folder exists')
else:
    print('outputs folder does not exist')
    os.mkdir(user_outdir)

if len(sys.argv)>2:
    prompt = sys.argv[2]
    working_dir = os.getcwd()
    sd_in_dir = os.path.join(working_dir,'sd-outputs',user_name)
    sd_image_in = os.path.join(sd_in_dir,'sd-'+user_name+'-'+str(find_last(sd_in_dir)-1)+'.png')
    sd_image_out = os.path.join(working_dir,'stable-diffusion','input','input.png')
    shutil.copyfile(sd_image_in, sd_image_out)
    if os.path.isfile(sd_image_in):
        print('successfully copied image')
prev_path = os.getcwd()
os.chdir(prev_path+'/stable-diffusion')
#print(os.getcwd())
subprocess.run(["python", "scripts/mixer-test.py",user_name])
os.chdir(prev_path)
#print(os.getcwd())
image_out = os.getcwd()+'/stable-diffusion/output/'+user_name+'.png'
mixer_out_dir = os.path.join(os.getcwd(),'outputs',user_name)
image_new_out = os.path.join(mixer_out_dir,user_name+'-'+str(find_last(mixer_out_dir))+'.png')
print(image_out)
f = open("mixer-log.txt", "w")
if os.path.isfile(image_out):
    print('successfully transfered image')
    os.rename(image_out, image_new_out)
    ##save out_path in a text file
    f.write(image_new_out)
    
else:
    print('image not found')

f.close()

    