import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import cn from 'classnames';

import { notify } from '@/components/Toaster/notify';
import { signupSchema } from '@/utils/validationSchemas';
import { ROUTES } from '@/constants/routes';
import { useSignupMutation } from '@/services/api';

import Header from '@/components/Header';
import Input from '@/components/Input';
import Button from '@/components/Button';

import './styles.scss';
const registerBackground = new URL('@/assets/Background/RegisterBackground.png', import.meta.url).href;
const neoPostIcon = new URL('@/assets/Icons/NeoPost.svg', import.meta.url).href;

const Signup = () => {
  const navigate = useNavigate();
  const [signUp, { isLoading }] = useSignupMutation();

  const { register, handleSubmit, setError, setValue, formState: { errors, isValid } } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (formData: any) => {
    try {
      await signUp(formData).unwrap();
      notify.success('Successfully signed up!');
      navigate(ROUTES.HOME, { replace: true });
    } catch (err: any) {
      const serverMessage =
        err?.data?.errors?.full_messages?.[0] ||
        err?.data?.message ||
        'Signup failed. Please try again.';
      const errorField = serverMessage.toLowerCase().includes('name') ? 'name' : 'email';
      setError(errorField, {
        message: serverMessage,
        type: 'server',
      });

      setValue('password', '');
      setValue('confirmPassword', '');
    }
  };


  const onError = () => {
    setValue('password', '');
    setValue('confirmPassword', '');
  };


  return (
    <main className="signup">
      <div className="signup__register-container">
        <div className="signup__register-container-content">

          <div className="signup__register-container-header">
            <img src={neoPostIcon} alt="neopostIcon" decoding="async" />
            <Header />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            aria-label="Sign up form"
            noValidate
            className='signup__register-container-form'
          >
            <Input
              inputName="name"
              type="text"
              register={register}
              required
              errors={errors?.name}
              placeholder="Name"
            />

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

            <Input
              inputName="confirmPassword"
              type="password"
              register={register}
              required
              errors={errors?.confirmPassword}
              placeholder="Password confirmation"
            />

            <Button
              type="submit"
              title="Sign Up"
              className={cn('form__btn', {
                'signup__register-container-form-btnSignUp': isValid,
                'signup__register-container-form-btnSignUp-disabled': !isValid,
              })}
              disabled={!isValid || isLoading}
              variant="primary"
            />

            <div className="signup__register-container-form-separator">
              <hr className='signup__register-container-form-separator-line' /> <span>or</span> <hr className='signup__register-container-form-separator-line' />
            </div>

            <button
              type="button"
              className="signup__register-container-form-btnLogin"
              onClick={() => navigate(ROUTES.LOGIN)}>
              Already have an account?
              <span className="signup__register-container-form-btnLogin-span"> Log in</span>
            </button>
          </form>
        </div>
      </div>
      <div className="signup__image-container">
        <img src={registerBackground} alt="signup" loading="lazy" decoding="async" />
      </div>
    </main >
  );
};

export default Signup;
