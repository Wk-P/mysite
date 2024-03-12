import os

def get_files_in_directory(folder_path):
    files = os.listdir(folder_path)
    return files

folder_path = "./static/audio/"
files = get_files_in_directory(folder_path)

for i in range(len(files)):
    print(f'"{files[i]}",')
