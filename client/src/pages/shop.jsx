import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCollections,
  getProductsToShop,
} from '../redux/product/product-action'
import LoadMoreCards from '../components/load-more'
import CollapseCheckbox from '../components/collapse-checkbox'

const ShopCollection = ({ match }) => {
  const dispatch = useDispatch()
  const products = useSelector(({ product }) => product)
  const collectionState = useSelector(({ collection }) => collection)
  const { collections } = collectionState

  const [filter, setFilter] = useState({
    limit: 10,
    skip: 0,
    filters: {
      // collections: [match.params.collection ? match.params.collection : ''],
      price: [],
      categories: [],
    },
  })

  useEffect(() => {
    dispatch(getProductsToShop(filter.skip, filter.limit, filter.filters))
    dispatch(getCollections())
    // eslint-disable-next-line
  }, [dispatch])

  const handleFilters = (filters, category) => {
    const newFilters = { ...filter.filters }
    newFilters[category] = filters

    showFilteredResults(newFilters)

    setFilter({
      ...filter,
      filters: newFilters,
    })
  }

  const showFilteredResults = (filters) => {
    dispatch(getProductsToShop(0, filter.limit, filters)).then(() => {
      setFilter({
        ...filter,
        skip: 0,
      })
    })
  }

  const loadMoreCards = () => {
    let skip = filter.skip + filter.limit
    dispatch(
      getProductsToShop(skip, filter.limit, filter.filters, products.toShop)
    ).then(() => {
      setFilter({
        ...filter,
        skip,
      })
    })
  }

  return (
    <div className='shop'>
      <div className='shop__toolbar'>Shop / Industrial / 4threads</div>
      <div className='shop__filter'>
        <div className='shop__categories'>
          {collections &&
            collections.map((i) => (
              <CollapseCheckbox
                key={i._id}
                title={i.name}
                list={i.categories}
                handleFilters={handleFilters}
              />
            ))}
        </div>
      </div>
      <div className='shop__products'>
        <div className='shop__pagination'></div>
        <div>
          <LoadMoreCards
            limit={filter.limit}
            size={products.toShopSize}
            products={products.toShop}
            loadMore={() => loadMoreCards()}
          />
        </div>
      </div>
    </div>
  )
}

export default ShopCollection
