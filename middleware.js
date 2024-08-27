export default (req, res, next) => {
    const totalCount = res.get('X-Total-Count');
    
    if (totalCount) {
      res.header('X-Total-Count', totalCount);
    }
  
    next();
};
  