import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import cn from 'classnames';

import { notify } from '@/components/Toaster/notify';
import { logInSchema } from '@/utils/validationSchemas';
import { ROUTES } from '@/constants/routes';
import { useLogInMutation } from '@/services/api';
import { setResponseHeaders } from '@/utils/responseHeaderHandler';

import Header from '@/components/Header';
import Input from '@/components/Input';
import Button from '@/components/Button';

import './styles.scss';
const registerBackground = new URL('@/assets/Background/RegisterBackground.png', import.meta.url).href;
const neoPostIcon = new URL('@/assets/Icons/NeoPost.svg', import.meta.url).href;

const LogIn = () => {
  const navigate = useNavigate();
  const [logIn, { isLoading }] = useLogInMutation();

  const { register, handleSubmit, setError, setValue, formState: { errors, isValid } } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(logInSchema),
  });

  const onSubmit = async (formData: any) => {
    try {
      const result = await logIn(formData).unwrap();
      setResponseHeaders(result?.meta?.response?.headers);
      notify.success('Successfully logged in!');
      navigate(ROUTES.HOME, { replace: true });
    } catch (err: any) {
      const serverMessage =
        err?.data?.errors?.full_messages?.[0] ||
        err?.data?.message ||
        'Login failed. Please try again.';
      const errorField = serverMessage.toLowerCase().includes('email') ? 'email' : 'password';
      setError(errorField, {
        message: serverMessage,
        type: 'server',
      });

      setValue('password', '');
    }
  };

  const onError = () => {
    setValue('password', '');
  };

  return (
    <main className="login">
      <div className="login__register-container">
        <div className="login__register-container-content">
          <div className="login__register-container-header">
            <img src={neoPostIcon} alt="neopostIcon" decoding="async" />
            <Header />
          </div>
          <span className="login__register-container-text">Stay informed 🤓</span>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            aria-label="Log in form"
            noValidate
            className='login__register-container-form'
          >
            <Input
              inputName="email"
              type="email"
              register={register}
              required
              errors={errors?.email}
              placeholder="Email"
            />
            <Input
              inputName="password"
              type="password"
              register={register}
              required
              errors={errors?.password}
              placeholder="Password"
            />
            <Button
              type="submit"
              title="Log In"
              className={cn('form__btn', {
                'login__register-container-form-btnLogIn': isValid,
                'login__register-container-form-btnLogIn-disabled': !isValid,
              })}
              disabled={!isValid || isLoading}
              variant="primary"
            />
            <div className="login__register-container-form-separator">
              <hr className='login__register-container-form-separator-line' /> <span>or</span> <hr className='login__register-container-form-separator-line' />
            </div>

            <button
              type="button"
              className="login__register-container-form-btnSignup"
              onClick={() => navigate(ROUTES.SIGNUP)}>
              Don&apos;t you have an account?
              <span className="login__register-container-form-btnSignup-span"> Sign up</span>
            </button>
          </form>
        </div>
      </div>
      <div className="login__image-container">
        <img src={registerBackground} alt="login" loading="lazy" decoding="async" />
      </div>
    </main>
  );
};

export default LogIn;
