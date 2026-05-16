export default function CategoryPage({ params }) {
  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-black mb-6">
        دسته‌بندی:
      </h1>

      <div className="text-xl text-red-600">
        {decodeURIComponent(params.slug)}
      </div>
    </div>
  );
}