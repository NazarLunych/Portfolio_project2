import Layout from '../components/Layout';
import clsx from 'clsx';
import styles from './index.module.scss';

export default function Home(): JSX.Element {
  return (
    <Layout>
      <div className={clsx('container', styles.cntWrapper)}>
        <h1>Welcome!</h1>
      </div>
    </Layout>
  );
}
