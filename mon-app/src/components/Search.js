import React, { Fragment, useCallback, useRef, useState } from 'react';
import { fetchAPI } from '../services/datamuse.js';
import { useForm, SubmitHandler } from 'react-hook-form';
import './Search.css';

const Loading = () => {
  return <div>Loading...</div>;
};

const Search = () => {
  // Initialiser les Références
  // const search = useRef();

  // Créer le STATE result pour le résultat
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = useCallback(({ search, search_key }) => {
    setLoading(true);

    setTimeout(() => {
      fetchAPI(search, search_key)
        .then((response) => response.json())
        .then((json) => setResult(json))
        .catch((error) => console.log(error))
        .finally(() => {
          setLoading(false);
          console.log('Executed');
        });
    }, 2000);
  }, []);

  return (
    <Fragment>
      <form className="Form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="search">Search Key:</label>
        <input
          type="search"
          {...register('search', {
            required: true,
            maxLength: 100,
            minLength: 2,
          })}
        />
        {errors.search && <span>This field is required</span>}
        <select
          id="search_key"
          defaultValue="sp"
          {...register('search_key', {
            required: true,
          })}
        >
          <option value="sp" name="choice">
            SP
          </option>
          <option value="sl" name="choice">
            SL
          </option>
          <option value="ml" name="choice">
            ML
          </option>
          <option value="rel_rhy" name="choice">
            REL_RHY
          </option>
        </select>
        {errors.search_key && <span>This field is required</span>}
        <button type="submit">Valider</button>
      </form>
      <br />

      {loading ? <Loading /> : <p>{JSON.stringify(result)}</p>}
    </Fragment>
  );
};

export default Search;
