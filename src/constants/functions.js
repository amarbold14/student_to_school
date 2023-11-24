import { colors } from "constants/colors";

export const localArray = [
  {
    percent: 40,
  },
  {
    percent: 20,
  },
  {
    percent: 10,
  },
  {
    percent: 5,
  },
  {
    percent: 1,
  },
];
export const LegendItemsDistrictLocal = [
  { label: " > 40% ", color: colors.blue_arr[5] },
  { label: " 40% >= 20% ", color: colors.blue_arr[4] },
  { label: " 20% >= 10% ", color: colors.blue_arr[3] },
  { label: " 10% >= 5% ", color: colors.blue_arr[2] },
  { label: " 5% >= 1%", color: colors.blue_arr[1] },
  { label: " 1% >", color: colors.blue_arr[0] },
];
export const LegendItemsDistrictGlobal = [
  { label: " > 4% ", color: colors.blue_arr[5] },
  { label: " 4% >= 2% ", color: colors.blue_arr[4] },
  { label: " 2% >= 1% ", color: colors.blue_arr[3] },
  { label: " 1% >= 0.5% ", color: colors.blue_arr[2] },
  { label: " 0.5% >= 0.1% ", color: colors.blue_arr[1] },
  { label: " 0.1% >=  ", color: colors.blue_arr[0] },
];
export const globalArray = [
  {
    percent: 4,
  },
  {
    percent: 2,
  },
  {
    percent: 1,
  },
  {
    percent: 0.5,
  },
  {
    percent: 0.1,
  },
];
export const getFillColor = (per_arr, percent) => {
  let fillColor;
  let opacity = 0.8;
  switch (true) {
    case percent >= per_arr[0].percent:
      fillColor = colors.blue_arr[5];
      break;
    case percent >= per_arr[1].percent:
      fillColor = colors.blue_arr[4];
      break;
    case percent >= per_arr[2].percent:
      fillColor = colors.blue_arr[3];
      break;
    case percent >= per_arr[3].percent:
      fillColor = colors.blue_arr[2];
      break;
    case percent >= per_arr[4].percent:
      fillColor = colors.blue_arr[1];
      break;
    default:
      fillColor = colors.blue_arr[0];
      // opacity = 0.8;
  }
  return [fillColor, opacity];
};

export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
