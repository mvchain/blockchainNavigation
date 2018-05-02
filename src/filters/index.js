export function priceFilter(v) {
  if (v) {
    return Number(v).toFixed(4);
  }
}
export function titleFilter(v) {
  if (v) {
    if (v.length > 35) {
      return v.slice(0, 35) + '...';
    }
    return v;
  }
}
