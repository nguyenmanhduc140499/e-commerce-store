export const getCollections = async () => {
    const collections = await fetch(`${process.env.NEXT_PUBLIC_API_ADMIN_URL}/api/collections`, { cache: "no-cache" })
    return await collections.json()
}

export const getCollectionDetails = async (collectionId: string) => {
    const collection = await fetch(`${process.env.NEXT_PUBLIC_API_ADMIN_URL}/api/collections/${collectionId}`, { cache: "no-cache" })
    return await collection.json()
}

export const getProducts = async () => {
    const products = await fetch(`${process.env.NEXT_PUBLIC_API_ADMIN_URL}/api/products`, { cache: "no-cache" })
    return await products.json()
}

export const getProductDetails = async (productId: string) => {
    const productDetails = await fetch(`${process.env.NEXT_PUBLIC_API_ADMIN_URL}/api/products/${productId}`, { cache: "no-cache" })
    return await productDetails.json()
}

export const getSearchedProducts = async (query: string) => {
    const searchedProducts = await fetch(`${process.env.NEXT_PUBLIC_API_ADMIN_URL}/api/search/${query}`, { cache: "no-cache" })
    return await searchedProducts.json()
}

export const getOrdersByCustomer = async (customerId: string) => {
    const ordersByCustomer = await fetch(`${process.env.NEXT_PUBLIC_API_ADMIN_URL}/api/orders/customers/${customerId}`, { cache: "no-cache" })
    return await ordersByCustomer.json()
}

export const getRelatedProducts = async (productId: string) => {
    const relatedProducts = await fetch(`${process.env.NEXT_PUBLIC_API_ADMIN_URL}/api/products/${productId}/related`, { cache: "no-cache" })
    return await relatedProducts.json()
}