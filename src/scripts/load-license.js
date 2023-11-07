// licenseLoader.js
import licenseFile from '../license/regula.license';

function convertBinaryToBase64(binaryData) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = btoa(
        String.fromCharCode.apply(null, new Uint8Array(reader.result)),
      );
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(binaryData);
  });
}

export function loadLicense() {
  return fetch(licenseFile)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.blob();
    })
    .then((blob) => convertBinaryToBase64(blob));
}
