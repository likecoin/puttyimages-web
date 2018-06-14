const COLOR_TYPES = ['primary', 'secondary', 'white'];

export const ColorPropType = {
  default: 'secondary',
  type: String,
  validator: (value) => COLOR_TYPES.indexOf(value) !== -1,
};

export default {
  Color: ColorPropType,
};
