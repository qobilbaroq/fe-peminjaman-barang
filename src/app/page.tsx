"use client"

import { useEffect, useState } from "react";
import { getProduct , addProduct, deleteProduct ,getCategory } from "@/lib/api";

export default function Home() {
  const [ products, setProducts] = useState([])
  const [ categories, setCategories] = useState([])

  useEffect(() => {
    fetchProducts();
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    const data = await getProduct()
    setProducts(data)
  }

  const fetchCategories = async () => {
    const data = await getCategory()
    setCategories(data)
  }



  const handleDelete = async (id: number) => {
    await deleteProduct(id)
    fetchProducts()
  }

  return (
    <div>
      {products.map((product: any) => (
        <div key={product.id}>
          <p>{product.name}</p>
          <p>stock: {product.stock}</p>
        </div>
      ))}
    </div>
  );
}
