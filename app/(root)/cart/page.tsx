"use client";
import { z } from "zod";
import { formatCurrencyVND, zPhoneNumber } from "@/lib/common";
import useCart from "@/lib/hook/useCart";
import { useUser } from "@clerk/nextjs";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  address: z.string().min(2).max(100).trim(),
  phone: zPhoneNumber,
});

const Cart = () => {
  const cart = useCart();
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const total = cart.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );
  const totalRounded = parseFloat(total.toFixed(2));

  const customer: any = {
    clerkId: user?.id,
    email: user?.emailAddresses[0].emailAddress,
    name: user?.fullName,
    totalAmount: totalRounded,
  };
  const itemData = cart.cartItems.map(element => {
    return {
      item: element.item._id,
      title: element.item.title,
      unitPrice: element.item.price,
      imageUrl: element.item.media[0],
      quantity: element.quantity,
      color: element.color,
      size: element.size,
    };
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      phone: "",
    },
  });

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handlePaymentChange = (paymentMethod: string) => {
    // Allow only one payment method to be selected
    setSelectedPayment(prev => (prev === paymentMethod ? null : paymentMethod));
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!user) {
        router.push("sign-in");
      } else {
        setLoading(true);
        customer.address = values.address;
        customer.phone = values.phone;
        if (selectedPayment === "zaloPay") {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_ADMIN_URL}/api/zalopay/checkout`,
            {
              method: "POST",
              body: JSON.stringify({ cartItems: itemData, customer }),
            }
          );

          setLoading(false);
          const data = await res.json();
          window.location.href = data.order_url;
        }
        if (selectedPayment === "momo") {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_ADMIN_URL}/api/momopay/checkout`,
            {
              method: "POST",
              body: JSON.stringify({ cartItems: itemData, customer }),
            }
          );

          setLoading(false);
          const data = await res.json();
          window.location.href = data.shortLink;
        }
      }
    } catch (err) {
      console.log("[checkout_POST]", err);
    }
  };

  return (
    <div className="flex gap-20 py-16 px-10 max-lg:flex-col">
      <div className="w-2/3">
        <p className="text-heading3-bold">Shopping Cart</p>
        <hr className="my-6" />

        {cart.cartItems.length === 0 ? (
          <p className="text-body-bold">No item in cart</p>
        ) : (
          <div>
            {cart.cartItems.map(cartItem => (
              <div className="w-full flex max-sm:flex-col max-sm:gap-3 hover:bg-grey-1 px-6 py-5 items-center justify-between">
                <div className="flex items-center">
                  <Image
                    src={cartItem.item.media[0]}
                    width={100}
                    height={100}
                    alt="product"
                    className="rounded-lg w-32 h-32 object-cover"
                  />

                  <div className="flex flex-col gap-3 ml-4">
                    <p className="text-body-bold">{cartItem.item.title}</p>
                    {cartItem.color && (
                      <p className="text-small-medium">{cartItem.color}</p>
                    )}
                    {cartItem.size && (
                      <p className="text-small-medium">{cartItem.size}</p>
                    )}
                    <p className="text-small-medium">{cartItem.item.price}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <MinusCircle
                    className="hover:text-red-1 cursor-pointer"
                    onClick={() => cart.decreaseQuantity(cartItem.item._id)}
                  />
                  <p className="text-body-bold">{cartItem.quantity}</p>
                  <PlusCircle
                    className="hover:text-red-1 cursor-pointer"
                    onClick={() => cart.increaseQuantity(cartItem.item._id)}
                  />
                </div>

                <Trash
                  className="hover:text-red-1 cursor-pointer"
                  onClick={() => cart.removeItem(cartItem.item._id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-1/3 max-lg:w-full flex flex-col gap-8 bg-grey-1 rounded-lg px-4 py-5">
        <p className="text-heading4-bold pb-4">
          Summary{" "}
          <span>{`${cart.cartItems.length} ${
            cart.cartItems.length > 1 ? "items" : "item"
          }`}</span>
        </p>
        <div className="flex justify-between text-body-semibold">
          <span>Total Amount</span>
          <span>VND {formatCurrencyVND(totalRounded)}</span>
        </div>
        <hr className="my-6" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Address"
                      {...field}
                      rows={2}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Phone Number"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Choose Payment Method</FormLabel>
              <div className="flex flex-row place-items-center space-x-3 space-y-0 rounded-md border p-2 shadow">
                <Checkbox
                  checked={selectedPayment === "zaloPay"}
                  onCheckedChange={() => handlePaymentChange("zaloPay")}
                ></Checkbox>
                <Image
                  src="/zalopay.jpg"
                  width={60}
                  height={60}
                  alt="product"
                  className="rounded-lg w-12 h-12 object-cover"
                />
                <div className="space-y-1 leading-none">
                  <FormLabel>Pay with ZaloPay</FormLabel>
                  <FormDescription>
                    You can use ZaloPay app to pay your order
                  </FormDescription>
                </div>
              </div>

              <div className="flex flex-row place-items-center space-x-3 space-y-0 rounded-md border p-2 shadow">
                <Checkbox
                  checked={selectedPayment === "momo"}
                  onCheckedChange={() => handlePaymentChange("momo")}
                ></Checkbox>
                <Image
                  src="/momo.png"
                  width={60}
                  height={60}
                  alt="product"
                  className="rounded-lg w-12 h-12 object-cover"
                />
                <div className="space-y-1 leading-none">
                  <FormLabel>Pay with MoMo</FormLabel>
                  <FormDescription>
                    You can use MoMo app to pay your order
                  </FormDescription>
                </div>
              </div>
            </div>

            <div className="flex gap-10">
              <Button
                type="submit"
                disabled={!selectedPayment}
                className="border-2 rounded-lg text-body-bold bg-white py-3 w-full hover:bg-black hover:text-white"
              >
                Proceed to Payment
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Cart;
