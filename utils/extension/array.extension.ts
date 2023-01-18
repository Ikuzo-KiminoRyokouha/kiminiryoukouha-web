let _;
Array.prototype.deduplication = function () {
  return this.reduce(
    (ac: any, v: any) => (ac.includes(v) ? ac : [...ac, v]),
    []
  );
};

Array.prototype.filterTarget = function (target: any) {
  return this.filter((v) => v != target);
};

export default _;
