import { ProductButtons, ProductCard, ProductImage, ProductTitle } from '../components';
import { useShoppingCart } from '../hooks/useShoppingCart';
import { products } from '../data/products';
import { Product } from '../interfaces/interfaces';
import '../styles/custom-style.css';

export const ShoppingPage = () => {

  const { shoppingCart, onProductCountChange } = useShoppingCart();

  return (
    <div>
      <h1>Shopping Store</h1>
      <hr />

      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
      }}>
        {
          products.map((product: Product) => (
            <ProductCard 
              key={product.id}
              product={ product }
              className="bg-dark text-white"
              onChange={ onProductCountChange }
              value={ shoppingCart[product.id]?.count || 0 }
            >
              <ProductImage className="custom-image" />
              <ProductTitle className="text-bold" />
              <ProductButtons className="custom-buttons" />
            </ProductCard>
          ))
        }
      </div>

      <div className="shopping-cart">
        {
          Object.entries( shoppingCart ).map( ([ key, product ]) => (
            <ProductCard 
              key={ key }
              product={ product }
              className="bg-dark text-white"
              style={{ width: '100px' }}
              onChange={ onProductCountChange }
              value={ product.count }
            >
              <ProductImage className="custom-image" />
              <ProductButtons 
                className="custom-buttons"
                style={{ 
                  display: 'flex',
                  justifyContent: 'center'
                }}
              />
            </ProductCard>
          ))
        }
      </div>
    </div>
  )
}
