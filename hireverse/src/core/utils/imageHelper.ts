type FlipOptions = {
    horizontal: boolean;
    vertical: boolean;
};

type PixelCrop = {
    x: number;
    y: number;
    width: number;
    height: number;
};

type CroppedImageResult = {
    file: Blob | null;
    url: string;
};

export const readFile = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => resolve(reader.result), false);
        reader.readAsDataURL(file);
    });
};

export const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(error));
        image.setAttribute("crossOrigin", "anonymous");
        image.src = url;
    });

export function getRadianAngle(degreeValue: number): number {
    return (degreeValue * Math.PI) / 180;
}

export function rotateSize(
    width: number,
    height: number,
    rotation: number
): { width: number; height: number } {
    const rotRad = getRadianAngle(rotation);

    return {
        width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
        height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
    };
}

export const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: PixelCrop = { x: 0, y: 0, width: 0, height: 0 },
    rotation: number = 0,
    flip: FlipOptions = { horizontal: false, vertical: false }
): Promise<CroppedImageResult | null> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        return null;
    }

    const rotRad = getRadianAngle(rotation);

    // Calculate bounding box of the rotated image
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation);

    // Set canvas size to match the bounding box
    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    // Translate canvas context to a central location to allow rotating and flipping around the center
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.rotate(rotRad);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-image.width / 2, -image.height / 2);

    // Draw rotated image
    ctx.drawImage(image, 0, 0);

    // CroppedAreaPixels values are bounding box relative
    // Extract the cropped image using these values
    const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);

    // Set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // Paste generated rotated image at the top-left corner
    ctx.putImageData(data, 0, 0);

    // Return as a Blob or Base64 string
    return new Promise((resolve) => {
        canvas.toBlob((file) => {
            resolve({ file, url: file ? URL.createObjectURL(file) : "" });
        }, "image/jpeg");
    });
};
