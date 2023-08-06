"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickQuery = void 0;
const pickQuery = (obj, keys) => {
  // arr of keys, ["page", " limit", "sortOrder", "sortBy""]
  const finalObj = {};
  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  }
  return finalObj;
};
exports.pickQuery = pickQuery;
