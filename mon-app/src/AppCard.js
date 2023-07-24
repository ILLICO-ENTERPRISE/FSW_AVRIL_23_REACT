import logo from './logo.svg';
import './App.css';
import Card from './components/Card.js';
import Counter from './components/Counter.js';
import { fetchAPI } from './services/placeholder.js';
import React, { useEffect, useState } from 'react';

// Créer un composant ENFANT
// DIT/PROFESSEUR/34 ANS/ 1 000 000 sont statiques
// Trouver le moyen de les rendre DYNAMIQUES
// C'est qu'on va aborder la notion de PROPS
// Les PROPS <=> des PARAMETRES D'UNE FONCTION
// displayName(name) => name est un paramètre de la fonction displayName
// <COMPOSANT props /> (NB: CAMELCASE)
const CardInfo = (props) => {
  // Approche N°1
  // props est Object
  // props.name
  // props.profession
  // props.age
  // props.salary
  // props est juste un Object JS (KEY:VALUE)
  // console.log(props)

  // On aurait pu utiliser la déconstruction
  // Approche N°2
  const {name, profession, age, salary} = props;

  // Afficher dans le fragment HTML on fait de l'interpollation
  // L'INTERPOLLATION permet d'affiher une donnée
  // La syntaxe de l'INTERPOLLATION est: {<VARIABLE>}
  return (
    <div>
      {/*<p>Mon nom est: {props.name}</p>
      <p>Ma profession est: {props.profession}</p>
      <p>Mon age est: {props.age} ans</p>
      <p>Mon salaire souhaité est: {props.salary}</p>*/}

      <p>Mon nom est: <span className="Info">{name}</span></p>
      <p>Ma profession est: {profession}</p>
      <p>Mon age est: {age} ans</p>
      <p>Mon salaire souhaité est: {salary}</p>
    </div>
  )
}

// App est le composant PARENT
// PARENT { CHILDREN }
// Chaque composant React a un cycle de vie
// Dans ce cycle de vie (MOUNTED/UPDATED/UNMOUNTED)
// Comment savoir que le composant est monté ?? (1)
// Comment savoir quand le composant est mis a jour ?? (2)
// Comment savoir quand le composant est démonté ?? (3)
// Pour répondre on utilisera les HOOKS
// Les HOOKS commencentb toujours par le mot use
const AppCard = () => {
  // A l'état INITIAL que posts => []
  const [posts, setPosts] = useState([]);

  // Ecouter quand le composant est monté
  // []: représente les dépendances de useEffect
  useEffect(() => {
    const clearState = () => {
      setPosts([]);
    }

    let search = 'posts'; 
    let method = null; 
    let payload = null;

    fetchAPI(search, method, payload)
      .then((response) => response.json())
      .then((json) => setPosts(json))
      .catch((error) => console.log(error))
      .finally(() => console.log('Executed'))

    return () => {
      // Lorsque le composant est démonté
      // Clean tous les states pour éviter les fuites de mémoire
      // Revenir a l'état initial
      console.log('Démonté')
      clearState();
    }
  }, []); // On montage du composant

  return (
    // Div est la Div d'entréee
    // Le NOEUD d'entré / Un fragment
    // Un composant qui va afficher notre Nom ...
    // C'est juste un fragment de CODE HTML / CSS
    <>
      {/* En étant composant on est réutilisable */}
      <CardInfo 
        name='DIT'
        profession='PROFESSEUR'
        age={14}
        salary='1 000 000'
      /><hr/>

      <CardInfo 
        name='FAYE'
        profession='Etudiant'
        age={28}
        salary='2 000 000'
      /><hr/>

      <CardInfo 
        name='HALIMATOU'
        profession='Etudiant'
        age={25}
        salary='2 500 000'
      />

      <br/>
      {/*Exporter et Afficher*/}
      {/*{JSON.stringify(posts)}*/}

      <div className='Gallery'>
        {posts.map(post => {
          return <Card
            key={post.id}
            id={post.id}
            userId={post.userId}
            title={post.title}
          />
        })}
      </div>
    </>
  );
}

export default AppCard;
