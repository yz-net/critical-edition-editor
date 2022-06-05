from hashlib import md5
import os
import glob


dirs = ["./build-2.1.0", "./build-2.0.0"]
base = dirs[0]
dir_b = dirs[1]
files = glob.glob(f"{base}/**", recursive=True)

def compare(fname, base_dir, dir_b):
    match_part = fname.replace(base_dir, "")

    # print(fname, "-", base_dir, "=", match_part)
    # file_b = os.path.join(dir_b, match_part)
    file_b = f"{dir_b}/{match_part}"

    if not os.path.exists(file_b):
        print(f"file not found: {file_b}")
        return
    # else:
    #     print(f"file found: {file_b}")
    # print(fname, file_b)

    if not os.path.isfile(fname):
        return 

    left_hash = md5(open(fname, "rb").read()).hexdigest()
    right_hash = md5(open(file_b, "rb").read()).hexdigest()

    if left_hash == right_hash:
        print(f"files match {fname} {file_b}")
    else:
        print(f"files don't match: {fname} {file_b}")

for file in files:
    compare(file,base, dir_b)