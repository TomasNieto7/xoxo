import { z } from "zod";

export const BalanceFormSchema = z
  .object({
    cellphone: z
      .string()
      .min(10, { message: "El número debe tener mínimo 10 dígitos." })
      .max(10, { message: "El número debe tener solo 10 dígitos." })
      .regex(/^[0-9]+$/, { message: "Debe ser solo dígitos del 0 al 9." })
      .trim(),
    cellphoneConfirm: z
      .string()
      .min(10, { message: "El número debe tener mínimo 10 dígitos." })
      .max(10, { message: "El número debe tener solo 10 dígitos." })
      .regex(/^[0-9]+$/, { message: "Debe ser solo dígitos del 0 al 9." })
      .trim(),
    balance: z
      .string()
      .min(1, { message: "El balance debe tener mínimo 1 dígito." })
      .regex(/^[0-9]+$/, { message: "Debe ser solo dígitos del 0 al 9." })
      .trim(),
    company: z
      .string()
      .min(4, { message: "El número debe tener mínimo 10 dígitos." })
      .trim(),
  })
  .refine((data) => data.cellphone === data.cellphoneConfirm, {
    message: "Los números de teléfono no coinciden.",
    path: ["cellphoneConfirm"],
  });

export type FormState =
  | {
      errors?: {
        cellphone?: string[];
        cellphoneConfirm?: string[];
      };
      message?: string;
      res?: {
        message?: string;
        status?: number;
      };
    }
  | undefined;
