"use server";

import Stripe from "stripe";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import Transaction from "../database/models/transaction.model";
import { stripVTControlCharacters } from "util";
import { redirect } from "next/navigation";

export async function checkoutCredits(transaction: CheckoutTransactionParams) {
  //   const stripe = new stripVTControlCharacters(process.env.STRIPE_SECRET_KEY!);
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16", // You can specify the API version you want to use
  });

  const amount = Number(transaction.amount) * 100;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: amount,
          product_data: {
            name: transaction.plan,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      plan: transaction.plan,
      credits: transaction.credits,
      buyerId: transaction.buyerId,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
  });

  redirect(session.url!);
}

export async function createTransaction(transaction: CreateTransactionParams) {
  try {
    await connectToDatabase();

    //Create a new transaction with a buyerId
    const newTransaction = await Transaction.create({
      ...transaction,
      buyer: transaction.buyerId,
    });
  } catch (error) {
    handleError(error);
  }
}
