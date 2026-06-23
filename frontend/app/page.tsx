'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('En attente du backend...');

  useEffect(() => {
    // On récupère la variable ou on utilise localhost par défaut si elle est vide
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    
    // On nettoie les slashes pour éviter le double slash du type /api//test/
    const cleanUrl = `${baseUrl.replace(/\/+$/, '')}/test/`;

    console.log("Tentative d'appel API sur :", cleanUrl);

    fetch(cleanUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erreur HTTP! Statut: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setMessage(data.message))
      .catch((err) => {
        console.error("Détail de l'erreur :", err);
        setMessage('Erreur de connexion au backend ❌ (Regarde la console F12)');
      });
  }, []);

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#111', color: '#fff', minHeight: '100vh' }}>
      <h1>Statut du projet Full-Stack :</h1>
      <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#0070f3' }}>
        {message}
      </p>
    </main>
  );
}