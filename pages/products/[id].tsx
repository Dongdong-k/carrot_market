import Button from "@components/button";
import Layout from "@components/layout";
import { Product, User } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

interface ProductWithUser extends Product {
  user: User;
}
interface ItemDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
}

const ItemDetail: NextPage = () => {
  // url로부터 id 값 가져오기
  const {
    query: { id },
  } = useRouter();

  // id로 데이터 검색하기
  const { data } = useSWR<ItemDetailResponse>(
    id ? `/api/products/${id}` : null
  );

  return (
    <Layout title="Item Detail" canGoBack>
      <div className="px-4 py-10">
        <div className="mb-8">
          <div className="h-96 bg-slate-300" />
          <div className="flex items-center space-x-3 py-3 border-t border-b cursor-pointer   ">
            <div className="w-12 h-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {data?.product?.user?.name}
              </p>
              <Link href={`/users/profiles.${data?.product?.user?.name}`}>
                <a className="text-sm font-medium text-gray-700">
                  View profile &rarr;
                </a>
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {data?.product.name}
            </h1>
            <p className="text-3xl mt-3 text-gray-900 block ">
              ${data?.product.price}
            </p>
            <p className="text-base my-6 text-gray-700">
              {data?.product.description}
            </p>
            <div className="flex items-center justify-between space-x-2">
              <Button text="Talk to seller" />
              <button className="p-3 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 rounded-md">
                <svg
                  className="h-6 w-6 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {data?.relatedProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <a className="hover:ring-2 hover:ring-offset-2 hover:outline-none hover:ring-orange-500 rounded-md flex flex-col items-center py-1 cursor-pointer">
                  <div>
                    <div className="h-52 w-52 bg-slate-300 rounded-md mb-4" />
                    <h3 className="text-gray-700 -mb-1 item">{product.name}</h3>
                    <span className="text-sm font-medium text-gray-900">
                      ${product.price}
                    </span>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
