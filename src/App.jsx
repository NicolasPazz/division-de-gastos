import React, { useState } from "react";
import "./App.css";
import ParticipantForm from "./ParticipantForm";
import ExpenseTable from "./ExpenseTable";
import CalculateDebts from "./CalculateDebts";
import Footer from "./Footer"; // Importa el Footer

const App = () => {
    const [participants, setParticipants] = useState([]);

    const addParticipant = (name) => {
        setParticipants([...participants, { name, expense: 0 }]);
    };

    const removeParticipant = (index) => {
        const newParticipants = participants.filter((_, i) => i !== index);
        setParticipants(newParticipants);
    };

    const updateExpense = (index, expense) => {
        // No permitir valores negativos
        if (expense < 0) return;

        // Si el valor es 0 y se intenta disminuir más allá de 0, no hacer nada
        if (expense === 0 && participants[index].expense === 0) return;

        const newParticipants = [...participants];
        newParticipants[index].expense = expense;
        setParticipants(newParticipants);
    };

    const handleExpenseChange = (index, event) => {
        const newValue = parseFloat(event.target.value.replace('$', '').trim());
        if (!isNaN(newValue)) {
            updateExpense(index, newValue);
        }
    };

    return (
        <div className="container">
            <h1>División de Gastos</h1>
            <ParticipantForm addParticipant={addParticipant} />
            {participants.length > 0 && (
                <ExpenseTable
                    participants={participants}
                    updateExpense={updateExpense}
                    removeParticipant={removeParticipant}
                    handleExpenseChange={handleExpenseChange} // Pasa la función al componente
                />
            )}
            <CalculateDebts participants={participants} />
            <Footer /> {/* Añade el Footer */}
        </div>
    );
};

export default App;
