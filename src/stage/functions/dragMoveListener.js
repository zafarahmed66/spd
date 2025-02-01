const dragMoveListener = (e) => {
  const target = e.target;
  const x = (parseFloat(target.style.left) || 0) + e.dx;
  const y = (parseFloat(target.style.top) || 0) + e.dy;

  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
};

export default dragMoveListener;
