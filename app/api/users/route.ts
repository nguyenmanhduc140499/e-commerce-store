import { CreateUserDocument } from "@/generated/graphql";
import client from "@/lib/apolloClient";
import { NextRequest, NextResponse } from "next/server";


//get or create user
export const POST = async (req: NextRequest) => {
    try {
        const customer = await req.json()
        if (!customer.clerkId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }
        const CREATE_USER_MUTATION = CreateUserDocument
        const variables = {
            createUserInput: {
                clerkId: customer.clerkId,
                email: customer.email,
                name: customer.name
            },
        };

        try {
            const { data, errors } = await client.mutate({
                mutation: CREATE_USER_MUTATION,
                variables,
            });

            if (!data.createUser.success) {
                return new NextResponse(data.createUser.message, {
                    status: data.createUser.code,
                });
            }

            if (errors) {
                return NextResponse.json(errors[0].message, {
                    status: 500,
                });
            }
            return NextResponse.json(data.createUser.user, { status: 200 })
        } catch (error) {
            console.error("Error during mutation user:", error);
            return new NextResponse("Error during creating user", { status: 500 });
        }

    } catch (error) {
        console.log('user_GET', error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}