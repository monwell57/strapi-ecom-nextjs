import Page from "../components/Page";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../lib/products";

export async function getStaticProps() {
  const products = await getProducts();
  return {
    props: {
      products,
    },
    revalidate: parseInt(process.env.REVALIDATE_SECONDS),
  };
}

function HomePage({ products }) {
  console.log("[Homepage:", products);
  return (
    <Page title="Indoor Plants">
      <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4 justify-items-center">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </Page>
  );
}
export default HomePage;
