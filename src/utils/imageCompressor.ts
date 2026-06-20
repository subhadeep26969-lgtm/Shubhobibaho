/**
 * Compresses an image file using HTMLCanvasElement.
 * Resizes the image to a standard responsive width and converts it to a lower-quality JPG base64 string
 * to keep sizes below 100KB, perfect for Firestore.
 */
export function compressImage(file: File, maxWidth: number = 800): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Maintain aspect ratio
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get 2D context'));
          return;
        }

        // Draw and compress
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to quality-reduced JPEG (0.6)
        const base64Str = canvas.toDataURL('image/jpeg', 0.6);
        resolve(base64Str);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}
