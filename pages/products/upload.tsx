import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { Product } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface UploadProductForm {
  name: string;
  price: number;
  description: string;
}

interface UploadProductMutation {
  ok: boolean;
  product: Product;
}

const Upload: NextPage = () => {
  const { register, handleSubmit } = useForm<UploadProductForm>();
  const [uploadProduct, { loading, data, error }] =
    useMutation<UploadProductMutation>("/api/products");
  const router = useRouter();
  const onValid = (data: UploadProductForm) => {
    if (loading) return;
    console.log("data : ", data);
    uploadProduct(data);
  };

  useEffect(() => {
    if (data?.ok) {
      router.push(`/products/${data.product.id}`);
    }
  }, [data, router]);

  return (
    <Layout canGoBack title="Upload Product">
      <form className="p-4 space-y-4" onSubmit={handleSubmit(onValid)}>
        <div>
          <div>
            <label className="w-full cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 h-48 text-gray-600 hover:border-orange-500 hover:text-orange-500 rounded-md">
              <svg
                className="h-12 w-12"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input type="file" className="hidden" />
            </label>
          </div>
          <div className="my-5">
            <Input
              register={register("name", { required: true })}
              required
              label="Name"
              name="name"
              kind="text"
              type={"text"}
            />
            <Input
              register={register("price", { required: true })}
              required
              label="Price"
              placeholder="0.00"
              name="price"
              type="text"
              kind="price"
            />
          </div>
          <TextArea
            register={register("description", { required: true })}
            name="description"
            label="Description"
          />
          <Button text={loading ? "Loading..." : "Upload product"} />
        </div>
      </form>
    </Layout>
  );
};

export default Upload;