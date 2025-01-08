import React from "react";
import 'font-awesome/css/font-awesome.min.css';

const ExpenseTable = ({ participants, updateExpense, removeParticipant }) => {
    const handleExpenseChange = (index, event) => {
        let value = event.target.value;

        // Si el campo está vacío o contiene solo el signo "$" lo dejamos como 0
        if (value === "" || value === "$") {
            updateExpense(index, 0);
            return;
        }

        // Eliminar el símbolo "$" y tratar de convertir el valor a número
        value = value.replace('$', '').trim();
        let numericValue = parseFloat(value);

        // Verifica si el valor es un número y si no es negativo
        if (!isNaN(numericValue) && numericValue >= 0) {
            updateExpense(index, numericValue);
        }
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Gasto</th>
                        <th></th> {/* Eliminamos la palabra "Acción" */}
                    </tr>
                </thead>
                <tbody>
                    {participants.map((participant, index) => (
                        <tr key={index}>
                            <td>{participant.name}</td>
                            <td>
                                <div className="expense-input-wrapper">
                                    <input
                                        type="text"
                                        value={participant.expense === 0 ? "$0" : `$${participant.expense}`} // Mostrar $0 por defecto
                                        onChange={(e) => handleExpenseChange(index, e)}
                                    />
                                </div>
                            </td>
                            <td>
                                <button 
                                    onClick={() => removeParticipant(index)} 
                                    style={{ 
                                        border: 'none', 
                                        background: 'transparent', 
                                        cursor: 'pointer', 
                                        padding: '0',
                                    }}>
                                    <i className="fa fa-trash" style={{ fontSize: '20px', color: 'black' }}></i> {/* Cubo de basura minimalista */}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseTable;
