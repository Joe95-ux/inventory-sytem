import React, { ChangeEvent, FormEvent, useState } from "react";
import {modalSchema, ModalSchemaType} from "./modalSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import Header from "@/app/(components)/Header";


type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ModalSchemaType) => void;
};

const CreateProductModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateProductModalProps) => {
  // Use React Hook Form and Zod for validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ModalSchemaType>({
    resolver: zodResolver(modalSchema),
    defaultValues: {
      name: "",
      price: 0,
      stockQuantity: 0,
      rating: 0,
    },
  });

  const onSubmit = (data: ModalSchemaType) => {
    onCreate({ ...data, productId: v4() });
    onClose();
  };

  if (!isOpen) return null;

  const labelCssStyles = "block text-sm font-medium text-gray-700";
  const inputCssStyles =
    "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Create New Product" />
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
          {/* PRODUCT NAME */}
          <label htmlFor="name" className={labelCssStyles}>
            Product Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            {...register("name")}
            className={inputCssStyles}
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}

          {/* PRICE */}
          <label htmlFor="price" className={labelCssStyles}>
            Price
          </label>
          <input
            type="number"
            id="price"
            placeholder="Price"
            {...register("price", { valueAsNumber: true })}
            className={inputCssStyles}
          />
          {errors.price && (
            <p className="text-red-600 text-sm">{errors.price.message}</p>
          )}

          {/* STOCK QUANTITY */}
          <label htmlFor="stockQuantity" className={labelCssStyles}>
            Stock Quantity
          </label>
          <input
            type="number"
            id="stockQuantity"
            placeholder="Stock Quantity"
            {...register("stockQuantity", { valueAsNumber: true })}
            className={inputCssStyles}
          />
          {errors.stockQuantity && (
            <p className="text-red-600 text-sm">
              {errors.stockQuantity.message}
            </p>
          )}

          {/* RATING */}
          <label htmlFor="rating" className={labelCssStyles}>
            Rating
          </label>
          <input
            type="number"
            id="rating"
            placeholder="Rating"
            {...register("rating", { valueAsNumber: true })}
            className={inputCssStyles}
          />
          {errors.rating && (
            <p className="text-red-600 text-sm">{errors.rating.message}</p>
          )}

          {/* CREATE ACTIONS */}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Create
          </button>
          <button
            onClick={onClose}
            type="button"
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;