import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CategoryContainer, CategoryTitle } from './category.styles.jsx';


import ProductCard from '../../components/product-card/product-card.component';
import { selectCategoriesMap } from '../../store/categories/categories.selector.js';

const Category = () => {
  const { category } = useParams();
  console.log('render/re-rendering Category component');
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    console.log('effect fired calling setProducts');
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap])

  return (
    // os dados são recebidos assincronamente do Firestore, então usamos
    // esta condição para garantir que, em vez de termos um erro, não vamos
    // renderizar Category até que os dados tenham sido recebidos.
    <>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {
          products &&
          products.map(product => <ProductCard key={product.id} product={product} />)
        }
      </CategoryContainer>
    </>
  )
}

export default Category;