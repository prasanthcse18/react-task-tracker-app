import { useState } from 'react';

export function CoffeeTracker() {
    const [caffeineLevel, setCaffeineLevel] = useState(0);

    const drinkCoffee = () => {
        setCaffeineLevel(caffeineLevel + 1);
    };

    return (
        <div style={{
            marginTop: '2rem',
            padding: '1rem',
            border: '1px dashed #ccc',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9'
        }}>
            <h3>☕ Developer Fuel</h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <button
                    onClick={drinkCoffee}
                    style={{ padding: '8px 16px', cursor: 'pointer' }}
                >
                    Drink Coffee
                </button>

                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    Level: {caffeineLevel}
                </span>
            </div>

            {/* STAFF ENGINEER TIP: Use "&&" for cleaner conditional rendering */}
            {caffeineLevel >= 5 && (
                <p style={{ color: 'red', fontWeight: 'bold', marginTop: '10px' }}>
                    ⚠️ Warning: Too much caffeine! Heart rate rising...
                </p>
            )}
        </div>
    );
}