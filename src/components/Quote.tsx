import { useState, useEffect } from 'react';

export function Quote() {
    // 1. Data State
    const [quote, setQuote] = useState<string>("");
    const [author, setAuthor] = useState<string>("");

    // 2. UI State (The "Flag")
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchQuote = async () => {
            // Start loading (just in case)
            setIsLoading(true);

            try {
                const response = await fetch('https://dummyjson.com/quotes/random');
                const data = await response.json();

                setQuote(data.quote);
                setAuthor(data.author);

            } catch (error) {
                setQuote("Connectivity is the key to knowledge.");
                setAuthor("System");
            } finally {
                // 3. STOP loading (Runs whether success OR failure)
                // This ensures the spinner always disappears.
                setIsLoading(false);
            }
        };

        fetchQuote();
    }, []);

    // 4. Conditional Rendering (The Guard Clause)
    if (isLoading) {
        return (
            <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                ⏳ Fetching wisdom...
            </div>
        );
    }

    // 5. The Final UI (Only shows when data is ready)
    return (
        <div style={{
            padding: '15px',
            background: '#f8fafc',
            borderLeft: '4px solid #3b82f6',
            marginBottom: '20px',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '1.1rem', fontStyle: 'italic', color: '#334155' }}>
                "{quote}"
            </p>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'bold' }}>
                — {author}
            </span>
        </div>
    );
}