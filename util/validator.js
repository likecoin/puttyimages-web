export const validator = {
  checkAddressValid(addr) {
    return addr.length === 42 && addr.substr(0, 2) === '0x';
  },
};

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

export default validator;
