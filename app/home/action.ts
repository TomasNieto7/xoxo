'use server'

import { FormState, BalanceFormSchema } from "../lib/definitions"; 

export async function sendBalance(
    state: FormState,
    formData: FormData,
): Promise<FormState> {
    // 1. Validate form fields
    
    const { cellphone, cellphoneConfirm } = {
        cellphone: formData.get('cellphone'),
        cellphoneConfirm: formData.get('cellphoneConfirm'),
    };
    console.log(cellphone, cellphoneConfirm);
    

    const validatedFields = BalanceFormSchema.safeParse({ cellphone, cellphoneConfirm });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    // 2. Query the database for the user with the given email
    // const user = await getUser(validatedFields.data.exp, validatedFields.data.password);
    
    // If user is not found, return error message
    // if (user.status === 401) {
    //     return { errors: { message: "User not found" } };
    // }
    // console.log(user.data);
    return { message: "Succesful"}
}

const getUser = async (exp: string, password: string) => {
    try {
        const res = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ exp, password }),
        });

        // Check for success status code directly
        if (res.ok) {
            return await res.json();
        } else {
            console.error('Login failed with status:', res.status);
            return null;
        }

    } catch (error) {
        console.error('Error during fetch:', error);
        return null;
    }
}