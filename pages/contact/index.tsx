import Layout from '../../components/Layout';
import clsx from 'clsx';
import styles from './index.module.scss';
import ContactUsBlock from '../../components/ContactUsBlock/ContactUsBlock';

export default function Contact(): JSX.Element {
  return (
    <Layout>
      <div className={clsx('container', styles.cntWrapper)}>
        <h1>Contact Us</h1>
        <p className={styles.infoText}>Any question or remarks? Just write us a message!</p>
        <ContactUsBlock />
      </div>
    </Layout>
  );
}
