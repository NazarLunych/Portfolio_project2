import styles from './Footer.module.scss';
import Link from 'next/link';
import Routes from '../../../config/routes';
import {contactData} from '../../../common/staticData/contactUsInfo';
import Image from 'next/image';
import {footerData} from '../../../common/staticData/footer';
import {ChangeEvent, useState} from 'react';

export default function Footer(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <footer className={styles.footer}>
      <div className="containerFooter">
        <Link href={Routes.Home} className={styles.footerLogo}>
          <h2>Logo Here</h2>
        </Link>

        <hr className={styles.horizontalLine} />

        <div className={styles.footerContainer}>
          <div className={styles.footerNavWrapper}>
            <div className={styles.contactUsCol}>
              <h5>Reach us</h5>
              {contactData.map(
                ({icon, prefix, value}: {icon: string; prefix: string; value: string}) => (
                  <Link href={prefix + value} key={value} className={styles.contactUsLink}>
                    <Image src={icon} alt="Contact icon" />
                    {value}
                  </Link>
                )
              )}
            </div>

            {footerData.map(
              ({
                colName,
                colItems,
              }: {
                colName: string;
                colItems: {name: string; link: string}[];
              }) => (
                <div className={styles.col} key={colName}>
                  <h5>{colName}</h5>
                  {colItems.map(({name, link}) => (
                    <Link key={name} href={link} className={styles.colLink}>
                      {name}
                    </Link>
                  ))}
                </div>
              )
            )}
          </div>

          <div className={styles.subscribeBlock}>
            <h5>Join Our Newsletter</h5>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="Your email address"
                value={inputValue}
                onChange={handleInputChange}
                className={styles.subscribeInput}
              />
              <button onClick={() => console.log(inputValue)} className={styles.subscribeBtn}>
                Subscribe
              </button>
            </div>
            <span>* Will send you weekly updates for your better tool management.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
