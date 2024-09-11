import { storefront } from "@/utils/store";
import { useParams } from "next/navigation";

const SingleProductPage = ({
  params: {
    product,
  },
}: any) => {
  console.log(product);
  return  null;
  // const { handle } = useParams();
  // const { data } = await storefront(singleProductQuery, { handle });
  // const variantId = data.productByHandle.variants.edges[0].node.id;
  // console.log(data.productByHandle);

  const handleCheckout = async () => {
    // const { data } = await storefront(checkoutMutation, { variantId });
    // window.location.href = data.checkoutCreate.checkout.webUrl;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center">
        <img
          src={product.images.edges[0].node.transformedSrc}
          alt={product.images.edges[0].node.altText}
          className="w-64 h-64 object-cover rounded-lg"
        />
        <h2 className="text-2xl font-bold mt-4">{product.title}</h2>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-gray-600 mt-2">
          {product.priceRange.minVariantPrice.amount}{' '}
          {product.priceRange.minVariantPrice.currencyCode}
        </p>
      </div>
    </main>
  );
}

const singleProductQuery = `
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
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
      variants(first: 1) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;

const checkoutMutation = `
  mutation CheckoutCreate($variantId: ID!) {
    checkoutCreate(input: {lineItems: [{variantId: $variantId, quantity: 1}]}) {
      checkout {
        webUrl
      }
    }
  }
`;

export async function getStaticPaths() {
  const { data } = await storefront(
    `
      query {
        products(first: 10) {
          edges {
            node {
              handle
            }
          }
        }
      }
    `,
  );

  const paths = data.products.edges.map((product: any) => ({
    params: {
      handle: product.node.handle,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const { data } = await storefront(singleProductQuery, { handle: params.handle });
  return {
    props: {
      product: data.productByHandle,
    },
  };
}

export default SingleProductPage;
