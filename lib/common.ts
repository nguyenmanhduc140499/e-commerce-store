import { z } from "zod";
import parsePhoneNumber from "libphonenumber-js";

export const formatCurrencyVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0, // No decimal places
        maximumFractionDigits: 0, // No decimal places
    }).format(amount);
};

export const zPhoneNumber = z.string().transform((value, ctx) => {
    const phoneNumber = parsePhoneNumber(value, {
        defaultCountry: "VN",
    });

    if (!phoneNumber?.isValid()) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invalid phone number",
        });
        return z.NEVER;
    }

    return value;
});