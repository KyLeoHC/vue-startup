/**
 * 图片处理辅助函数
 * @type {{compress(*=, *=, *=): *}}
 */
const ImageProcessor = {
  compress(dataUrl = '', size) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const width = image.width;
        const height = image.height;
        canvas.width = width;
        canvas.height = height;
        // 绘制白色背景，避免png透明背景变黑的问题
        context.fillStyle = '#fff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        // 把图片绘制到canvas上
        context.drawImage(image, 0, 0, width, height);
        // 此处的压缩倍率，后续再针对实际图片尺寸和大小优化
        resolve(canvas.toDataURL('image/jpeg', 0.6));
      };
      image.onerror = () => {
        reject(new Error('[ImageProcessor compress]: load image fail.'));
      };
      image.src = dataUrl;
    });
  }
};

export {
  ImageProcessor
};
