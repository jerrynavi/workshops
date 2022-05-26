import CategoryType from './category';

export default interface Workshop {
  id: number;
  title: string;
  desc: string;
  price: number;
  date: string;
  category: CategoryType;
  userId: number;
  imageUrl: string;
}
