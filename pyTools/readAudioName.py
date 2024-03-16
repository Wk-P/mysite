import os

def get_files_in_directory(folder_path):
    files = os.listdir(folder_path)
    return files

def remove_extension(file_name):
    return os.path.splitext(file_name)[0]

folder_path = "./static/audio/"
files = get_files_in_directory(folder_path)

for f in files:
    file_name = remove_extension(f)
    print(f'"{file_name}",')
