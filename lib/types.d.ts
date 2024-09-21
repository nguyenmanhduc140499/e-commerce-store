type CollectionType = {
    _id: string;
    title: string;
    products: number;
    image: string;
};

type ProductType = {
    _id: string;
    title: string;
    description: string;
    media: [string];
    category: string;
    collections: [string];
    tags: [string];
    price: number;
    cost: number;
    sizes: [string];
    colors: [string];
    createdAt: string;
    updatedAt: string;
};

type UserType = {
    clerkId: string;
    wishlist: [string];
    createdAt: string;
    updatedAt: string;
};

type OrderItemType = {
    product: ProductType;
    color: string;
    size: string;
    quantity: number;
    _id: string;
}

type OrderType = {
    _id: string;
    customerClerkId: string;
    customerName: string;
    address: string
    phone: string
    email: string
    products: [OrderItemType]
    totalAmount: number
}