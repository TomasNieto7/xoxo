import { z } from "zod";

export const BalanceFormSchema = z.object({
  cellphone: z
    .string()
    .min(10, { message: "El numero debe tener minimo 6 digitos." })
    .max(10, { message: "El numero debe tener solo 6 digitos." })
    .regex(/^[0-9]+$/, { message: "Debe ser solo dígitos del 0 al 9." })
    .trim(),
  cellphoneConfirm: z
    .string()
    .min(10, { message: "El numero debe tener minimo 6 digitos." })
    .max(10, { message: "El numero debe tener solo 6 digitos." })
    .regex(/^[0-9]+$/, { message: "Debe ser solo dígitos del 0 al 9." })
    .trim(),
});

export type FormState =
  | {
      errors?: {
        cellphone?: string[];
        cellphoneConfirm?: string[];
      },
      message?: string;
    }
  | undefined;
