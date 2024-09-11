import { storefront } from "@/utils/store";
import Link from "next/link";

const Home = async ({ products }: any) => {
  const { data } = await storefront(productsQuery);
  console.log(data.products);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data.products.edges.map(({ node }: any) => (
        <div key={node.id} className="flex flex-col items-center">
          <img
            src={node.images.edges[0].node.transformedSrc}
            alt={node.images.edges[0].node.altText}
            className="w-64 h-64 object-cover rounded-lg"
          />
          <h2 className="text-2xl font-bold mt-4">{node.title}</h2>
          <p className="text-gray-600 mt-2">{node.description}</p>
          <p className="text-gray-600 mt-2">
            {node.priceRange.minVariantPrice.amount}{' '}
            {node.priceRange.minVariantPrice.currencyCode}
          </p>
          <Link href={`/product/${node.handle}`}>
            View Product
          </Link>
        </div>
      ))}
    </main>
  );
};

const gql = String.raw;

const productsQuery = gql`
  query Products {
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                originalSrc
                transformedSrc
                altText
              }
            }
          }
        }
      }
    }
  }
`;

// export async function getStaticProps() {
//   const { data } = await storefront(productsQuery);
//   return {
//     props: {
//       products: data.products,
//     },
//   };
// }

export default Home;
