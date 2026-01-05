import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { notify } from '@/components/Toaster/notify';
import { signupSchema } from '@/utils/validationSchemas';
import './styles.scss';
import Header from '@/components/Header';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { ROUTES } from '@/constants/routes';
const registerBackground = new URL('@/assets/Background/RegisterBackground.png', import.meta.url).href;
const neoPostIcon = new URL('@/assets/Icons/NeoPost.svg', import.meta.url).href;

declare const signUp: (data: any) => Promise<{ status: number }>;

const Signup = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        mode: 'onBlur',
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

    const allFilled = (
        (watch('name') || '').trim() !== '' &&
        (watch('email') || '').trim() !== '' &&
        (watch('password') || '').trim() !== '' &&
        (watch('confirmPassword') || '').trim() !== ''
    );

    return (
        <main className="signup">
            <div className="signup__register-container">
                <div className="signup__register-container-content">

                    <div className="signup__register-container-header">
                        <img src={neoPostIcon} alt="neopostIcon" decoding="async" />
                        <Header />
                    </div>
                    <form
                        onSubmit={handleSubmit(
                            async (data) => {
                                if (typeof signUp !== 'function') {
                                    notify.success('Successfully signed up!');
                                    navigate(ROUTES.HOME);
                                    return;
                                }
                                try {
                                    const res = await signUp(data);
                                    if (res.status === 200) {
                                        notify.success('Successfully signed up!');
                                        navigate(ROUTES.HOME);
                                    }
                                } catch (err) {
                                    notify.error('Signup failed', { id: 'form_error' });
                                    setValue('password', '');
                                    setValue('confirmPassword', '');
                                }
                            },
                            () => {
                                setValue('password', '');
                                setValue('confirmPassword', '');
                            }
                        )}
                        aria-label="Sign up form"
                        noValidate
                        className='signup__register-container-form'
                    >
                        <Input
                            inputName="name"
                            type="text"
                            register={register}
                            required={true}
                            errors={errors?.name}
                            className="input__form"
                            placeholder="Name"
                        />

                        <Input
                            inputName="email"
                            type="email"
                            register={register}
                            required={true}
                            errors={errors?.email}
                            className="input__form"
                            placeholder="Email"
                        />

                        <Input
                            inputName="password"
                            type="password"
                            register={register}
                            required={true}
                            errors={errors?.password}
                            className="input__form"
                            placeholder="Password"
                        />

                        <Input
                            inputName="confirmPassword"
                            type="password"
                            register={register}
                            required={true}
                            errors={errors?.confirmPassword}
                            className="input__form"
                            placeholder="Password confirmation"
                        />

                        <Button
                            type="submit"
                            title="Sign Up"
                            className={`form__btn signup__register-container-form-btnSignUp ${!allFilled ? 'signup__register-container-form-btnSignUp-disabled' : ''}`}
                            disabled={!allFilled}
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
