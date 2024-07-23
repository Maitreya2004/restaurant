import os

def print_tree(startpath, exclude_dirs=None):
    if exclude_dirs is None:
        exclude_dirs = set()

    for root, dirs, files in os.walk(startpath):
        # Exclude the directories specified in exclude_dirs
        dirs[:] = [d for d in dirs if os.path.join(root, d) not in exclude_dirs]
        
        level = root.replace(startpath, '').count(os.sep)
        indent = ' ' * 4 * (level)
        print('{}{}/'.format(indent, os.path.basename(root)))
        subindent = ' ' * 4 * (level + 1)
        for f in files:
            print('{}{}'.format(subindent, f))

if __name__ == "__main__":
    start_path = '.'  # or the directory you want to start from
    exclude_dirs = {os.path.join(start_path, 'node_modules')}
    print_tree(start_path, exclude_dirs)
