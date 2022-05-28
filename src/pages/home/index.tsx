import { CategoryFilter } from 'components';

export default function Home() {
  return (
    <div className="page">
      <aside className="w-full md:w-3/12">
        <CategoryFilter />
      </aside>
    </div>
  );
}
