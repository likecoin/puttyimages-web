// from https://stackoverflow.com/questions/40031688/javascript-arraybuffer-to-hex
function arrayBufferToHex(buffer) {
  return Array.prototype.map
    .call(new Uint8Array(buffer), (x) => `00${x.toString(16)}`.slice(-2))
    .join('');
}

export function arrayBufferToSha256(buffer) {
  return window.crypto.subtle.digest('SHA-256', buffer).then(arrayBufferToHex);
}

export function blobToArrayBuffer(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsArrayBuffer(blob);
  });
}
