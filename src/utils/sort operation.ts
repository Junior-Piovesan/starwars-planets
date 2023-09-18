const sortOperation = (value:number | string, asc:boolean) => {
  if (asc) {
    return (value === 'unknown' ? 10000000000001 : Number(value));
  }
  return (value === 'unknown' ? 1 : Number(value));
};
export default sortOperation;
