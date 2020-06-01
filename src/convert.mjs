const atob = require("atob");
const BMP_HEADER_BASE64 =
  'Qk0AAAAAAAAAAHoAAABsAAAAAAAAAAAAAAABACAAAwAAAAAAAADDDgAAww4AAAAAAAAAAAAA/wAAAAD/AAAAAP8AAAAA/0JHUnM';
const BMP_HEADER = Uint8Array.from(atob(BMP_HEADER_BASE64), (c) => c.charCodeAt(0));
const BMP_HEADER_LENGTH = 122;

const BMP_FILESIZE_OFFSET = 2;
const BMP_WIDTH_OFFSET = 18;
const BMP_HEIGHT_OFFSET = 22;
const BMP_IMAGESIZE_OFFSET = 34;
const BMP_RED_BITFIELDS_OFFSET = 54;
const BMP_GREEN_BITFIELDS_OFFSET = 62;

/**
 * @param {ImageData} imageData
 * @returns {Uint8Array}
 */
const convert = ({ width, height, data }) => {
  const dataLength = data.byteLength;
  const fileSize = BMP_HEADER_LENGTH + dataLength;

  const uint8Array = new Uint8Array(fileSize);
  const dataView = new DataView(uint8Array.buffer);
  const setUint32 = (offset, value) => dataView.setUint32(offset, value, true);

  uint8Array.set(BMP_HEADER);
  setUint32(BMP_FILESIZE_OFFSET, fileSize);
  setUint32(BMP_WIDTH_OFFSET, width);
  setUint32(BMP_HEIGHT_OFFSET, height);
  setUint32(BMP_IMAGESIZE_OFFSET, dataLength);

  uint8Array.set(data, BMP_HEADER_LENGTH);

  return uint8Array;
};

export { convert };
