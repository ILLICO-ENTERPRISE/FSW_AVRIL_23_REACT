import React, { useState, useEffect, useCallback } from 'react';
import { LIMIT_MAX, LIMIT_MIN } from './constants';
import './Counter.css';

const Counter = () => {
  // Definir un STATE ( VARIABLE )
  // Le STATE a une valeur INITIALE
  // Et le STATE change en fonction des CAS
  // Exemple: STATE(0) => 0 -> 1 -> 2
  // Pour définr un STATE on utilise useState()
  // useState est un HOOK de REACT JS
  // const [getter, setter] = useState(VALUE)
  // Problème du RE RENDU de composant ???
  // Problème d'optimisation des fonctions

  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  const increment = useCallback(() => {
    if (count === LIMIT_MAX) {
      setName('Valeur maximale atteinte');
      return;
    }

    setCount((count) => count + 1);
  }, [count])

  const decrement = useCallback(() => {
    if (count === LIMIT_MIN) {
      setName('Valeur minimale atteinte');
      return;
    }

    setCount((count) => count - 1);
  }, [count]);

  useEffect(() => {
    if (count === LIMIT_MIN) {
      setName('Valeur minimale atteinte');
    }
  }, [count]);

  return (
    <div className="Counter">
      {/*Pour afficher on utilise {}*/}
      <label>{name}</label>
      <label>{count}</label>
      <div>
        <button type="button" onClick={increment}>
          +
        </button>
        <button type="button" onClick={decrement}>
          -
        </button>
      </div>
    </div>
  );
};

export default Counter;
