const fileUtil = {
  // from https://stackoverflow.com/questions/40031688/javascript-arraybuffer-to-hex
  arrayBufferToSha256(buf) {
    return window.crypto.subtle.digest('SHA-256', buf).then(this.buf2hex);
  },
  blobToArrayBuffer(blob) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsArrayBuffer(blob);
    });
  },
  buf2hex(buffer) {
    // buffer is an ArrayBuffer
    return Array.prototype.map
      .call(new Uint8Array(buffer), (x) => `00${x.toString(16)}`.slice(-2))
      .join('');
  },
};

export default fileUtil;
