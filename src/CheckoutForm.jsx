import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

export default function CheckoutForm() {
  // Créer une requête vers stripe pour obtenir un token
  const stripe = useStripe();
  // Permetra de récupérer les données bancaires de l'user
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);
    const stripeToken = await stripe.createToken(cardElement, {
      name: "Bibou",
    });

    console.log("Token généré : ", stripeToken.token.id);
    try {
      const response = await axios.post(`http://localhost:8080/api/payment`, {
        amount: 100,
        stripeToken: stripeToken.token.id,
      });
      if (response.data.success) {
        console.log("Payement réussi");
      }
    } catch (error) {
      console.log("Erreur", error);
    }
  };

  return (
    <form style={{ maxWidth: "400px" }} onSubmit={handleSubmit}>
      <h1>Formulaire de paiement</h1>
      <CardElement
        options={{
          hidePostalCode: true,
        }}
      />

      <button type="submit">Payer</button>
    </form>
  );
}
