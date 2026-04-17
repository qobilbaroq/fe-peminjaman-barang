"use client"

import React, { useEffect, useState } from "react";
import { getProduct , addProduct, deleteProduct ,getCategory } from "@/lib/api";

export default function Home() {
  const [ products, setProducts] = useState([])
  const [ categories, setCategories] = useState([])
  
  const [ form, setForm] = useState({
    name: '',
    category: "",
    stock: "",
    unit: "",
    price: "",
    supplier: ""
  })

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await addProduct({
      ...form,
      stock: Number(form.stock),
      price:  Number(form.price),
      createdAt: new Date().toISOString(),
    })
    setForm({ name: "", category: "", stock: "", unit: "", price: "", supplier: ""})
     fetchProducts()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name Product"/>
        <input name="category" value={form.category} onChange={handleChange} placeholder="Name Product"/>
        <input name="stock" value={form.stock} onChange={handleChange} placeholder="Name Product"type="number"/>
        <input name="unit" value={form.unit} onChange={handleChange} placeholder="Name Product"/>
        <input name="price" value={form.price} onChange={handleChange} placeholder="Name Product" type="number"/>
        <input name="supplier" value={form.supplier} onChange={handleChange} placeholder="Name Product"/>
        <button type="submit">tambah</button>
      </form>

      {products.map((product: any) => (
        <div key={product.id}>
          <p>{product.name}</p>
          <p>stock: {product.stock}</p>
          <button onClick={() => handleDelete(product.id)}>hapus</button>
        </div>
      ))}
    </div>
  );
}
