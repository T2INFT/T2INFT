import os
import subprocess
import sys
import shutil

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
    sd_image_in = os.path.join(working_dir,'sd-outputs',user_name,'sd-'+user_name+'.png')
    sd_image_out = os.path.join(working_dir,'stable-diffusion','input','input.png')
    shutil.copyfile(sd_image_in, sd_image_out)
prev_path = os.getcwd()
os.chdir(prev_path+'/stable-diffusion')
print(os.getcwd())
subprocess.run(["python", "scripts/mixer-test.py",user_name])
os.chdir(prev_path)
print(os.getcwd())


image_out = os.getcwd()+'/stable-diffusion/output/'+user_name+'.png'
image_new_out = os.getcwd()+'/outputs/'+user_name+'/'+user_name+'.png'
print(image_out)
if os.path.isfile(image_out):
    print('get')
    os.rename(image_out, image_new_out)
else:
    print('not get')

print(user_name+'.png')
#print(os.path.isfile('outputs\\'+user_name+'.jpg'))