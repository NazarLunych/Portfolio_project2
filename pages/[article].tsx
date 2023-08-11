import Layout from '../components/Layout';
import {useRouter} from 'next/router';
import clsx from 'clsx';
import styles from './index.module.scss';

export default function Article(): JSX.Element {
  const router = useRouter();
  const {article} = router.query;

  return (
    <Layout>
      <div className={clsx('container', styles.cntWrapper)}>
        {article && <h1>{article} page</h1>}
      </div>
    </Layout>
  );
}
