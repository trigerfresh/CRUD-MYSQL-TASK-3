import { useEffect, useReducer } from 'react'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import logger from 'use-reducer-logger'
import Product from '../components/Product'
import { Helmet } from 'react-helmet-async'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

function HomeScreen() {
  const [{ error, loading, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  })
  // const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const result = await axios.get('/api/products')
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message })
      }
    }
    fetchData()
  }, [])
  return (
    <div>
      <Helmet>
        <title>Amazon</title>
      </Helmet>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <div>
            <LoadingBox />
          </div>
        ) : error ? (
          <div>
            <MessageBox variant="danger">{error}</MessageBox>
          </div>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  )
}

export default HomeScreen
