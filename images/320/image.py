from PIL import Image

# 画像ファイルを開く
img = Image.open('poshipan.JPG')

# 画像のサイズを320x320に変更
img = img.resize((320, 320), Image.ANTIALIAS)

# 品質を落として保存
img.save('poshipan.JPG', 'JPEG', quality=60)