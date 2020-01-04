import { useRouter } from 'next/router';
import UserCategoryLinks from '../../components/UserCategoryLinks';

const CategoryLinksPage = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  return <UserCategoryLinks categoryId={categoryId} />;
};

export default CategoryLinksPage;
