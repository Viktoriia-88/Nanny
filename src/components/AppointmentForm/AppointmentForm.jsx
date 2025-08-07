import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import s from "./AppointmentForm.module.css";
// import two icons clock and calendar

const schema = yup.object().shape({
    address: yup
        .string()
        .min(2, 'Min 2 characters')
        .required('Address is required'),
    phone: yup
        .string()
        .min(13, 'Too short!')
        .max(13, 'Too long!')
        .matches(/^\+?[0-9]*$/, 'Only numbers and optional ' + ' are allowed')
        .required('Number is required!'),
    age: yup
        .number()
        .typeError("Enter age from 1 to 16")
        .min(1, "Min child's age is 1 years old")
        .max(16, "Max child's age is 16 years old")
        .required('Age is required!'),
    date: yup
        .date()
        .required('Choose a date'),
    time: yup
        .date()
        .required('Choose a time'),
    email: yup
        .string()
        .email('Invalid email')
        .required('Email is required!'),
    name: yup
        .string()
        .min(2, 'Min 2 characters')
        .max(32, 'Max 32 characters')
        .required('Name is required'),
    comment: yup
        .string(),
});

const AppointmentForm = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
            <div className={s.errorBox}>
                <input
                    {...register('address')}
                    placeholder="Address"
                    className={s.input}
                />
                {errors.address && <p className={s.error}>{errors.address.message}</p>}
            </div>

            <div className={s.errorBox}>
                <input
                    {...register('phone')}
                    placeholder="+380"
                    className={s.input}
                    onKeyDown={(e) => {
                        const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
                        const isNumber = /^\d$/.test(e.key);
                        const isPlus = e.key === '+';
                        const alreadyHasPlus = e.currentTarget.value.includes('+');

                        if (
                            !isNumber &&
                            !allowedKeys.includes(e.key) &&
                            !(
                                isPlus &&
                                !alreadyHasPlus &&
                                e.currentTarget.selectionStart === 0
                            )
                        ) {
                            e.preventDefault();
                        }
                    }}
                />
                {errors.phone && <p className={s.error}>{errors.phone.message}</p>}
            </div>

            <div className={s.errorBox}>
                <input
                    {...register('age')}
                    placeholder="Child's age"
                    className={s.input}
                />
                {errors.age && <p className={s.error}>{errors.age.message}</p>}
            </div>

            <div className={s.dayTimeBox}>
                <div className={s.errorBox}>
                    <div className={s.inputWrapper}>
                        <Controller
                            control={control}
                            name="date"
                            render={({ field }) => (
                                <DatePicker
                                    placeholderText={format(new Date(), 'yyyy-MM-dd')}
                                    selected={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    dateFormat="yyyy-MM-dd"
                                    className={s.dateInput}
                                    minDate={new Date()}
                                    onKeyDown={(e) => e.preventDefault()}
                                />
                            )}
                        />
                        {/* <img src={CalendarIcon} alt="Date" className={s.dateIcon} /> */}
                    </div>
                    {errors.date && <p className={s.error}>{errors.date.message}</p>}
                </div>
                
                <div className={css.errorBox}>
                    <div className={css.inputWrapper}>
                        <Controller
                            control={control}
                            name="time"
                            render={({ field }) => (
                                <DatePicker
                                    selected={field.value}
                                    onChange={(val) => field.onChange(val)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeCaption="Meeting time"
                                    timeIntervals={30}
                                    dateFormat="HH:mm"
                                    placeholderText="00:00"
                                    className={s.dateInput}
                                    onKeyDown={(e) => e.preventDefault()}
                                />
                            )}
                        />
                        {/* <img src={ClockIcon} alt="Date" className={s.dateIcon} /> */}
                    </div>
                    {errors.time && <p className={s.error}>{errors.time.message}</p>}
                </div>
            </div>

            <div className={s.errorBox}>
                <input
                    {...register('email')}
                    placeholder="Email"
                    className={s.input}
                />
                {errors.email && <p className={s.error}>{errors.email.message}</p>}
            </div>

            <div className={s.errorBox}>
                <input
                    {...register('name')}
                    placeholder="Father's or mother's name"
                    className={s.input}
                    onKeyDown={(e) => {
                        if (/\d/.test(e.key)) {
                            e.preventDefault();
                        }
                    }}
                />
                {errors.name && <p className={s.error}>{errors.name.message}</p>}
            </div>

            <div className={s.errorBox}>
                <textarea
                    {...register('comment')}
                    placeholder="Comment"
                    rows={4}
                    maxLength={168}
                    className={s.textarea}
                />
            </div>

            <button type="submit" className={s.sendBtn}>
                Send
            </button>
        </form>
    );
};

export default AppointmentForm;