import React from 'react';


function ListComponent({ items = [], renderItem, emptyMessage = "No items found." }) {
  if (!items.length) {
    return <div className="no-items">{emptyMessage}</div>;
  }

  return (
    <div className="gallery-grid">
      {items.map((item, index) =>
        React.cloneElement(renderItem(item), { key: index })
      )}
    </div>
  );
}

export default ListComponent;
