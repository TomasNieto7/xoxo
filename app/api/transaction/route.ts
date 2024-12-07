import { NextResponse } from "next/server";
import db from "../../../config/db";

interface DatabaseError extends Error {
  code?: string;
}

export async function POST(req: Request) {
  try {
    const { cellphone, amount, company, res } = await req.json();
    const today = new Date();
    const date = today.toISOString().slice(0, 19).replace("T", " ");
    // Inserta los valores usando marcadores de posición para prevenir inyecciones SQL
    const rows = await db.query(
      "INSERT INTO transacciones (numero, monto, compania, fecha, respuesta) VALUES (?, ?, ?, ?, ?)",
      [cellphone, amount, company, date, res]
    );
    if (rows) {
      return NextResponse.json({ status: 201, message: "Registro exitoso" });
    }
  } catch (error) {
    const dbError = error as DatabaseError;

    if (dbError.code === "ER_DUP_ENTRY") {
      return NextResponse.json({
        status: 409,
        message: "El expediente ya está registrado.",
      });
    }
    return NextResponse.json({
      status: 500,
      message: "Error en la consulta",
      error: dbError.message,
    });
  }
}
