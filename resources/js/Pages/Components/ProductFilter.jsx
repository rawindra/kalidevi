import React from 'react'

const ProductFilter = ({ filters }) => {

  const objectFilters = JSON.parse(filters);
  const filterArray = [];
  for (let key in objectFilters) {
    filterArray.push({
      key: key,
      value: objectFilters[key]
    });
  }
            
  return (
    <div>
        {
            filterArray.map((my_filter, index) =>
                <p className="text-gray-500 text-sm" key={index}>{my_filter.key.toUpperCase()}: <span className="text-green-600">{my_filter.value}</span></p>
            )
        }
    </div>
  )
}

export default ProductFilter