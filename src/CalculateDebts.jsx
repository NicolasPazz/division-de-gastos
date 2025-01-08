import React from "react";

const CalculateDebts = ({ participants }) => {
    if (!participants || participants.length < 2) {
        return <div>No hay participantes suficientes para calcular las transacciones :(</div>;
    }

    const calculate = () => {
        const totalExpenses = participants.reduce(
            (sum, p) => sum + p.expense,
            0
        );
        const average = totalExpenses / participants.length;

        let toPay = [];
        let toReceive = [];

        participants.forEach((p) => {
            const amountToPay = (average - p.expense);
            const amountToReceive = (p.expense - average);

            if (amountToPay > 0) {
                toPay.push({ ...p, amountToPay });
            } else if (amountToReceive > 0) {
                toReceive.push({ ...p, amountToReceive });
            }
        });

        toPay.sort((a, b) => b.amountToPay - a.amountToPay);
        toReceive.sort((a, b) => b.amountToReceive - a.amountToReceive);

        const transactions = [];

        while (toPay.length > 0 && toReceive.length > 0) {
            const debtor = toPay[0];
            const creditor = toReceive[0];
            const amountToTransfer = Math.min(debtor.amountToPay, creditor.amountToReceive);

            transactions.push(
                `${debtor.name} debe pagarle $${amountToTransfer.toFixed(2)} a ${creditor.name}`
            );

            debtor.amountToPay -= amountToTransfer;
            creditor.amountToReceive -= amountToTransfer;

            if (debtor.amountToPay === 0) toPay.shift();
            if (creditor.amountToReceive === 0) toReceive.shift();
        }

        return transactions;
    };

    return (
        <div>
          <h3>Resultados</h3>
          {calculate().length > 0 ? (
            calculate().map((transaction, index) => (
              <div key={index}>
                <p>{transaction}</p>
              </div>
            ))
          ) : (
            <p>No es necesario transaccionar :)</p>
          )}
        </div>
      );      
};

export default CalculateDebts;
