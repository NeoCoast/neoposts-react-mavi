import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { signupSchema } from '@/utils/validationSchemas';
import { setResponseHeaders } from '@/utils/responseHeaderHandler';
import { useSignupMutation } from '@/services/api';
import { SignupFormData } from '@/ts/interfaces';
import { ApiErrorResponse } from '@/ts/types/errors';

import Header from '@/components/Header';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { ROUTES } from '@/constants/routes';

import './styles.scss';

const registerBackground = new URL('@/assets/Background/RegisterBackground.png', import.meta.url).href;
const neoPostIcon = new URL('@/assets/Icons/NeoPost.svg', import.meta.url).href;

const Signup = () => {
  const navigate = useNavigate();
  const [signUp, { isLoading }] = useSignupMutation();

  const { register, handleSubmit, setError, setValue, formState: { errors, isValid } } = useForm<SignupFormData>({
    mode: 'onChange',
    resolver: zodResolver(signupSchema),
  });

  const getApiErrorMessage = (
    err: unknown,
    fallback = 'Signup failed. Please try again.'
  ): string => {
    if (typeof err === 'object' && err !== null && 'data' in err) {
      const apiError = err as ApiErrorResponse;

      return (
        apiError.data?.errors?.full_messages?.[0] ||
        apiError.data?.message ||
        fallback
      );
    }

    return fallback;
  };

  const getSignupErrorField = (
    message: string
  ): keyof SignupFormData => {
    return message.toLowerCase().includes('name') ? 'name' : 'email';
  };

  const onSubmit = async (formData: SignupFormData) => {
    try {
      const response = await signUp(formData).unwrap();

      setResponseHeaders(response.headers);
      navigate(ROUTES.HOME, { replace: true });
    } catch (err: unknown) {
      const serverMessage = getApiErrorMessage(err);
      const errorField = getSignupErrorField(serverMessage);

      setError(errorField, {
        message: serverMessage,
        type: 'server',
      });

      setValue('password', '');
      setValue('confirmPassword', '');
    }
  };

  return (
    <main className="signup">
      <div className="signup__register-container">
        <div className="signup__register-container-content">

          <div className="signup__register-container-header">
            <img src={neoPostIcon} alt="neopostIcon" />
            <Header />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
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
              loading={isLoading}
              disabled={!isValid}
              variant="primary"
              className="signup__register-container-form-btnSignUp"
            >
              Sign Up
            </Button>

            <div className="signup__register-container-form-separator">
              <hr className='signup__register-container-form-separator-line' /> <span>or</span> <hr className='signup__register-container-form-separator-line' />
            </div>

            <Button
              variant="secondary"
              onClick={() => navigate(ROUTES.LOGIN)}
              className="signup__register-container-form-btnLogin"
            >
              Already have an account?
              <span className="signup__register-container-form-btnLogin-span"> Log in</span>
            </Button>
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
