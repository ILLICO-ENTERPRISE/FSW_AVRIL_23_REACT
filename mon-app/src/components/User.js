import React, {
  Fragment,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import './User.css';
import { saveUser } from '../reducers/userSlice';
import { NATIONALITY, PROFESSION } from './constants';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../reducers/userSlice';

const Loading = () => {
  return <div>Loading...</div>;
};

const User = () => {
  // useMemo permet de MEMOIZER comme useCallback
  // Mais ici il est utiliser pour les données
  // Et NON pour les FONCTIONS a contrario de useCallback
  const country = useMemo(() => NATIONALITY, []);
  const profession = useMemo(() => PROFESSION, []);

  // Initialiser les variable du REDUCER
  const dispatch = useDispatch();
  const users = useSelector(userSelector);

  useEffect(() => {
    console.log(users)
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = useCallback(
    ({ fullname, birthday, nationality, profession }) => {
      // Action SYNCHRONE
      try {
        dispatch(
          saveUser({
            fullname: fullname,
            birthday: birthday,
            nationality: nationality,
            profession: profession,
          })
        );
        console.log('User saved');
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            {...register('fullname', {
              required: true,
              maxLength: 100,
              minLength: 2,
            })}
          />
          {errors.fullname && <span>This field is required</span>}
        </div>
        <div>
          <label>Your Birth Day:</label>
          <input
            type="date"
            {...register('birthday', {
              required: true,
            })}
          />
          {errors.birthday && <span>This field is required</span>}
        </div>
        <div>
          <label>Nationality:</label>
          <select
            id="country"
            name="country"
            defaultValue="BJ"
            {...register('nationality', {
              required: true,
            })}
          >
            <option value="BJ">Bénin</option>
            <option value="SN">Sénégal</option>
          </select>
          {errors.nationality && <span>This field is required</span>}
        </div>
        <div>
          <label>Professional:</label>
          <select
            id="profession"
            name="profession"
            defaultValue="DOCTOR"
            {...register('profession', {
              required: true,
            })}
          >
            <option value="DOCTOR">Doctor</option>
            <option value="STUDENT">Student</option>
          </select>
          {errors.profession && <span>This field is required</span>}
        </div>
        <button type="submit">CREATE</button>
      </form>
    </Fragment>
  );
};

export default User;
