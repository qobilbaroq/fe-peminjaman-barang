const BASE_URL = "http://localhost:3001"

export async function getProduct() {
    const res = await fetch(`${BASE_URL}/products`)
    return res.json();
}

export async function addProduct(data: object) {
    const res = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    })
    return res.json()
}

export async function deleteProduct(id:number) {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: "DELETE"
    })
    return res.ok
}
export async function getCategory() {
    const res = await fetch(`${BASE_URL}/categories`)
    return res.json()
    
}