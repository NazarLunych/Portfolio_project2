import {contactData} from '../../common/staticData/contactUsInfo';
import styles from './ContactUsBlock.module.scss';
import Link from 'next/link';
import * as yup from 'yup';
import isPhone from 'validator/lib/isMobilePhone';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import Image from 'next/image';
import ContactUsImage from '../../assets/contact-us-corner.png';
import ContactUsImageMob from '../../assets/contact-us-corner-mob.png';
import LetterSend from '../../assets/letter-send.png';
import useResponsive from '../../hooks/useResponsive';

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  subject?: string;
  message?: string;
};

type SubmitHandler = (data: UserData) => void;

const schema = yup.object().shape({
  firstName: yup.string().required('Please enter your first name'),
  lastName: yup.string().required('Please enter your last name'),
  email: yup.string().email('Enter your email').required('Please enter your email'),
  phoneNumber: yup
    .string()
    .test('phoneNumber', 'Phone number is not valid', (value: any) => {
      return (isPhone(value) && value && value.length > 8) || value?.length == 0;
    })
    .required('Please enter your phone number'),

  subject: yup.string(),
  message: yup.string(),
});

export default function ContactUs(): JSX.Element {
  const {isDesktop} = useResponsive();
  const {
    handleSubmit,
    register,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  }); // <---------- I'm using the yup library here because it's a good way to validate forms

  const handleRequest: SubmitHandler = (data) => {
    alert('You can see results in the console');
    console.log(data);
  };

  return (
    <div className={styles.contactUsWrapper}>
      <div className={styles.infoBlock}>
        <div className={styles.topLayerInfo}>
          <div>
            <h3>Contact Information</h3>
            <p className={styles.infoText}>Say something to start a live chat!</p>
            <div className={styles.contactInfoWrapper}>
              {contactData.map(
                ({icon, prefix, value}: {icon: string; prefix: string; value: string}) => {
                  return (
                    <Link href={prefix + value} key={value} className={styles.link}>
                      <Image src={icon} alt="Icon" />
                      {value}
                    </Link>
                  );
                }
              )}
            </div>
          </div>

          <div className={styles.socialWrapper}>
            <Link href="https://twitter.com/?lang=uk">
              <svg
                className={styles.socialIcon}
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="15" cy="15" r="15" fill="#1B1B1B" />
                <path
                  d="M23 10.4255C22.4484 10.6598 21.8481 10.8284 21.2298 10.8941C21.8717 10.5185 22.3525 9.92521 22.5818 9.22545C21.9794 9.57833 21.3195 9.82578 20.6313 9.95681C20.3437 9.65402 19.9958 9.4128 19.6094 9.24819C19.2229 9.08357 18.8062 8.99909 18.3852 9.00001C16.6816 9.00001 15.3116 10.3598 15.3116 12.0284C15.3116 12.2627 15.3405 12.497 15.3873 12.7225C12.8366 12.5911 10.5616 11.3911 9.04915 9.55385C8.77357 10.0174 8.62916 10.5451 8.63093 11.0823C8.63093 12.1331 9.17354 13.0598 10.001 13.6047C9.51335 13.5858 9.03715 13.4538 8.6111 13.2195V13.2568C8.6111 14.7284 9.66747 15.9479 11.0754 16.2284C10.811 16.296 10.5391 16.3306 10.266 16.3314C10.0659 16.3314 9.87658 16.3118 9.68549 16.2852C10.0749 17.4852 11.2087 18.3568 12.5589 18.3852C11.5026 19.2 10.1794 19.6793 8.7427 19.6793C8.48492 19.6793 8.24697 19.6704 8 19.642C9.36282 20.503 10.9798 21 12.7212 21C18.3744 21 21.4677 16.3882 21.4677 12.3852C21.4677 12.2539 21.4677 12.1225 21.4587 11.9911C22.0572 11.5598 22.5818 11.0254 23 10.4255Z"
                  fill="white"
                />
              </svg>
            </Link>
            <Link href="https://www.instagram.com/">
              <svg
                className={styles.socialIcon}
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="15" cy="15" r="15" fill="#1B1B1B" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.408 7.045C13.2077 7.00818 13.4627 7 15.5 7C17.5373 7 17.7923 7.00886 18.5914 7.045C19.3905 7.08114 19.9359 7.20864 20.4132 7.39341C20.913 7.58227 21.3664 7.8775 21.7414 8.25932C22.1232 8.63364 22.4177 9.08636 22.6059 9.58682C22.7914 10.0641 22.9182 10.6095 22.955 11.4073C22.9918 12.2084 23 12.4634 23 14.5C23 16.5373 22.9911 16.7923 22.955 17.592C22.9189 18.3898 22.7914 18.9352 22.6059 19.4125C22.4177 19.913 22.1227 20.3665 21.7414 20.7414C21.3664 21.1232 20.913 21.4177 20.4132 21.6059C19.9359 21.7914 19.3905 21.9182 18.5927 21.955C17.7923 21.9918 17.5373 22 15.5 22C13.4627 22 13.2077 21.9911 12.408 21.955C11.6102 21.9189 11.0648 21.7914 10.5875 21.6059C10.087 21.4177 9.63351 21.1227 9.25864 20.7414C8.87708 20.3668 8.58181 19.9136 8.39341 19.4132C8.20864 18.9359 8.08182 18.3905 8.045 17.5927C8.00818 16.7916 8 16.5366 8 14.5C8 12.4627 8.00886 12.2077 8.045 11.4086C8.08114 10.6095 8.20864 10.0641 8.39341 9.58682C8.58208 9.08642 8.87758 8.63317 9.25932 8.25864C9.63366 7.87716 10.0867 7.58189 10.5868 7.39341C11.0641 7.20864 11.6095 7.08182 12.4073 7.045H12.408ZM18.5307 8.395C17.7398 8.35886 17.5025 8.35136 15.5 8.35136C13.4975 8.35136 13.2602 8.35886 12.4693 8.395C11.7377 8.42841 11.3409 8.55045 11.0764 8.65341C10.7266 8.78977 10.4764 8.95136 10.2139 9.21386C9.96503 9.45594 9.77353 9.75065 9.65341 10.0764C9.55045 10.3409 9.42841 10.7377 9.395 11.4693C9.35886 12.2602 9.35136 12.4975 9.35136 14.5C9.35136 16.5025 9.35886 16.7398 9.395 17.5307C9.42841 18.2623 9.55045 18.6591 9.65341 18.9236C9.77341 19.2489 9.965 19.5441 10.2139 19.7861C10.4559 20.035 10.7511 20.2266 11.0764 20.3466C11.3409 20.4495 11.7377 20.5716 12.4693 20.605C13.2602 20.6411 13.4968 20.6486 15.5 20.6486C17.5032 20.6486 17.7398 20.6411 18.5307 20.605C19.2623 20.5716 19.6591 20.4495 19.9236 20.3466C20.2734 20.2102 20.5236 20.0486 20.7861 19.7861C21.035 19.5441 21.2266 19.2489 21.3466 18.9236C21.4495 18.6591 21.5716 18.2623 21.605 17.5307C21.6411 16.7398 21.6486 16.5025 21.6486 14.5C21.6486 12.4975 21.6411 12.2602 21.605 11.4693C21.5716 10.7377 21.4495 10.3409 21.3466 10.0764C21.2102 9.72659 21.0486 9.47636 20.7861 9.21386C20.544 8.96505 20.2493 8.77355 19.9236 8.65341C19.6591 8.55045 19.2623 8.42841 18.5307 8.395ZM14.542 16.812C15.077 17.0347 15.6728 17.0648 16.2275 16.8971C16.7821 16.7294 17.2614 16.3743 17.5834 15.8924C17.9053 15.4106 18.05 14.832 17.9928 14.2553C17.9355 13.6786 17.6798 13.1398 17.2693 12.7307C17.0077 12.4692 16.6913 12.269 16.343 12.1444C15.9946 12.0199 15.623 11.9741 15.2549 12.0104C14.8867 12.0467 14.5312 12.1642 14.214 12.3544C13.8967 12.5446 13.6255 12.8028 13.42 13.1104C13.2145 13.4179 13.0797 13.7672 13.0254 14.1332C12.971 14.4991 12.9985 14.8725 13.1058 15.2265C13.2131 15.5805 13.3976 15.9063 13.6459 16.1805C13.8943 16.4547 14.2003 16.6704 14.542 16.812ZM12.7741 11.7741C13.1321 11.4161 13.557 11.1322 14.0247 10.9384C14.4925 10.7447 14.9938 10.645 15.5 10.645C16.0062 10.645 16.5075 10.7447 16.9753 10.9384C17.443 11.1322 17.8679 11.4161 18.2259 11.7741C18.5839 12.1321 18.8678 12.557 19.0616 13.0247C19.2553 13.4925 19.355 13.9938 19.355 14.5C19.355 15.0062 19.2553 15.5075 19.0616 15.9753C18.8678 16.443 18.5839 16.8679 18.2259 17.2259C17.503 17.9489 16.5224 18.355 15.5 18.355C14.4776 18.355 13.497 17.9489 12.7741 17.2259C12.0511 16.503 11.645 15.5224 11.645 14.5C11.645 13.4776 12.0511 12.497 12.7741 11.7741ZM20.21 11.2191C20.2987 11.1354 20.3697 11.0348 20.4188 10.9232C20.468 10.8115 20.4942 10.6912 20.496 10.5693C20.4977 10.4473 20.475 10.3263 20.4292 10.2133C20.3833 10.1003 20.3153 9.99762 20.2291 9.91139C20.1428 9.82516 20.0402 9.75711 19.9272 9.71126C19.8142 9.66542 19.6931 9.64271 19.5712 9.64449C19.4492 9.64627 19.3289 9.67249 19.2173 9.72161C19.1057 9.77073 19.005 9.84175 18.9214 9.93045C18.7586 10.103 18.6695 10.3321 18.673 10.5693C18.6764 10.8064 18.7722 11.0329 18.9399 11.2006C19.1076 11.3683 19.334 11.464 19.5712 11.4675C19.8083 11.4709 20.0375 11.3818 20.21 11.2191Z"
                  fill="white"
                />
              </svg>
            </Link>
            <Link href="https://discord.com/">
              <svg
                className={styles.socialIcon}
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group 1000001751">
                  <circle id="Ellipse 797" cx="15" cy="15" r="15" fill="#1B1B1B" />
                  <path
                    id="Vector"
                    d="M20.6985 10.8295C19.7258 10.4391 18.6995 10.1605 17.6451 10.0006C17.6355 9.99916 17.6257 10.0004 17.617 10.004C17.6082 10.0077 17.601 10.0137 17.5963 10.0211C17.4641 10.2261 17.3179 10.4942 17.2157 10.7041C16.0791 10.5532 14.923 10.5532 13.7863 10.7041C13.6724 10.4702 13.5434 10.2422 13.4001 10.0211C13.3953 10.0137 13.3881 10.0079 13.3794 10.0042C13.3707 10.0006 13.3609 9.99928 13.3514 10.0006C12.2967 10.1596 11.2701 10.4384 10.2979 10.8295C10.2896 10.8323 10.2827 10.8375 10.2783 10.8443C8.3339 13.3853 7.80047 15.864 8.06203 18.3115C8.06297 18.323 8.07141 18.3344 8.08172 18.3418C9.21395 19.0754 10.4804 19.6354 11.827 19.9981C11.8365 20.0007 11.8467 20.0006 11.8562 19.9978C11.8656 19.995 11.8738 19.9897 11.8795 19.9825C12.1682 19.6381 12.4251 19.2749 12.6464 18.8928C12.651 18.885 12.6525 18.876 12.6509 18.8673C12.6492 18.8586 12.6443 18.8505 12.637 18.8444C12.6321 18.8404 12.6264 18.8374 12.6201 18.8354C12.2162 18.6997 11.825 18.5365 11.4501 18.3476C11.4397 18.3424 11.4319 18.3339 11.4284 18.3238C11.4249 18.3137 11.426 18.3028 11.4314 18.2934C11.4346 18.2873 11.4394 18.282 11.4454 18.2779C11.5242 18.2262 11.6029 18.1721 11.6779 18.118C11.6846 18.1133 11.6925 18.1103 11.7009 18.1093C11.7094 18.1083 11.7179 18.1093 11.7257 18.1122C14.181 19.0929 16.8388 19.0929 19.2641 18.1122C19.2722 18.1092 19.2811 18.1081 19.2899 18.1091C19.2986 18.1101 19.3069 18.1132 19.3138 18.118C19.3888 18.1721 19.4675 18.2262 19.5463 18.2779C19.5527 18.2819 19.5578 18.2873 19.5612 18.2936C19.5646 18.2998 19.5662 18.3067 19.5658 18.3136C19.5655 18.3205 19.5631 18.3272 19.5591 18.3331C19.555 18.3391 19.5493 18.344 19.5425 18.3476C19.1685 18.5383 18.7768 18.7012 18.3716 18.8346C18.3651 18.8367 18.3593 18.8399 18.3544 18.8442C18.3496 18.8484 18.3458 18.8536 18.3435 18.8592C18.3413 18.8647 18.3405 18.8705 18.3409 18.8763C18.3414 18.882 18.3432 18.8877 18.3463 18.8928C18.5713 19.2741 18.8291 19.6381 19.1122 19.9825C19.1179 19.9897 19.1261 19.995 19.1356 19.9978C19.145 20.0006 19.1552 20.0007 19.1647 19.9981C20.5136 19.6365 21.7821 19.0764 22.9156 18.3418C22.9213 18.3384 22.926 18.3339 22.9294 18.3286C22.9328 18.3234 22.9349 18.3175 22.9353 18.3115C23.2484 15.4819 22.4113 13.0237 20.7172 10.8451C20.7155 10.8415 20.713 10.8383 20.7097 10.8356C20.7065 10.8329 20.7027 10.8308 20.6985 10.8295ZM13.0129 16.8208C12.2732 16.8208 11.6648 16.2272 11.6648 15.4991C11.6648 14.7702 12.262 14.1765 13.0129 14.1765C13.7695 14.1765 14.3723 14.7751 14.361 15.4991C14.361 16.2272 13.7638 16.8208 13.0129 16.8208ZM17.9966 16.8208C17.2579 16.8208 16.6485 16.2272 16.6485 15.4991C16.6485 14.7702 17.2457 14.1765 17.9966 14.1765C18.7532 14.1765 19.3569 14.7751 19.3447 15.4991C19.3447 16.2272 18.7532 16.8208 17.9966 16.8208Z"
                    fill="white"
                  />
                </g>
              </svg>
            </Link>
          </div>
        </div>

        <Image
          src={isDesktop ? ContactUsImage : ContactUsImageMob}
          alt="Contact us image"
          className={styles.image}
        />
      </div>

      <form onSubmit={handleSubmit(handleRequest)} className={styles.formWrapper}>
        <div className={styles.inputsWrapper}>
          <div className={styles.inputCnt}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              {...register('firstName')}
              name="firstName"
              placeholder="John"
            />
            {errors.firstName && <div style={{color: 'red'}}>{errors.firstName.message}</div>}
          </div>
          <div className={styles.inputCnt}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              {...register('lastName')}
              name="lastName"
              placeholder="Doe"
            />
            {errors.lastName && <div style={{color: 'red'}}>{errors.lastName.message}</div>}
          </div>
          <div className={styles.inputCnt}>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" {...register('email')} name="email" />
            {errors.email && <div style={{color: 'red'}}>{errors.email.message}</div>}
          </div>
          <div className={styles.inputCnt}>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="text" id="phoneNumber" {...register('phoneNumber')} name="phoneNumber" />
            {errors.phoneNumber && <div style={{color: 'red'}}>{errors.phoneNumber.message}</div>}
          </div>
        </div>

        <div>
          <h4 className={styles.selectTitle}>Select Subject?</h4>
          <div className={styles.radioGroup}>
            {new Array(4).fill('General Inquiry').map((el, index) => {
              const elemIndex = index + 1;
              return (
                <div key={index}>
                  <input
                    id={`inquiry${elemIndex}`}
                    type="radio"
                    value={el + elemIndex}
                    {...register('subject')}
                    checked
                  />
                  <label className={styles.radio} htmlFor={`inquiry${elemIndex}`}>
                    General Inquiry {elemIndex}
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.textareaInput}>
          <label className={styles.textareaName}>Message</label>
          <textarea {...register('message')} placeholder="Write your message.." />
        </div>

        <button className={styles.button}>Send Message</button>
      </form>

      <Image src={LetterSend} alt="Letter send" className={styles.letterSendImg} />
    </div>
  );
}
