import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ROUTES } from '@/constants/routes';
import { useLogInMutation } from '@/services/api';
import { LoginFormData } from '@/ts/interfaces';
import { logInSchema } from '@/utils/validationSchemas';
import { setResponseHeaders } from '@/utils/responseHeaderHandler';

import { notify } from '@/components/Toaster/notify';
import Header from '@/components/Header';
import Input from '@/components/Input';
import Button from '@/components/Button';

import './styles.scss';
const registerBackground = new URL('@/assets/Background/RegisterBackground.png', import.meta.url).href;
const neoPostIcon = new URL('@/assets/Icons/NeoPost.svg', import.meta.url).href;

const LogIn = () => {
  const navigate = useNavigate();
  const [logIn, { isLoading }] = useLogInMutation();

  const { register, handleSubmit, setValue, formState: { errors, isValid } } = useForm<LoginFormData>({
    mode: 'onChange',
    resolver: zodResolver(logInSchema),
  });

  const onSubmit = async (formData: LoginFormData) => {
    const response = await logIn(formData);

    if (response.error) {
      notify.error('Incorrect email or password. Please check your credentials.');
      setValue('password', '');
      return;
    }
    const headers = response.data.headers;
    setResponseHeaders(headers);
    navigate(ROUTES.HOME, { replace: true });
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
            onSubmit={handleSubmit(onSubmit)}
            aria-label="Log in form"
            className="login__register-container-form"
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
              title="Log in"
              loading={isLoading}
              disabled={!isValid}
              className="login__register-container-form-btnLogin"
              variant="primary"
            />
            <div className="login__register-container-form-separator">
              <hr className='login__register-container-form-separator-line' /> <span>or</span> <hr className='login__register-container-form-separator-line' />
            </div>

            <Button
              variant="secondary"
              onClick={() => navigate(ROUTES.SIGNUP)}
              title={(
                <>
                  Don&apos;t you have an account?
                  <span className="login__register-container-form-btnSignup-span"> Sign up</span>
                </>
              )}
              className="login__register-container-form-btnSignup"
            />
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
