import { UserWishlistDocument } from "@/generated/graphql";
import client from "@/lib/apolloClient";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


//handle user wishlist
export const POST = async (req: NextRequest) => {
    try {
        const { userId } = auth()
        const { productId } = await req.json()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!productId) {
            return new NextResponse("Product Id required", { status: 400 })
        }

        //user wishlist
        const USER_WISHLIST_MUTATION = UserWishlistDocument
        const variables = {
            userWishlistInput: {
                clerkId: userId,
                wishlistProductId: productId
            }
        }
        try {

            const { data, errors } = await client.mutate({
                mutation: USER_WISHLIST_MUTATION,
                variables,
            });

            if (!data.userWishlist.success) {
                return new NextResponse(data.userWishlist.message, {
                    status: data.userWishlist.code,
                });
            }

            if (errors) {
                return NextResponse.json(errors[0].message, {
                    status: 500,
                });
            }
            return NextResponse.json(data.userWishlist.user, { status: 200 })
        } catch (error) {
            console.error("Error during user wishlist:", error);
            return new NextResponse("Error during user wishlist", { status: 500 });
        }

    } catch (err) {
        console.log("[wishlist_POST]", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}