import os
from PIL import Image

# 输入文件夹路径
input_folder = "./static/img/"

# 输出文件夹路径
output_folder = "./static/img/"

# 目标尺寸
target_width = 1912
target_height = int(1912 * (9 / 16))

# 遍历文件夹中的所有文件
for filename in os.listdir(input_folder):
    if filename.endswith(".jpg"):
        # 打开图像文件
        image_path = os.path.join(input_folder, filename)
        image = Image.open(image_path)
        
        print(image.mode)
        # exit(1)

        # 转换为RGB模式（如果带有透明度通道）
        if image.mode == "RGBA":
            image = image.convert("RGB")
        
        # 调整图像大小
        resized_image = image.resize((target_width, target_height))
        
        # 构建输出路径
        output_path = os.path.join(output_folder, filename)
        
        # 保存修改后的图像
        resized_image.save(output_path)
        
        # 关闭图像文件
        image.close()
